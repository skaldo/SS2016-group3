import {Component, ElementRef, AfterViewInit, OnDestroy} from '@angular/core';
import {Geolocation} from 'ionic-native';
import {GoogleMap, GoogleMapsEvent, GoogleMapsMarker, GoogleMapsLatLng, GoogleMapsPolyline} from 'ionic-native';

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
        this.map = new GoogleMap(this.mapElementId);
        let options = { timeout: 10000, enableHighAccuracy: true };
        Geolocation.getCurrentPosition(options).then((resp) => {
            let latitude = resp.coords.latitude;
            let longitude = resp.coords.longitude;
            this.map.animateCamera({
                'target': new GoogleMapsLatLng(latitude.toString(), longitude.toString()),
                'tilt': 0,
                'zoom': 18,
                'bearing':0
            });
        })
        this.map.setMyLocationEnabled(true);
        console.log("successfully loaded map");
    }

    /**
     * loads the route and shows it on the map
     * @param route list of coordinates of the lineroute
     */
    loadRoute(route) {
        let routepath = [];
        for (let i = 0; i < route.length; i++) {
            let latlng = new GoogleMapsLatLng(route[i][1], route[i][0]);
            routepath.push(latlng);
        };
        this.map.addPolyline({
            points: routepath,
            'geodesic': true,
            'visible': true,
            'color': '#FF0000',
            'width': 4
        });
        console.log("load route ");
    }

    /**
     * loads the stops and shows them as a marker on the map
     * @param linestopscoordinates list of coordinates of the linetops
     * @param linestopsnames list of the names of the linetops
     */
    loadStops(linestopscoordinates, linestopsnames) {
        for (let index = 0; index < linestopscoordinates.length; index++) {
            let stopLatLng = new GoogleMapsLatLng(linestopscoordinates[index][1].toString(), linestopscoordinates[index][0].toString());
            this.map.addMarker({
                'position': stopLatLng,
                'title': linestopsnames[index]
            })
        };
    }



    ngOnDestroy() {
        while (this.mapElement.firstChild) {
            this.mapElement.removeChild(this.mapElement.firstChild);
        }
    }
}