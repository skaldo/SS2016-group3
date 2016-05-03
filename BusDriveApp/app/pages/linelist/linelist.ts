import {Page, Platform, NavController, NavParams} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
@Page({
  templateUrl: 'build/pages/linelist/linelist.html'
})
export class LineListPage {
  constructor(platform: Platform, nav: NavController,  navParams: NavParams) {
        this.platform = platform;
        this.nav = nav;
        this.firstParam = navParams.get("firstPassed");
    }
 
      navigate() {
        console.log("Here we go!!");
        this.nav.push(TabsPage, {
            firstPassed: "value 1",
            secondPassed: "value 2"
        });
    }
}
