import {Page, NavParams, Events, Toast, Alert, NavController} from 'ionic-angular';
import {Component} from '@angular/core';
import {Geolocation} from 'ionic-native';
import {language} from "../../components/languages/languages";
import {BusDriveInterface} from '../../components/Services/busdriveinterface';


@Component({
    templateUrl: 'build/pages/drive/drive.html',
})
export class DrivePage {
    private counter: number = 0;
    private nextStop: string;
    private drive: string = "driving";
    private newcustomstopscounter: number;
    private linestopsnames = [];
    private linecustomstopsall = [];
    private acceptedcustomstops = [];

    //-----Language-----
    public passengers;
    public title;

    constructor(private nav: NavController, navParams: NavParams, private busdriveinterface: BusDriveInterface, public events: Events) {
        this.getLineStopsNames();
        this.nextStop = this.linestopsnames[0];
        this.events.subscribe("newCustomStops", () => {
            this.getCustomStops();
        })
        
        //-----Language-----
        this.passengers = language.passengers;
        this.title = language.driveTitle;

    }
    /**
     * increases the counter of the passengers
     */
    increasePassengers() {
        this.counter++
    }

    /**
     * decreases the counter of the passengers
     */
    decreasePassengers() {
        if (this.counter > 0) this.counter--
    }

    /**
     * gets the names of linestops
     */
    getLineStopsNames() {
        this.linestopsnames = this.busdriveinterface.getLineStopsNames();
    }

    /**
     * gets customstops and creates an alert
     */
    getCustomStops() {
        this.linecustomstopsall = this.busdriveinterface.getLineCustomStopsAll();
        if (this.linecustomstopsall.length > 0) {
            this.newcustomstopscounter = this.linecustomstopsall.length
            let alert = Alert.create({
                title: this.linecustomstopsall.length + ' new Custom Stops',
                buttons: [
                    {
                        text: "Ok",
                        handler: () => {
                            console.log('ok');
                        }
                    },
                    {
                        text: 'Anzeigen',
                        handler: () => {
                            this.drive = "customstops";
                            this.nav.parent.select(0);
                            this.resetNewCustomStopsCounter();
                            console.log('Anzeigen');
                        }
                    }]
            });
            this.nav.present(alert);
        }
    }

    /**
     * @param customStop custom stop
     * accepts a customStop
     */
    acceptCustomStop(customStop) {
        this.acceptedcustomstops.push(customStop);
        let posnumber = this.linecustomstopsall.indexOf(customStop);
        if (posnumber > -1) {
            this.linecustomstopsall.splice(posnumber, 1)
        }
        this.busdriveinterface.postCustomStopStatus(customStop[0],"accepted")
    }

    /**
     * @param customStop custom stop
     * rejects a customStop
     */
    rejecteCustomStop(customStop) {
        let posnumber = this.linecustomstopsall.indexOf(customStop);
        if (posnumber > -1) {
            this.linecustomstopsall.splice(posnumber, 1)
        }
        this.busdriveinterface.postCustomStopStatus(customStop[0],"rejected")
    }

    /**
     * @param customstops accepted customstops
     * completes a acceptedcustomstop with complete
     */
    completeAcceptedCustomStop(customstop){
        let posnumber = this.acceptedcustomstops.indexOf(customstop);
        if (posnumber > -1) {
            this.acceptedcustomstops.splice(posnumber, 1)
        }
        this.busdriveinterface.postCustomStopStatus(customstop[0],"completed")
    }

    /**
     * @param acceptedcustomstops accepted customstops
     * completes a acceptedcustomstop with noshow
     */
    noShowAcceptedCustomStop(customstop){
        let posnumber = this.acceptedcustomstops.indexOf(customstop);
        if (posnumber > -1) {
            this.acceptedcustomstops.splice(posnumber, 1)
        }
        this.busdriveinterface.postCustomStopStatus(customstop[0],"noshow")
    }

    /**
     * reset newcustomstops counter
     */
    resetNewCustomStopsCounter(){
        this.newcustomstopscounter = undefined;
    }

    /**
     * switches to next stop
     */
    showNextStop() {
        this.linestopsnames.push(this.linestopsnames.shift());
        this.nextStop = this.linestopsnames[0];
        console.log("next stop: " + this.linestopsnames[0]);
    }

    /**
     * switches to previous stop
     */
    showPrevioustStop() {
        this.linestopsnames.unshift(this.linestopsnames.pop());
        this.nextStop = this.linestopsnames[0];
        console.log("next stop: " + this.linestopsnames[0]);
    }
}
