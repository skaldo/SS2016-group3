import {Page, NavParams} from 'ionic-angular';
import {DrivePage} from '../drive/drive';
import {MapPage} from '../map/map';
import {StopsPage} from '../stops/stops';
import {Geolocation} from 'ionic-native';
import {Lists} from '../../Services/lists';
import {language} from "../../languages/languages";

@Page({
    templateUrl: 'build/pages/tabs/tabs.html',
    providers: [Lists]
})

export class TabsPage {
    private stoplist;
    private selectedbus;
    private selectedline;
    private tab1Root;
    private tab2Root;
    private tab3Root;
    private latitude;
    private longitude
    public map;
    public drive;
    public stops;
    
    constructor(navParams:NavParams, private lists:Lists) {
        this.getstoplist();
        this.selectedbus = navParams.get("selectedbus")
        this.selectedline = navParams.get("selectedline")
        this.tab1Root = DrivePage;
        this.tab2Root = MapPage;
        this.tab3Root = StopsPage;
        this.log();
        this.map = language.mapTitle;
        this.drive = language.driveTitle;
        this.stops = language.stopTitle;
        
        
        // setInterval(this.sendcurrentbusstatus,3000)
    }
    
    // Holt die Stopliste vom Server
    getstoplist() {
        this.lists.getStops().subscribe(
            data => {
                this.stoplist = data.json();
            },
            err => console.error(err),
            () => console.log('getStops completed')
        );
    }

    log() {
        console.log(this.selectedbus.id.toString());
        console.log(this.selectedline.id.toString());
    }

    sendcurrentbusstatus() {
        Geolocation.getCurrentPosition().then((resp) => {
            this.latitude = resp.coords.latitude;
            this.longitude = resp.coords.longitude;
            console.log("Latitude: ", this.latitude, "Longitude: ", this.longitude);
        });
    }
}
     
     
   
