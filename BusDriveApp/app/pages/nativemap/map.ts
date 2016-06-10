import {Component, ViewChild} from  '@angular/core';
import {NativeMap} from '../../components/nativemap/nativemap';
import {language} from "../../components/languages/languages";

@Component({
    templateUrl: 'build/pages/nativemap/map.html',
    directives: [NativeMap]
})

export class NativeMapPage {
    @ViewChild(NativeMap) nativemap: NativeMap;

    //-----Language-----
    public title;

    constructor() {
        //-----Language-----
        this.title = language.mapTitle;
    }

    onPageDidEnter() {
        setTimeout(() => {
            this.nativemap.loadMap();
        }, 250);
    }
}

