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
    }
 
      navigate(item) {
        console.log("Here we go!!");
         for (var index = 0; index < this.buslist.length; index++) {
            if(this.buslist[index] == item){
                this.nav.push(LineListPage, {
                    selectedbus: item,
                    buslist: this.buslist,
                    linelist: this.linelist,
                    stoplist: this.stoplist
                });
            }
        }
      }
    }
