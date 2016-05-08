import {Page, Platform, NavController} from 'ionic-angular';
import {BusListPage} from '../buslist/buslist';

@Page({
    templateUrl: 'build/pages/home/home.html',
})
export class HomePage {
    private platform;
    private nav;
    private os;

    constructor(platform:Platform, nav:NavController) {
        this.platform = platform;
        this.nav = nav;
        this.getMobileOperatingSystem();
    }

    // Wechselt die GUI auf BusListPage 
    navigate() {
        console.log("-> BusListPage");
        this.nav.push(BusListPage, {});
    }
    
    // 
    getMobileOperatingSystem() {
        var userAgent = navigator.userAgent || navigator.vendor;
        if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i) || userAgent.match(/iPod/i)) {
            this.os = 'ios';
        }
        else if (userAgent.match(/Android/i)) {
            this.os = 'Android';
        }
        else {
            this.os = 'unknown';
        }
        console.log("os detected: ", this.os);
    }
}
