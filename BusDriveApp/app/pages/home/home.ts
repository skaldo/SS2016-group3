import {Page,Platform, NavController} from 'ionic-angular';
import {BusListPage} from '../buslist/buslist';

@Page({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
    private platform;
    private nav;
  
  constructor(platform: Platform, nav: NavController) {
        this.platform = platform;
        this.nav = nav;
    }
 
      navigate() {
        console.log("Here we go!!");
        this.nav.push(BusListPage, {
            firstPassed: "value 1",
            secondPassed: "value 2"
        });
    }
}