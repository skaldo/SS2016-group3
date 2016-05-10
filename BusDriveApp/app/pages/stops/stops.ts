import {Page, Platform, NavParams} from 'ionic-angular';
import {language} from "../../languages/languages";

@Page({
  templateUrl: 'build/pages/stops/stops.html'
})

export class StopsPage {
  private stoplist;
  public title;
  constructor(platform: Platform, navParams: NavParams) {
    this.stoplist = navParams.data;
    this.title=language.stopTitle;
  }
  
}