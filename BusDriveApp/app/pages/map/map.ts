import {Page, NavParams} from 'ionic-angular';
import {Geolocation} from 'ionic-native';
import {ViewChild} from  '@angular/core';
import {Map} from '../../components/map/map';
import {language} from "../../languages/languages";
import {Lists} from '../../Services/lists';


/*
 Created by ttmher and pardypaddy
 Edited by ttmher and saskl
 */

@Page({
    templateUrl: 'build/pages/map/map.html',
    directives: [Map]
})

export class MapPage {
    @ViewChild(Map) map:Map;
    private LineStops = [];
    private LineRoute = [];

    public title;

    constructor(navParams:NavParams, private lists:Lists) {
        this.LineStops = navParams.data[0];
        this.LineRoute = navParams.data[1];
        this.title = language.mapTitle;
        setTimeout(this.showLine.bind(this),1500);
    }
    
    /**
     * shows the line ( stops and route ) on the map 
     */
    showLine() {
        this.map.loadRoute(this.LineRoute);
        this.map.loadStops(this.LineStops);
    }
}
  
