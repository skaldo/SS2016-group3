import {Page, NavParams, Events} from 'ionic-angular';
import {Geolocation} from 'ionic-native';
import {ViewChild} from  '@angular/core';
import {Map} from '../../components/map/map';
import {language} from "../../components/languages/languages";
import {BusDriveInterface} from '../../components/Services/busdriveinterface';

@Page({
    templateUrl: 'build/pages/map/map.html',
    directives: [Map]
})

export class MapPage {
    @ViewChild(Map) map: Map;
    private LineStops = [];
    private LineRoute = [];

    //-----Language-----
    public title;

    constructor(navParams: NavParams, private busdriveinterface: BusDriveInterface, public events: Events) {
        this.LineStops = navParams.data[0];
        this.LineRoute = navParams.data[1];

        this.events.subscribe("mapLoaded", ()=>{
            this.showLine();
            console.log("test")
        });

        //-----Language-----
        this.title = language.mapTitle;
    }

    /**
     * shows the line ( stops and route ) on the map 
     */
    showLine() {
        this.map.loadRoute(this.LineRoute);
        this.map.loadStops(this.LineStops);
    }
}

