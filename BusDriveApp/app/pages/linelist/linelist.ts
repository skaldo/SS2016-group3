import {Page, NavController, NavParams} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import {Lists} from '../../Services/lists';
import {language} from "../../languages/languages";

/*
  Created by ttmher
  Edited by saskl
*/

@Page({
    templateUrl: 'build/pages/linelist/linelist.html',
    providers: [Lists]
})

export class LineListPage {
    private nav;
    private linelist;
    private selectedbus;
    public line ;
    public title;

    constructor(nav:NavController, navParams:NavParams, private lists:Lists) {
        this.nav = nav;
        this.selectedbus = navParams.get("selectedbus")
        this.title = language.lineTitle;
    }

    /**
     * DE: Holt die Lineliste vom Server    
     * EN: gets the linelist from the server
     */
    getlinelist() {
        this.lists.getLines().subscribe(
            data => {
                this.linelist = data.json();
            },
            err => console.error('getLines fehlgeschlagen/ getLines failed'),
            () => console.log('getLines abgeschlossen/ getLines completed')
        );
    }
    
    /**
     * DE: Aktualisiert die Lineliste, sobald man wieder auf LineListPage kommt
     * EN: updates the linelist as soon as you get back on LineListPage
     */    
    onPageWillEnter(){
        this.getlinelist();
    }

    /**
     * DE: Übergibt die gewählten Line an TabsPage und wechselt die GUI auf DrivePage
     * EN: passes the selected line to TabsPage and switches the GUI to DrivePage
     * DE: Eingabeparameter: element von der Lineliste
     * EN: Input parameters: element of the linelist
     */    navigate(item) {
        console.log("-> DrivePage");
        for (var index = 0; index < this.linelist.length; index++) {
            if (this.linelist[index] == item) {
                this.nav.push(TabsPage, {
                    selectedline: item,
                    selectedbus: this.selectedbus,
                });
            }
        }
    }
}
