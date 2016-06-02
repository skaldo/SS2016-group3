import {Page, NavController, Platform} from 'ionic-angular';
import {language} from "../../../components/languages/languages";

/*
  Created by ttmher
*/

@Page({
  templateUrl: 'build/components/about/license/license.html',
})

export class LicensePage {
  private nav;

  constructor(nav: NavController) {
    this.nav = nav;
  }
}