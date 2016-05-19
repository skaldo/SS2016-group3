import {Page, Platform, NavController} from 'ionic-angular';
import {BusListPage} from '../buslist/buslist';
import {language, de, en} from "../../languages/languages";

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
    public buttontext;
    public serverURL;

    constructor(platform:Platform, nav:NavController) {
        this.platform = platform;
        this.nav = nav;
        this.serverURL = "http://localhost:3000";
        
        this.getMobileOperatingSystem();
        
        this.buttontext = language.name;
              
    }

    /**
     * DE: Wechselt die GUI auf BusListPage und übergibt die URL des Servers
     * EN: switches the GUI on BusListPage and passes the url of the server
     */
    navigate() {   
        console.log("-> BusListPage");
        this.nav.push(BusListPage, {
            URL: this.serverURL
        });
    }
    
    /**
     * DE: Ändert die GUI-Sprache
     * EN: changes the gui-language 
     */
    changeLanguage() {
        if (language === en) language = de; else language = en;
        this.buttontext = language.name;
        console.log("-> ChangeLanguage");
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
        else {
            this.os = 'unknown';
        }
        console.log("os detected: ", this.os);
    }
   
}

