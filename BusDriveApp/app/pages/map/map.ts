import {Page, NavParams} from 'ionic-angular';
import {Geolocation} from 'ionic-native';

@Page({
  templateUrl: 'build/pages/map/map.html',
})
export class MapPage {
  private map;
  private stoplist;
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
              
           }, 
           (error) => {
             console.log(error);
           }, options
    );
  }
}
