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
    public numberplate;
    public title;
    constructor(nav:NavController, navParams:NavParams, private lists:Lists) {
        this.nav = nav;
        this.getbuslist();       
        this.numberplate="Kennzeichen";
        this.title="Bus wählen";
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
    
    // Aktualisiert die Busliste, sobald man wieder auf BusListPage kommt.
    onPageWillEnter(){
        this.getbuslist();
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
