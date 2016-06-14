import {Page, NavParams, Platform, Events} from 'ionic-angular';
import {Component} from '@angular/core';
import {language} from "../../../components/languages/languages";

import { ViewChild} from  '@angular/core';
import {Map} from '../../../components/map/map';

@Component({
  templateUrl: 'build/pages/drive/customstop/customstop.html',
  directives: [Map]
})

export class CustomStopPage {

  @ViewChild(Map) map: Map;
  private customstop;

  //-----Language-----
  public title;

  constructor(navParams: NavParams, platform: Platform, public events: Events) {
    this.customstop = navParams.get("showcustomstop");
    this.events.subscribe("mapLoaded", () => {
      let customstoplat = this.customstop[6][1];
      let customstoplng = this.customstop[6][0];
      let latlng = new google.maps.LatLng(customstoplat, customstoplng);
      this.map.setCustomstopPosition(latlng);
    });

    //-----Language-----
    this.title = language.stopTitle;
  }
}
