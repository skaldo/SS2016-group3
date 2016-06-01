import {Page, Platform, NavController} from 'ionic-angular';
import {BusListPage} from '../buslist/buslist';

/*
  Created by ttmher
  Edited by saskl and pardypaddy and Charel92
*/

@Page({
    templateUrl: 'build/pages/home/home.html',
})

export class HomePage {
    private platform;
    private nav;
    private os;

    constructor(platform: Platform, nav: NavController) {
        this.platform = platform;
        this.nav = nav;

        this.getMobileOperatingSystem();
    }

    /**
     * DE: Wechselt die GUI auf BusListPage und übergibt die URL des Servers
     * EN: switches the GUI on BusListPage and passes the url of the server
     */
    navigate() {
        console.log("-> BusListPage");
        this.nav.push(BusListPage, {
        });
    }

    /**
     * DE: Ermittelt den OS
     * EN: detects the OS
     */
    getMobileOperatingSystem() {
        var userAgent = navigator.userAgent || navigator.vendor;
        if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i) || userAgent.match(/iPod/i)) {
            this.os = 'ios';
        }
        else if (userAgent.match(/Android/i)) {
            this.os = 'Android';
        }
        else{
            this.os = 'unknown';
        }
        console.log("os detected: ", this.os);
    }
}

