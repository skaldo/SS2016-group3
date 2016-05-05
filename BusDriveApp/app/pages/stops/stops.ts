import {Page, Platform, NavParams} from 'ionic-angular';


@Page({
  templateUrl: 'build/pages/stops/stops.html'
})
export class StopsPage {
  private stoplist;
  constructor(platform: Platform, navParams: NavParams) {
    this.stoplist = navParams.data;
    console.log(this.stoplist.toString());
  }
  
}