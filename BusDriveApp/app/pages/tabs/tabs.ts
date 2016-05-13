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
    private stoplist = [];
    private linestops = [];
    private route = [];
    private lineroute = [];
    private data = [];
    
    private selectedbus;
    private selectedline;
    
    private tab1Root;
    private tab2Root;
    private tab3Root;
    private latitude;
    private longitude;
    
    public map;
    public drive;
    public stops;
    
    constructor(navParams:NavParams, private lists:Lists) {
        this.selectedbus = navParams.get("selectedbus")
        this.selectedline = navParams.get("selectedline")
        this.log();
        
        this.tab1Root = DrivePage;
        this.tab2Root = MapPage;
        this.tab3Root = StopsPage;
        
        this.getstoplist();
        this.getRoute();
        this.setData();
        
        this.map = language.mapTitle;
        this.drive = language.driveTitle;
        this.stops = language.stopTitle;
                
        // setInterval(this.sendcurrentbusstatus,3000)
    }
    
    // Holt die die Route vom Server und entfernt Stops, die nicht zu der Line gehören
    getstoplist() {
        this.lists.getStops().subscribe(
            data => {
                this.stoplist = data.json();
                for ( let index = 0; index < this.stoplist.length; index++) { 
                    for ( let jndex = 0; jndex < this.stoplist[index].lines.length; jndex++){
                        if (this.selectedline.id === this.stoplist[index].lines[jndex]){
                            console.log("jetzt wird gepusht", this.stoplist[index].name)
                            this.linestops.push(this.stoplist[index]);
                        }
                    }
                }
            },
            err => console.error(err),
            () => console.log('getStops completed')
        );
    }

   // Holt die die Route vom Server und entfernt Routen, die nicht zur Line gehören
    getRoute(){
        this.lists.getRoutes().subscribe(
            data => {
                this.route = data.json();
                console.log("jetzt wird die Route geladen:",this.selectedline.id-1);
                for (var index = 0; index < this.route[this.selectedline.id-1].gpsData.length; index++) { 
                    this.lineroute.push({
                        lat: this.route[0].gpsData[index].latitude,
                        lng: this.route[0].gpsData[index].longitude                       
                    })    
                 } 
            },
            err => console.error(err),
            () => console.log('getRoute completed')
        );               
    }
    
    setData(){
         this.data = [this.linestops, this.lineroute]
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
     
     
   
