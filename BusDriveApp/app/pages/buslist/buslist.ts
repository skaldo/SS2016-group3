import {Page, Platform, NavController, NavParams} from 'ionic-angular';
import {LineListPage} from '../linelist/linelist';
@Page({
  templateUrl: 'build/pages/buslist/buslist.html'
})
export class BusListPage {
    private platform;
    private nav;
    private buslist;
    private linelist;
    private stoplist;
  constructor(platform: Platform, nav: NavController,  navParams: NavParams) {
        this.platform = platform;
        this.nav = nav;
        this.buslist = navParams.get("buslist");
        this.linelist = navParams.get("linelist");
        this.stoplist = navParams.get("stoplist");
      console.log(this.buslist[0].numberPlate.toString())
    }
 
      navigate() {
        console.log("Here we go!!");
        this.nav.push(LineListPage, {
            buslist: this.buslist,
            linelist: this.linelist,
            stoplist: this.stoplist
        });
    }
}
