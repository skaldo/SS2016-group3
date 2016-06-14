import {Page, NavParams, Events, Toast, Alert, ActionSheet, NavController} from 'ionic-angular';
import {Component} from '@angular/core';
import {LocalNotifications} from 'ionic-native';
import {language} from "../../components/languages/languages";
import {BusDriveInterface} from '../../components/Services/busdriveinterface';
import {CustomStopPage} from '../drive/customstop/customstop';


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
     * gets customstops and creates a notification
     */
    getCustomStops() {
        let newlinecustomstopsall = this.busdriveinterface.getLineCustomStopsAll();
        if (newlinecustomstopsall.length > 0) {
            if (this.linecustomstopsall.length > 0) {
                for (let i = 0; i < newlinecustomstopsall.length; i++) {
                    for (let j = 0; j < this.linecustomstopsall.length; j++) {
                        if (newlinecustomstopsall[i][0] === this.linecustomstopsall[j][0]) {
                            let posnumber = newlinecustomstopsall.indexOf(newlinecustomstopsall[i]);
                            if (posnumber > -1) {
                                newlinecustomstopsall.splice(posnumber, 1)
                            }
                        }
                    }
                }
            }
            for (let i = 0; i < newlinecustomstopsall.length; i++) {
                this.linecustomstopsall.push(newlinecustomstopsall[i]);
            }
            if (newlinecustomstopsall.length > 0) {
                this.newcustomstopscounter = newlinecustomstopsall.length
                LocalNotifications.schedule({
                    id: 1,
                    text: this.newcustomstopscounter + ' new Custom Stops',
                });
                this.nav.present(ActionSheet.create({
                    title: this.newcustomstopscounter + ' new Custom Stops',
                    buttons: [
                        {
                            text: 'Anzeigen',
                            handler: () => {
                                this.drive = "customstops";
                                this.nav.parent.select(0);
                                this.resetNewCustomStopsCounter();
                                console.log('Anzeigen');
                            }
                        }]
                }))
            }
        }
    }

    /**
     * @param customStop custom stop
     * accepts a customStop
     */
    acceptCustomStop(customstop) {
        this.acceptedcustomstops.push(customstop);
        let posnumber = this.linecustomstopsall.indexOf(customstop);
        if (posnumber > -1) {
            this.linecustomstopsall.splice(posnumber, 1)
        }
        this.busdriveinterface.postCustomStopStatus(customstop[0], "accepted")
    }

    /**
     * @param customStop custom stop
     * declines a customStop
     */
    declineCustomStop(customstop) {
        let posnumber = this.linecustomstopsall.indexOf(customstop);
        if (posnumber > -1) {
            this.linecustomstopsall.splice(posnumber, 1)
        }
        this.busdriveinterface.postCustomStopStatus(customstop[0], "rejected")
    }

    /**
     * @param customstops accepted customstops
     * completes a acceptedcustomstop with complete
     */
    completeAcceptedCustomStop(customstop) {
        let posnumber = this.acceptedcustomstops.indexOf(customstop);
        if (posnumber > -1) {
            this.acceptedcustomstops.splice(posnumber, 1)
        }
        this.busdriveinterface.postCustomStopStatus(customstop[0], "completed")
    }

    /**
     * @param acceptedcustomstops accepted customstops
     * completes a acceptedcustomstop with noshow
     */
    noShowAcceptedCustomStop(customstop) {
        let posnumber = this.acceptedcustomstops.indexOf(customstop);
        if (posnumber > -1) {
            this.acceptedcustomstops.splice(posnumber, 1)
        }
        this.busdriveinterface.postCustomStopStatus(customstop[0], "noshow")
    }

    /**
     * shows map fragment and all infromation of the customstop
     */
    showCustomStop(customstop) {
        console.log("-> CustomStopPage");
        for (let index = 0; index < this.linecustomstopsall.length; index++) {
            if (this.linecustomstopsall[index] == customstop) {
                this.nav.push(CustomStopPage, {
                    showcustomstop: customstop,
                });
            }
        }
    }

    /**
     * reset newcustomstops counter
     */
    resetNewCustomStopsCounter() {
        this.newcustomstopscounter = undefined;
        LocalNotifications.clear(1);
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
