import {Page, NavController, NavParams} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import {Lists} from '../../Services/lists';
import {language} from "../../languages/languages";

/*
  Created by ttmher
  Edited by saskl and Charel92
*/

@Page({
    templateUrl: 'build/pages/linelist/linelist.html',
    providers: [Lists]
})

export class LineListPage {
    private nav;
    private linelist;
    private selectedbus;
    private serverURL;
    public lineName;
    public title;

    constructor(nav:NavController, navParams:NavParams, private lists:Lists) {
        this.nav = nav;
        this.selectedbus = navParams.get("selectedbus")
        this.serverURL = navParams.get("URL")
        this.lineName = language.lineName;
        this.title = language.lineTitle;
    }

    /**
     * DE: Holt die Lineliste vom Server    
     * EN: gets the linelist from the server
     */
    getLinelist() {
        this.lists.getLines(this.serverURL).subscribe(
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
        this.getLinelist();
    }

    /**
     * DE: Übergibt die gewählten Linie, den gewählten Bus und die URL des Servers an TabsPage und wechselt die GUI auf DrivePage
     * EN: passes the selected line, the selected bus and the url of the server to TabsPage and switches the GUI to DrivePage
     * DE: Eingabeparameter: Element von der Lineliste
     * EN: Input parameters: element of the linelist
     */    
    navigate(line) {
        console.log("-> DrivePage");
        for (var index = 0; index < this.linelist.length; index++) {
            if (this.linelist[index] == line) {
                this.nav.push(TabsPage, {
                    selectedline: line,
                    selectedbus: this.selectedbus,
                    URL: this.serverURL
                });
            }
        }
    }
}
