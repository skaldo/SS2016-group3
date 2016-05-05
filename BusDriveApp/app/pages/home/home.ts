import {Page,Platform, NavController} from 'ionic-angular';
import {BusListPage} from '../buslist/buslist';
import {Lists} from "../../Services/lists";
@Page({
  templateUrl: 'build/pages/home/home.html',
    providers: [Lists]
})
export class HomePage {
    private platform;
    private nav;
    private buslist = [];
    private linelist = [];
    private stoplist = [];
    public foundBusLists;
    private mess;


  
  constructor(platform: Platform, nav: NavController, private lists: Lists) {
        this.platform = platform;
        this.nav = nav;
        //this.buslist = [{'title':"Bus 1"},{'title':'Bus 2'},{'title':'Bus 3'},{'title':'Bus 4'}];
        this.linelist = [{'title':'Line 1'},{'title':'Line 2'},{'title':'Line 3'},{'title':'Line 4'}]
        this.stoplist = [{'title':'Stop 1'},{'title':'Stop 2'},{'title':'Stop 3'},{'title':'Stop 4'}]
        
    }
    getbuses() {
        this.lists.getBusses().subscribe(
            data => {
                this.foundBusLists = data.json();
            },
            err => console.error(err),
            () => console.log('getRepos completed')
        );
    }
      navigate() {

        console.log("Here we go!!");
          this.getbuses();
          this.mess = this.foundBusLists[0].numberPlate.toString();
          console.log(this.mess);
          for (let x in this.foundBusLists ){
              this.buslist[x]=this.foundBusLists[x];
          }
          this.mess = this.buslist[0].numberPlate.toString();
          console.log(this.mess);
        this.nav.push(BusListPage, {
            buslist: this.foundBusLists,
            //buslist: this.buslist,
            linelist: this.linelist,
            stoplist: this.stoplist
        });
    }
}