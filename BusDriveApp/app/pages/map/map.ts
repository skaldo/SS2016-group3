import {Page, NavParams, Events} from 'ionic-angular';
import {Geolocation} from 'ionic-native';
import {Component, ViewChild} from  '@angular/core';
import {Map} from '../../components/map/map';
import {language} from "../../components/languages/languages";
import {BusDriveInterface} from '../../components/Services/busdriveinterface';

@Component({
    templateUrl: 'build/pages/map/map.html',
    directives: [Map]
})

export class MapPage {
    @ViewChild(Map) map: Map;
    private selectedline;
    private linestopscoordinates = [];
    private linestopsnames = [];
    private lineroutecoordinates = [];
    private customstopscoordinates = [];
    private customstopsnames = [];

    //-----Language-----
    public title;

    constructor(navParams: NavParams, private busdriveinterface: BusDriveInterface, public events: Events) {
        this.selectedline = navParams.data;
        this.getLineRouteCoordinates();
        this.getLineStopsCoordinates();
        this.getLineStopsNames();
        this.events.subscribe("customStop", () => {
            this.getCustomStopsCoordinates();
            this.getCustomStopsNames();
            this.map.loadCustomStops(this.customstopscoordinates, this.customstopsnames);
        })
        this.events.subscribe("mapLoaded", () => {
            this.showLine();
        });

        //-----Language-----
        this.title = language.mapTitle;
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
     * gets the coordinates of lineroute
     */
    getLineRouteCoordinates() {
        this.lineroutecoordinates = this.busdriveinterface.getLineRouteCoordinates(this.selectedline);
    }


    /**
     * shows the line ( stops and route ) on the map 
     */
    showLine() {
        this.map.loadRoute(this.lineroutecoordinates);
        this.map.loadStops(this.linestopscoordinates, this.linestopsnames);
    }
}

