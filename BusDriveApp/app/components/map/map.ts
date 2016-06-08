import {Events} from 'ionic-angular';
import {Component, ElementRef, AfterViewInit} from '@angular/core';
import {Geolocation} from 'ionic-native';

@Component({
    selector: 'map',
    templateUrl: 'build/components/map/map.html'
})

export class Map implements AfterViewInit {
    private map: google.maps.Map;
    private mapElement;
    private customstopsmarkers = [];

    constructor(private element: ElementRef, public events: Events) {

    }

    /**
     * loads Google Maps and shows its own position ( after you clicked the button )
     */
    loadMap() {
        console.log("Lade die Karte/ started loading map");
        let options = { timeout: 10000, enableHighAccuracy: true };
        navigator.geolocation.getCurrentPosition((position) => {
            let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            let mapOptions = {
                center: latLng,
                zoom: 15,
                mapTypeControl: true,
                mapTypeControlOptions: {
                    style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
                    mapTypeIds: [
                        google.maps.MapTypeId.ROADMAP,
                        google.maps.MapTypeId.SATELLITE
                    ]
                },
                zoomControl: true,
                streetViewControl: false
            }
            this.mapElement = this.element.nativeElement.children[0];
            this.map = new google.maps.Map(this.mapElement, mapOptions);

            let geoloccontrol = new klokantech.GeolocationControl(this.map, 18);

            console.log("Karte erfolgreich geladen/ successfully loaded map");
            this.events.publish("mapLoaded");
        },
            (error) => {
                console.log("Karte konnte nicht geladen werden/ ap could not be loaded", error);
            }, options
        );
    }

    /**
     * loads the route and shows it on the map
     * @param Route list of coordinates of the lineroute
     */
    loadRoute(Route) {
        let routepath = new google.maps.Polyline({
            path: Route,
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 3
        });
        routepath.setMap(this.map);
    }

    /**
     * loads the stops and shows them as a marker on the map
     * @param linestopscoordinates list of coordinates of the linetops
     * @param linestopsnames list of the names of the linetops
     */
    loadStops(linestopscoordinates, linestopsnames) {
        for (let index = 0; index < linestopscoordinates.length; index++) {
            let stopLatLng = new google.maps.LatLng(linestopscoordinates[index][1], linestopscoordinates[index][0]);
            let stopmarker = new google.maps.Marker({
                position: stopLatLng,
                map: this.map,
                label: linestopsnames[index]
            });
        };
    }

    /**
     * loads the custumstops and shows them as a marker on the map
     * @param customstopscoordinates list of coordinates of the customstops
     * @param customstopsnames list of the names of the customstops
     */
    loadCustomStops(customstopscoordinates, customstopsnames) {
        for (let i = 0; i < this.customstopsmarkers.length; i++) {
            this.customstopsmarkers[i].setMap(null);
        }
        this.customstopsmarkers = [];
        for (let index = 0; index < customstopscoordinates.length; index++) {
            let customstopLatLng = new google.maps.LatLng(customstopscoordinates[index][1], customstopscoordinates[index][0]);
            let customstopmarker = new google.maps.Marker({
                position: customstopLatLng,
                map: this.map,
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 10
                },
                label: customstopsnames[index]
            });
            this.customstopsmarkers.push(customstopmarker);
        };
    }

    /**
     * is called after map(component's) view, and its children's views, are created
     */
    ngAfterViewInit() {
        this.loadMap();
    }
}