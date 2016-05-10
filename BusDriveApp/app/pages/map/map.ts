import {Page, NavParams} from 'ionic-angular';
import {Geolocation} from 'ionic-native';
import {language} from "../../languages/languages";
import {Lists} from '../../Services/lists';

@Page({
    templateUrl: 'build/pages/map/map.html',
    providers: [Lists]
})

export class MapPage {
    private map;
    private stoplist;
    private route;
    private routedata = [];
    
    public title;
    
    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer;

    constructor(navParams:NavParams, private lists:Lists) {
        this.stoplist = navParams.data;
        this.getroute();
        this.loadMap()
        
        this.title=language.mapTitle;
    }
        
    // Holt die Route vom Server
    getroute() {
        this.lists.getRoutes().subscribe(
            data => {
                this.route = data.json();
            },
            err => console.error(err),
            () => console.log('getRoute completed')
        );
    }
    
    // Lädt Google Maps und zeigt die eigene Position, die Position der Stops und die Route an
    loadMap() {
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
                
                // Zeigt die eigene Position auf der Karte an ( als Marker )
                let markerOptions = {
                    
                }
                let circleOptions = {
                    
                }
                let marker = new GeolocationMarker(this.map, markerOptions, circleOptions)
                
                // Verbindet die GPS Koordinaten der Route miteinander
                for (var index = 0; index < this.route[0].gpsData.length; index++) { 
                    this.routedata.push({
                        lat: this.route[0].gpsData[index].latitude,
                        lng: this.route[0].gpsData[index].longitude                       
                    })    
                }
                let routepath = new google.maps.Polyline({
                    path: this.routedata,
                    geodesic: true,
                    strokeColor: '#FF0000',
                    strokeOpacity: 1.0,
                    strokeWeight: 2
                });
                
                // Zeigt die Stops auf der Karte an ( als Marker ) 
                for (var index = 0; index < this.stoplist.length; index++) {     
                    let stopLatLng = new google.maps.LatLng(this.stoplist[index].location.latitude, this.stoplist[index].location.longitude);
                    let stopmarker = new google.maps.Marker({
                        position: stopLatLng,
                        map: this.map,
                    });
                }
                
                routepath.setMap(this.map);
                
                // Aufrufen, falls die Route von Google berechnet werden soll.
                // this.directionsDisplay.setMap(this.map);
                // this.calcroute(this.directionsService, this.directionsDisplay, latLng, latLng);
            },
            (error) => {
                console.log(error);
            }, options
        );
    }
    
    // Berechnet die Route anhand der gegebenen GPS Koordinaten ( aktuell werden die Koordinaten von Stops genutzt, später werden die von der Route genommen)
    calcroute(directionsService, directionsDisplay, startpos, endpos) {
        let stops = [];
        for (var index = 0; index < this.stoplist.length; index++) {
            stops.push({
                location: new google.maps.LatLng(this.stoplist[index].location.latitude, this.stoplist[index].location.longitude),
                stopover: false
            });
        }
        let start = startpos;
        let end = endpos;
        let request = {
            origin: start,
            destination: end,
            waypoints: stops,
            optimizeWaypoints: true,
            travelMode: google.maps.TravelMode.DRIVING
        };
        directionsService.route(request, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                var route = response.routes[0];
            }
        });
    }
}
  
