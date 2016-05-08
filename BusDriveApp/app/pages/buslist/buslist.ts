import {Page, NavController, NavParams} from 'ionic-angular';
import {LineListPage} from '../linelist/linelist';
import {Lists} from '../../Services/lists';

@Page({
    templateUrl: 'build/pages/buslist/buslist.html',
    providers: [Lists]
})

export class BusListPage {
    private nav;
    private buslist;

    constructor(nav:NavController, navParams:NavParams, private lists:Lists) {
        this.nav = nav;
        setInterval(this.getbuslist(),30000);        
    }

    // Holt die Busliste vom Server
    getbuslist() {
        this.lists.getBusses().subscribe(
            data => {
                this.buslist = data.json();
            },
            err => console.error(err),
            () => console.log('getBusses completed')
        );
    }

    // Übergibt den gewählten Bus an LineListPage und wechselt die GUI auf LineListPage
    navigate(item) {
        console.log("-> LineListPage");
        for (var index = 0; index < this.buslist.length; index++) {
            if (this.buslist[index] == item) {
                this.nav.push(LineListPage, {
                    selectedbus: item,
                });
            }
        }
    }
}
