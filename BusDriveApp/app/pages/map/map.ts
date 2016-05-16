import {Page, NavParams} from 'ionic-angular';
import {Geolocation} from 'ionic-native';
import {language} from "../../languages/languages";
import {Lists} from '../../Services/lists';

/*
  Created by ttmher and pardypaddy
  Edited by ttmher and saskl
*/

@Page({
    templateUrl: 'build/pages/map/map.html',
    providers: [Lists]
})

export class MapPage {
    private map;
    private LineStops = [];
    private LineRoute = [];

    public title;

    constructor(navParams:NavParams, private lists:Lists) {
        this.LineStops = navParams.data[0];
        this.LineRoute = navParams.data[1];
        this.loadMap();
        this.title = language.mapTitle;
    }

    /**
     * DE: Lädt Google Maps und zeigt die eigene Position, die Position der Stops und die Route auf der Karte an
     * EN: loads Google Maps and shows its own position, the position of the stops and the route on the map
     */ 
    loadMap() {
        console.log("Lade die Karte/ started loading map");
        let options = {timeout: 10000, enableHighAccuracy: true};
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
                    rotateControl: true
                }
                this.map = new google.maps.Map(document.getElementById("map"), mapOptions);

                /**
                 * DE: Zeigt die eigene Position auf der Karte an ( als ein blauer Marker )
                 * EN: shows its own position on the map ( as a blue marker )
                 */
                let geoloccontrol = new klokantech.GeolocationControl(this.map, 18);

                /**
                 * DE: Erstellt Marker für die Stopps auf der Karte 
                 * EN: creats markers for the stops on the map
                */ 
                for (var index = 0; index < this.LineStops.length; index++) {
                    let stopLatLng = new google.maps.LatLng(this.LineStops[index].location.latitude, this.LineStops[index].location.longitude);
                    let stopmarker = new google.maps.Marker({
                        position: stopLatLng,
                        map: this.map,
                    });
                };
                /**
                 * DE: Verbindet die einzelnen GPS-Punkte der Route miteinander
                 * EN: connects the individual GPS-Points of the route to each other
                 */
                let routepath = new google.maps.Polyline({
                    path: this.LineRoute,
                    geodesic: true,
                    strokeColor: '#FF0000',
                    strokeOpacity: 1.0,
                    strokeWeight: 3
                });
                routepath.setMap(this.map);
                console.log("Karte erfolgreich geladen/ successfully loaded map");                
            },
            (error) => {
                console.log("Karte konnte nicht geladen werden/ ap could not be loaded", error);
            }, options
        );
    }
}
  
