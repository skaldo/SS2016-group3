import {Page, NavController, NavParams, MenuController} from 'ionic-angular';
import {Component} from '@angular/core';
import {LineListPage} from '../linelist/linelist';
import {BusDriveInterface} from '../../components/Services/busdriveinterface';
import {language} from "../../components/languages/languages";

@Component({
    templateUrl: 'build/pages/buslist/buslist.html'
})

export class BusListPage {
    private nav;
    private bussesInfos = [];

    //-----Language-----
    public numberplate;
    public title

    constructor(nav: NavController, navParams: NavParams, private busdriveinterface: BusDriveInterface, private menu: MenuController) {
        this.nav = nav;
        this.menu.swipeEnable(false);

        this.getBussesInfos();

        //-----Language-----
        this.numberplate = language.numberplate;
        this.title = language.chooseBus;
    }

    /**
     * gets id and numberPlate of the busses as a list of tuples
     */
    getBussesInfos() {
        this.bussesInfos = this.busdriveinterface.getBussesInfos();
    
    }

    /**
     * passes the selected bus and the url of the server to LineListPage and switches the GUI to LineListPage
     * @param bus element of the buslist
     */
    selectBus(bus) {
        console.log("-> LineListPage");
        for (var index = 0; index < this.bussesInfos.length; index++) {
            if (this.bussesInfos[index] == bus) {
                this.nav.push(LineListPage, {
                    selectedbus: bus[0],
                });
            }
        }
    }
}
