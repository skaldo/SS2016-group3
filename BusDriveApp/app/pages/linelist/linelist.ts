import {Page, NavController, NavParams} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import {Lists} from '../../Services/lists';

@Page({
    templateUrl: 'build/pages/linelist/linelist.html',
    providers: [Lists]
})

export class LineListPage {
    private nav;
    private linelist;
    private selectedbus;

    constructor(nav:NavController, navParams:NavParams, private lists:Lists) {
        this.nav = nav;
        this.getlinelist();
        this.selectedbus = navParams.get("selectedbus")
    }

    // Holt die Lineliste vom Server
    getlinelist() {
        this.lists.getLines().subscribe(
            data => {
                this.linelist = data.json();
            },
            err => console.error(err),
            () => console.log('getLines completed')
        );
    }

    // Übergibt den gewählten Bus und die gewählte Line an TabsPage und wechselt die GUI auf DrivePage
    navigate(item) {
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
