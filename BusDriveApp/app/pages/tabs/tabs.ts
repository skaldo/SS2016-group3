import {Page, Alert, NavController, NavParams, MenuController, Events} from 'ionic-angular';
import {HomePage} from '../home/home';
import {DrivePage} from '../drive/drive';
import {MapPage} from '../map/map';
import {StopsPage} from '../stops/stops';
import {Geolocation} from 'ionic-native';
import {BusDriveInterface} from '../../components/Services/busdriveinterface';
import {language} from "../../components/languages/languages";

@Page({
    templateUrl: 'build/pages/tabs/tabs.html'
})

export class TabsPage {
    private nav;
    private tab1Root;
    private tab2Root;
    private tab3Root;
    private sendintervalID;
    private requestintervalID;

    private serverURL;
    private linestopscoordinates = [];
    private lineroutecoordinates = [];
    private rootParams = [];
    private selectedbus;
    private selectedline;
    private lng = 0;
    private lat = 0;
    private lastSendTime = undefined;

    //-----Language-----
    public map;
    public drive;
    public stops;

    constructor(nav: NavController, navParams: NavParams, private busdriveinterface: BusDriveInterface, private menu: MenuController, public events: Events) {
        this.nav = nav;
        this.tab1Root = DrivePage;
        this.tab2Root = MapPage;
        this.tab3Root = StopsPage;
        this.menu.swipeEnable(false);

        this.selectedbus = navParams.get("selectedbus");
        this.selectedline = navParams.get("selectedline");

        this.updateBusStatus();
        this.getLineRouteCoordinates();
        this.getLineStopsCoordinates();
        this.requestCustomStops();
        this.sendintervalID = setInterval(this.sendrealTimeData.bind(this), 5000);
        this.requestintervalID = setInterval(this.requestCustomStops.bind(this),15000);

        //-----Language-----
        this.map = language.mapTitle;
        this.drive = language.driveTitle;
        this.stops = language.stopTitle;
    }

    /**
     * gets the coordinates of linestops
     */
    getLineStopsCoordinates() {
        this.busdriveinterface.getLineStops(this.selectedline);
        this.linestopscoordinates = this.busdriveinterface.getLineStopsCoordinates();
    }

    /**
     * gets the coordinates of lineroute
     */
    getLineRouteCoordinates() {
        this.lineroutecoordinates = this.busdriveinterface.getLineRouteCoordinates(this.selectedline);
    }

    /**
     * updates the bus status and sends it to server iva services component
     */
    updateBusStatus() {
        this.busdriveinterface.postBusStatus(this.selectedbus, this.selectedline)
    }

    /**
     * sends the current position, the id of the selected bus and the time to the server via services component
     */
    sendrealTimeData() {
        let currenTime = undefined;
        Geolocation.getCurrentPosition().then((resp) => {
            let latitude = resp.coords.latitude;
            let longitude = resp.coords.longitude;
            let busspeed = resp.coords.speed;
            if ((this.distance(this.lat, this.lng, latitude, longitude) > 75) || (currenTime - this.lastSendTime > 56000)) {
                this.busdriveinterface.postRealTimeData(this.selectedbus, longitude, latitude)
                this.lat = latitude;
                this.lng = longitude;
                this.lastSendTime = new Date();
            }
            this.events.publish("getPosition", latitude, longitude, busspeed);
        });
        currenTime = new Date();
        console.log("passed time after last send: " + (currenTime - this.lastSendTime));
    }

    /**
     * requests customstops
     */
    requestCustomStops(){
        this.busdriveinterface.requestCustomStops();
        this.events.publish("customStop");
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
        console.log("positiondistance: " + dist);
        return dist
    }

    /**
     * alert when leaving, if you click "OK" GUI will change to HomePage and you will stop sending, if you click "Abbrechen" nothing will happen.
     */
    onPageWillLeave() {
        let alert = Alert.create({
            title: language.alertTitle,
            buttons: [
                {
                    text: language.alertCancel,
                    handler: () => {
                        console.log('alert aborted');
                    }
                },
                {
                    text: 'OK',
                    handler: () => {
                        console.log('alert confirmed');
                        this.nav.setRoot(HomePage);
                        clearInterval(this.sendintervalID);
                        clearInterval(this.requestintervalID);
                    }
                }]
        });
        this.nav.present(alert);
    }
}