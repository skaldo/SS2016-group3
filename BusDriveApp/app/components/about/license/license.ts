import {Page, NavController, MenuController, Platform} from 'ionic-angular';
import {Component} from '@angular/core';
import {language} from "../../../components/languages/languages";

@Component({
  templateUrl: 'build/components/about/license/license.html',
})

export class LicensePage {
  private nav;

  //-----Language-----
  private licenseTrans;

  constructor(nav: NavController, private menu: MenuController) {
    this.nav = nav;
    this.menu.swipeEnable(false);
    
    //-----Language-----
    this.licenseTrans=language.license;
  }
}