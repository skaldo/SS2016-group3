import {Page, NavParams, Platform} from 'ionic-angular';
import {language} from "../../languages/languages";
import {Lists} from '../../Services/lists';

/*
  Created by ttmher
  Edited by saskl
*/

@Page({
  templateUrl: 'build/pages/stops/stops.html',
})

export class StopsPage {
  private LineStops = [];
  public title;
  
  constructor(navParams: NavParams, private lists:Lists, platform : Platform) {
    this.LineStops = navParams.data[0];
    this.title=language.stopTitle;
  } 
}