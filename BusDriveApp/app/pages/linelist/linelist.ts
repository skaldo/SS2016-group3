import {Page, Platform, NavController, NavParams} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
@Page({
  templateUrl: 'build/pages/linelist/linelist.html'
})
export class LineListPage {
    private platform;
    private nav;
    private firstParam;
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
