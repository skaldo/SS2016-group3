import {Page, NavParams, Platform} from 'ionic-angular';
import {language} from "../../components/languages/languages";
import {BusDriveInterface} from '../../components/Services/busdriveinterface';

@Page({
  templateUrl: 'build/pages/stops/stops.html',
})

export class StopsPage {
  private linestopsnames = [];

  //-----Language-----
  public title;

  constructor(navParams: NavParams, private busdriveinterface: BusDriveInterface, platform: Platform) {
    this.getLineStopsNames();

    //-----Language-----
    this.title = language.stopTitle;
  }

  /**
   * gets the names of  linestops
   */
  getLineStopsNames() {
    this.linestopsnames = this.busdriveinterface.getLineStopsNames();
  }
}