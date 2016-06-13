import {Page, NavParams, Platform} from 'ionic-angular';
import {Component} from '@angular/core';
import {language} from "../../../components/languages/languages";

@Component({
  templateUrl: 'build/pages/drive/customstop/customstop.html',
})

export class CustomStopPage {

  //-----Language-----
  public title;

  constructor(navParams: NavParams, platform: Platform) {
    //-----Language-----
    this.title = language.stopTitle;
  }

}