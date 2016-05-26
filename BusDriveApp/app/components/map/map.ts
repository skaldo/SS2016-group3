import {Component, ElementRef, AfterViewInit} from 'angular2/core';
import {Geolocation} from 'ionic-native';

@Component({
    selector: 'map',
    templateUrl: 'build/components/map/map.html'
})

export class Map implements AfterViewInit {
    private map: google.maps.Map;
    private mapElement;

    constructor(private element: ElementRef) {

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
        },
            (error) => {
                console.log("Karte konnte nicht geladen werden/ ap could not be loaded", error);
            }, options
        );
    }

    /**
     * loads the route and shows it on the map
     * @param Route list of geo points
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
     * @param Stops list of stops
     */
    loadStops(Stops) {
        for (var index = 0; index < Stops.length; index++) {
            let stopLatLng = new google.maps.LatLng(Stops[index].location.latitude, Stops[index].location.longitude);
            let stopmarker = new google.maps.Marker({
                position: stopLatLng,
                map: this.map,
            });
        };
    }

    /**
     * is called after map(component's) view, and its children's views, are created
     */
    ngAfterViewInit() {
        this.loadMap();
    }
}