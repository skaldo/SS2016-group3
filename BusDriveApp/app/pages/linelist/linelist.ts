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
    private selectedbus;
  constructor(platform: Platform, nav: NavController,  navParams: NavParams) {
        this.platform = platform;
        this.nav = nav;
        this.linelist = navParams.get("linelist");
        this.stoplist = navParams.get("stoplist");
        this.selectedbus = navParams.get("selectedbus");
    }
 
    navigate(item) {
        console.log("Here we go!!");
         for (var index = 0; index < this.linelist.length; index++) {
            if(this.linelist[index] == item){
                this.nav.push(TabsPage, {
                    selectedline: item,
                    selectedbus: this.selectedbus,
                    linelist: this.linelist,
                    stoplist: this.stoplist
                });
            }
         }
      }
    }
