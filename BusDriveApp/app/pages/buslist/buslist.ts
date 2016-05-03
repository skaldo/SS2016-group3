import {Page, Platform, NavController, NavParams} from 'ionic-angular';
import {LineListPage} from '../linelist/linelist';
@Page({
  templateUrl: 'build/pages/buslist/buslist.html'
})
export class BusListPage {
  constructor(platform: Platform, nav: NavController,  navParams: NavParams) {
        this.platform = platform;
        this.nav = nav;
        this.firstParam = navParams.get("firstPassed");
    }
 
      navigate() {
        console.log("Here we go!!");
        this.nav.push(LineListPage, {
            firstPassed: "line 1",
            secondPassed: "value 2"
        });
    }
}
