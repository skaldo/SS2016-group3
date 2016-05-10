import {Page} from 'ionic-angular';
import {language} from "../../languages/languages";


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
    // Erhöht den Zähler(Counter)
    increase() {
        this.counter++
    }

    // Reduziert den Zähler(Counter)
    decrease() {
        if (this.counter > 0) this.counter--
    }
}
