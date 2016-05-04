import {Page, Platform, NavController, NavParams} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
@Page({
  templateUrl: 'build/pages/linelist/linelist.html'
})
export class LineListPage {
    private platform;
    private nav;
    private linelist;
    private stoplist;
  constructor(platform: Platform, nav: NavController,  navParams: NavParams) {
        this.platform = platform;
        this.nav = nav;
        this.linelist = navParams.get("linelist");
        this.stoplist = navParams.get("stoplist");
    }
 
      navigate() {
        console.log("Here we go!!");
        this.nav.push(TabsPage, {
            linelist: this.linelist,
            stoplist: this.stoplist
        });
    }
}
