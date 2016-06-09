import {Page, NavParams, Events} from 'ionic-angular';
import {Geolocation} from 'ionic-native';
import {language} from "../../components/languages/languages";
import {BusDriveInterface} from '../../components/Services/busdriveinterface';


@Page({
    templateUrl: 'build/pages/drive/drive.html',
})
export class DrivePage {
    private counter: number = 0;
    private linestopscoordinates = [];
    private linestopsnames = [];
    private customstopscoordinates = [];
    private customstopsnames = [];
    private nextStop;
    private busspeed;

    //-----Language-----
    public passengers;
    public title;

    constructor(navParams: NavParams, private busdriveinterface: BusDriveInterface, public events: Events) {
        this.getLineStopsNames();
        this.getLineStopsCoordinates();
        this.nextStop = this.linestopsnames[0];
        this.events.subscribe("getPosition", (position) => {
            this.calcNextStop(position[0], position[1], position[2]);
        });
        this.events.subscribe("customStop", () => {
            this.getCustomStopsCoordinates();
            this.getCustomStopsNames();
        })

        //-----Language-----
        this.passengers = language.passengers;
        this.title = language.driveTitle;
    }
    /**
     * increases the counter
     */
    increase() {
        this.counter++
    }

    /**
     * decreases the counter
     */
    decrease() {
        if (this.counter > 0) this.counter--
    }

    /**
     * gets the coordinates of linestops
     */
    getLineStopsCoordinates() {
        this.linestopscoordinates = this.busdriveinterface.getLineStopsCoordinates();
    }

    /**
     * gets the names of linestops
     */
    getLineStopsNames() {
        this.linestopsnames = this.busdriveinterface.getLineStopsNames();
    }

    /**
     * gets the coordinates of customstops
     */
    getCustomStopsCoordinates() {
        this.customstopscoordinates = this.busdriveinterface.getCustomStopsCoordinates();
    }

    /**
     * gets the names of customstops
     */
    getCustomStopsNames() {
        this.customstopsnames = this.busdriveinterface.getCustomStopsNames();
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

    /**
     * calculates the distance between two points (given the latitude/longitude of those points)
     * @param lat1, lon1 = Latitude and Longitude of point 1 (in decimal degrees)
     * @param lat2, lon2 = Latitude and Longitude of point 2 (in decimal degrees)
     * @returns distance between two points
     */
    distance(lat1, lng1, lat2, lng2) {
        let radlat1 = Math.PI * lat1 / 180;
        let radlat2 = Math.PI * lat2 / 180;
        let theta = lng1 - lng2;
        let radtheta = Math.PI * theta / 180;
        let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        dist = dist * 1.609344;
        dist = dist * 1000;
        console.log("stopdistance: " + dist);
        return dist
    }

    /**
     * calcs the next stop of the line
     */
    calcNextStop(latitude, longitude, busspeed) {
        this.busspeed = busspeed;
        let nextstoplng = this.linestopscoordinates[0][0];
        let nextstoplat = this.linestopscoordinates[0][1];
        if (this.distance(latitude, longitude, nextstoplat, nextstoplng) < 5) {
            this.linestopscoordinates.push(this.linestopscoordinates.shift());
            this.linestopsnames.push(this.linestopsnames.shift());
            this.nextStop = this.linestopsnames[0];
            console.log("next stop: " + this.linestopsnames[0]);
        }
    }
}
