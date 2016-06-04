import {Page, Alert, NavController, NavParams, MenuController} from 'ionic-angular';
import {HomePage} from '../home/home';
import {DrivePage} from '../drive/drive';
import {MapPage} from '../map/map';
import {StopsPage} from '../stops/stops';
import {Geolocation} from 'ionic-native';
import {Lists} from '../../components/Services/lists';
import {language} from "../../components/languages/languages";

/*
 Created by ttmher
 Edited by Charel92  and saskl
 */

@Page({
    templateUrl: 'build/pages/tabs/tabs.html'
})

export class TabsPage {
    private nav;
    private intervalID;

    private stoplist = [];
    private linestops = [];
    private route = [];
    private lineroute = [];
    private rootParams = [];

    private selectedbus;
    private selectedline;
    private serverURL;

    private lng = 0;
    private lat = 0;
    private lastSendTime = undefined;

    private tab1Root;
    private tab2Root;
    private tab3Root;

    public map;
    public drive;
    public stops;

    constructor(nav: NavController, navParams: NavParams, private lists: Lists, private menu: MenuController) {
        this.nav = nav;
        this.tab1Root = DrivePage;
        this.tab2Root = MapPage;
        this.tab3Root = StopsPage;
        this.menu.swipeEnable(false);

        this.selectedbus = navParams.get("selectedbus");
        this.selectedline = navParams.get("selectedline");
        this.serverURL = navParams.get("URL");

        this.getStoplist();
        this.getRoute();
        this.setRootParams();

        this.map = language.mapTitle;
        this.drive = language.driveTitle;
        this.stops = language.stopTitle;

        this.intervalID = setInterval(this.sendrealTimeData.bind(this), 5000)
        this.lists.postBusStatus(this.serverURL, this.selectedbus.id, this.selectedline.id)

    }

    /**
     * gets the stoplist from the server and removes stops which do not belong to the line
     */
    getStoplist() {
        this.lists.getStops(this.serverURL).map(res => res.json()).subscribe(
            data => {
                this.stoplist = data["stops"];
                for (let index = 0; index < this.stoplist.length; index++) {
                    for (let jndex = 0; jndex < this.stoplist[index].lines.length; jndex++) {
                        if (this.selectedline.id === parseInt(this.stoplist[index].lines[jndex].id)) {
                            console.log("jetzt wird gepusht", this.stoplist[index].name)
                            this.linestops.push(this.stoplist[index]);
                        }
                    }
                }
            },
            err => console.error("getStops failed"),
            () => console.log('getStops completed')
        );
    }

    /**
     * gets the routes from the server and removes routes which do not belong to the line
     */
    getRoute() {
        this.lists.getRoutes(this.serverURL).map(res => res.json()).subscribe(
            data => {
                this.route = data["routes"];
                console.log("jetzt wird die Route geladen:", this.selectedline.id);
                for (var index = 0; index < this.route[this.selectedline.id - 1].route.coordinates.length; index++) {
                    this.lineroute.push({
                        lat: this.route[this.selectedline.id - 1].route.coordinates[index][1],
                        lng: this.route[this.selectedline.id - 1].route.coordinates[index][0]
                    })
                }
                console.log("Länge" + this.lineroute.length)
            },
            err => console.error("getRoute failed"),
            () => console.log('getRoute completed')
        );
    }

    /**
     * sets rootParams
     */
    setRootParams() {
        this.rootParams = [this.linestops, this.lineroute]
    }

    /**
     * sends the current position, the id of the selected bus and the time to the server
     */
    sendrealTimeData() {
        let currenTime = undefined;
        Geolocation.getCurrentPosition().then((resp) => {
            let latitude = resp.coords.latitude;
            let longitude = resp.coords.longitude;
            if ((this.distance(this.lat, this.lng, latitude, longitude) > 75) || (currenTime - this.lastSendTime > 56000)) {
                this.lists.postRealTimeData(this.serverURL, this.selectedbus.id, longitude, latitude)
                this.lat = latitude;
                this.lng = longitude;
                this.lastSendTime = new Date();
            }
        });
        currenTime = new Date();
        console.log("passed time after last send: " + (currenTime - this.lastSendTime));
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
                        clearInterval(this.intervalID);
                    }
                }]
        });
        this.nav.present(alert);
    }
}