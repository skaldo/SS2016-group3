import {Page} from 'ionic-angular';


@Page({
    templateUrl: 'build/pages/drive/drive.html',
})
export class DrivePage {
    public counter:number = 0;

    constructor() {

    }
    // Erhöhrt den Zähler(Counter)
    increase() {
        this.counter++
    }

    // Reduziert den Zähler(Counter)
    decrease() {
        this.counter--
    }
}
