import {Page, Platform, NavController} from 'ionic-angular';
import {BusListPage} from '../buslist/buslist';
import {language} from "../../components/languages/languages";
import {BusDriveInterface} from '../../components/Services/busdriveinterface';
import {SettingPage} from '../../components/setting/setting';

@Page({
    templateUrl: 'build/pages/home/home.html',
})

export class HomePage {
    private platform;
    private nav;
    private os;

    private serverURL;

    //-----Language-----
    public beginTour;

    constructor(platform: Platform, nav: NavController, private busdriveinterface: BusDriveInterface, private setting:SettingPage) {
        this.platform = platform;
        this.nav = nav;

        this.serverURL = setting.getServerURL();
        this.requestData();

        //-----Language-----
        this.beginTour = language.beginTour;
        this.getMobileOperatingSystem();
    }

    /**
     * requests data from server via services component
     */
    requestData(){
        this.busdriveinterface.requestBusses(this.serverURL);
        this.busdriveinterface.requestLines(this.serverURL);
        this.busdriveinterface.requestStops(this.serverURL);
        this.busdriveinterface.requestRoutes(this.serverURL);
    }

    /**
     * switches the GUI on BusListPage and passes the url of the server
     */
    navigate() {
        console.log("-> BusListPage");
        this.nav.push(BusListPage, {
        });
    }

    /**
     * detects the OS
     */
    getMobileOperatingSystem() {
        if (this.platform.is('ios')) {
            this.os = 'iOS';
        }
        else if (this.platform.is('android')) {
            this.os = 'Android';
        }
        else {
            this.os = 'unknown';
        }
        console.log("current OS: " + this.os);
    }
}

