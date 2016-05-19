import {Page, NavController, NavParams} from 'ionic-angular';
import {LineListPage} from '../linelist/linelist';
import {Lists} from '../../Services/lists';
import {language} from "../../languages/languages";

/*
  Created by ttmher
  Edited by saskl and Charel92
*/

@Page({
    templateUrl: 'build/pages/buslist/buslist.html',
    providers: [Lists]
})

export class BusListPage {
    private nav;
    private buslist;
    private serverURL;  
      
    public numberplate;
    public title

    constructor(nav:NavController, navParams:NavParams, private lists:Lists) {
        this.nav = nav;             
        this.serverURL = navParams.get("URL");
        
        this.numberplate = language.numberplate;
        this.title = language.chooseBus;
    }

    /**
     * DE: Holt die Busliste vom Server    
     * EN: gets the buslist from the server
     */
    getBuslist() {
        this.lists.getBusses(this.serverURL).subscribe(
            data => {
                this.buslist = data.json();
            },
            err => console.error('getBusses fehlgeschlagen/ getBusses failed'),
            () => console.log('getBusses abgeschlossen/ getBusses completed')
        );
    }
    
    /**
     * DE: Aktualisiert die Busliste, sobald man wieder auf BusListPage kommt
     * EN: updates the buslist as soon as you get back on BusListPage
     */
    onPageWillEnter(){
        this.getBuslist();
    }

    /**
     * DE: Übergibt den gewählten Bus und die URL des Servers an LineListPage und wechselt die GUI auf LineListPage
     * EN: passes the selected bus and the url of the server to LineListPage and switches the GUI to LineListPage
     * DE: Eingabeparameter: Element von der Busliste
     * EN: Input parameters: element of the buslist
     */
    navigate(bus) {
        console.log("-> LineListPage");
        for (var index = 0; index < this.buslist.length; index++) {
            if (this.buslist[index] == bus) {
                this.nav.push(LineListPage, {
                    selectedbus: bus,
                    URL: this.serverURL
                });
            }
        }
    }
}
