import {Page} from 'ionic-angular';
import {language} from "../../languages/languages";

/*
  Created by ttmher
  Edited by saskl
*/

@Page({
    templateUrl: 'build/pages/drive/drive.html',
})
export class DrivePage {
    public counter:number = 0;
    public passengers;
    public title;
    
    constructor() {
         this.passengers = language.passengers;
         this.title = language.driveTitle;
    }
    /**
     * DE: Erhöht den Zähler(Counter)
     * EN: increases the counter
     */
    increase() {
        this.counter++
    }

    /**
     * DE: Reduziert den Zähler(Counter)
     * EN: decreases the counter
     */
    decrease() {
        if (this.counter > 0) this.counter--
    }
}
