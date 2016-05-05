import {Page,Platform, NavController} from 'ionic-angular';
import {BusListPage} from '../buslist/buslist';

@Page({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
    private platform;
    private nav;
    private buslist = [];
    private linelist = [];
    private stoplist = [];

  
  constructor(platform: Platform, nav: NavController) {
        this.platform = platform;
        this.nav = nav;
        this.buslist = [{'title':"Bus 1"},{'title':'Bus 2'},{'title':'Bus 3'},{'title':'Bus 4'}];
        this.linelist = [{'title':'Line 1'},{'title':'Line 2'},{'title':'Line 3'},{'title':'Line 4'}]
        this.stoplist = [{'title':'Stop 1'},{'title':'Stop 2'},{'title':'Stop 3'},{'title':'Stop 4'}]

    }
 
      navigate() {
        console.log("Here we go!!");
        this.nav.push(BusListPage, {
            buslist: this.buslist,
            linelist: this.linelist,
            stoplist: this.stoplist
        });
    }
}