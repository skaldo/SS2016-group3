import {Page, NavController, NavParams, MenuController} from 'ionic-angular';
import {LineListPage} from '../linelist/linelist';
import {Lists} from '../../components/Services/lists';
import {SettingPage} from '../../components/setting/setting';
import {language} from "../../components/languages/languages";

/*
  Created by ttmher
  Edited by saskl and Charel92
*/

@Page({
    templateUrl: 'build/pages/buslist/buslist.html'
})

export class BusListPage {
    private nav;
    private buslist;
    private serverURL;  
      
    public numberplate;
    public title

    constructor(nav:NavController, navParams:NavParams, private lists:Lists, private setting:SettingPage, private menu: MenuController) {
        this.nav = nav;             
        this.serverURL = setting.getServerURL();
        this.menu.swipeEnable(false);
        
        this.numberplate = language.numberplate;
        this.title = language.chooseBus;
    }

    /**
     * DE: Holt die Busliste vom Server    
     * EN: gets the buslist from the server
     */
    getBuslist() {
        this.lists.getBusses(this.serverURL).map(res => res.json()).subscribe(
            data => {
                this.buslist = data["busses"];
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
