import {Component, ElementRef, AfterViewInit, OnDestroy} from '@angular/core';
import {Geolocation} from 'ionic-native';
import {GoogleMap, GoogleMapsEvent} from 'ionic-native';

@Component({
    selector: 'nativemap',
    templateUrl: 'build/components/nativemap/nativemap.html'
})

export class NativeMap implements OnDestroy {
    private map;
    private mapElement;
    private mapElementId;

    constructor(private element: ElementRef) {

    }

    /**
     * loads Google Maps and shows its own position ( after you clicked the button )
     */
    loadMap() {
        this.mapElementId = 'map' + new Date().getTime();
        this.mapElement = this.element.nativeElement.children[0];
        this.mapElement.setAttribute('id', this.mapElementId);
        let map = new GoogleMap(this.mapElementId);
        console.log("successfully loaded map");
    }

    ngOnDestroy() {
        while (this.mapElement.firstChild) {
            this.mapElement.removeChild(this.mapElement.firstChild);
        }
    }
}