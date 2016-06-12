import {Page, NavParams, Events} from 'ionic-angular';
import {Component, ViewChild} from  '@angular/core';
import {NativeMap} from '../../components/nativemap/nativemap';
import {language} from "../../components/languages/languages";
import {BusDriveInterface} from '../../components/Services/busdriveinterface';

@Component({
    templateUrl: 'build/pages/nativemap/nativemap.html',
    directives: [NativeMap]
})

export class NativeMapPage {
    @ViewChild(NativeMap) nativemap: NativeMap;
    private selectedline;
    private linestopscoordinates = [];
    private linestopsnames = [];
    private lineroutecoordinates = [];
    private linecustomstopscoordinates = [];
    private linecustomstopsnames = [];

    //-----Language-----
    public title;

    constructor(private busdriveinterface: BusDriveInterface, public events: Events) {
        this.getLineRouteCoordinates();
        this.getLineStopsCoordinates();
        this.getLineStopsNames();

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
    getLineCustomStopsCoordinates() {
        this.linecustomstopscoordinates = this.busdriveinterface.getLineCustomStopsCoordinates();
    }

    /**
     * gets the names of customstops
     */
    getLineCustomStopsNames() {
        this.linecustomstopsnames = this.busdriveinterface.getLineCustomStopsNames();
    }

    /**
     * gets the coordinates of lineroute
     */
    getLineRouteCoordinates() {
        this.lineroutecoordinates = this.busdriveinterface.getLineRouteCoordinatesNative();
    }

    /**
     * shows the line ( stops and route ) on the map 
     */
    showLine() {
        this.nativemap.loadStops(this.linestopscoordinates, this.linestopsnames);
    }

    onPageDidEnter() {
        setTimeout(() => {
            this.nativemap.loadMap();
        }, 250);
        setTimeout(() => {
            this.nativemap.loadStops(this.linestopscoordinates, this.linestopsnames);
            this.nativemap.loadRoute(this.lineroutecoordinates);
        }, 2500);
    }
}

