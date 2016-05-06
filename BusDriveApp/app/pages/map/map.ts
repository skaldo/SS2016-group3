import {Page, NavParams} from 'ionic-angular';
import {Geolocation} from 'ionic-native';

@Page({
  templateUrl: 'build/pages/map/map.html',
})
export class MapPage {
  private map;
  private stoplist;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  constructor(navParams: NavParams) {
    this.stoplist = navParams.data;
    this.loadMap()
  }

loadMap(){
    
    let options = {timeout: 10000, enableHighAccuracy: true};
    navigator.geolocation.getCurrentPosition((position) => {
            
            let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            let mapOptions = {
                center: latLng,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                zoomControl: true               
            }
            this.map = new google.maps.Map(document.getElementById("map"), mapOptions);
            let marker = new google.maps.Marker({
              icon: 'http://maps.google.com/mapfiles/ms/icons/bus.png',
              position: latLng,
              map: this.map,
            }); 
            
            // show stops on map
            for (var index = 0; index < this.stoplist.length; index++) {
              // let stopLatLng = this.stoplist[index].location doesnt work :(
                
              let stopLatLng = new google.maps.LatLng (this.stoplist[index].latitude, this.stoplist[index].longitude );
              console.log(this.stoplist[index].location);
              let stopmarker = new google.maps.Marker({
                position: stopLatLng,
                map: this.map,
                });            
            }
            
            this.directionsDisplay.setMap(this.map);
            this.route(this.directionsService,this.directionsDisplay,latLng);              
           }, 
           (error) => {
             console.log(error);
           }, options
    );
  }
  
  route(directionsService, directionsDisplay, myPos){
    let stops = [];
    for (var index = 0; index < this.stoplist.length; index++) {
      stops.push({
        location: new google.maps.LatLng (this.stoplist[index].latitude, this.stoplist[index].longitude ),
        stopover: true       
      });    
    }         
    let start = myPos;
    let end =  myPos;    
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
  
