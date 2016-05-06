import {Page,Platform, NavController} from 'ionic-angular';
import {BusListPage} from '../buslist/buslist';
import {Lists} from '../../Services/lists';

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
    public foundbuslist;
    public foundlinelist;
    public foundstoplist;
    private mess;

  
  constructor(platform: Platform, nav: NavController, private lists: Lists) {
        this.platform = platform;
        this.nav = nav;
        this.getbuslist();
        this.getlinelist();
        this.getstoplist();
        this.getMobileOperatingSystem();
        //this.buslist = [{'title':"Bus 1"},{'title':'Bus 2'},{'title':'Bus 3'},{'title':'Bus 4'}];
        //this.linelist = [{'title':'Line 1'},{'title':'Line 2'},{'title':'Line 3'},{'title':'Line 4'}]
        //this.stoplist = [{'title':'Stop 1'},{'title':'Stop 2'},{'title':'Stop 3'},{'title':'Stop 4'},{'title':'Stop 5'}]

    }
    
    getbuslist() {
        this.lists.getBusses().subscribe(
            data => {
                this.foundbuslist = data.json();
            },
            err => console.error(err),
            () => console.log('getBusses completed')
        );
    }
    
   getlinelist() {
        this.lists.getLines().subscribe(
            data => {
                this.foundlinelist = data.json();
            },
            err => console.error(err),
            () => console.log('getLines completed')
        );
    }
    
    getstoplist() {
        this.lists.getStops().subscribe(
            data => {
                this.foundstoplist = data.json();
            },
            err => console.error(err),
            () => console.log('getLines completed')
        );
    }
 
   navigate() {
        console.log("Here we go!!");
        this.nav.push(BusListPage, {
            buslist: this.foundbuslist,
            linelist: this.foundlinelist,
            stoplist: this.foundstoplist
        });
    }
    getMobileOperatingSystem() {
        var userAgent = navigator.userAgent || navigator.vendor;

        if( userAgent.match( /iPad/i ) || userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i ) )
        {
            this.os =  'ios';

        }
        else if( userAgent.match( /Android/i ) )
        {

             this.os =  'Android';
        }
        else
        {
             this.os =  'unknown';
        }   
        
        console.log("os detected: ",this.os);
    }
}
