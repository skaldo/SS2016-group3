import {Page} from 'ionic-angular';
import {Geolocation} from 'ionic-native';

@Page({
  templateUrl: 'build/pages/map/map.html',
})
export class MapPage {
  private map;
  private marker;
  constructor() {
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
            this.marker = new google.maps.Marker({
              position: latLng,
              map: this.map,
            }); 
              
           }, 
           (error) => {
             console.log(error);
           }, options
    );
  }
}