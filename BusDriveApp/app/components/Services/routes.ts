import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class Routes {
    private route = [];
    private lineroutecoordinates = [];

    constructor(private http: Http) {
    }

    /**
     * requests routes from server
     */
    requestRoutes(serverURL) {
        this.http.get(serverURL + "/routes").map(res => res.json()).subscribe(
            data => {
                this.route = data["routes"];
            },
            err => console.error("requestRoute failed"),
            () => console.log('requestRoute completed')
        );
    }

    /**
     * @retruns coordinates of the lineroute
     */
    getLineRouteCoordinates(Id) {
        this.lineroutecoordinates = [];
        for (var index = 0; index < this.route[Id - 1].route.coordinates.length; index++) {
            this.lineroutecoordinates.push({
                lat: this.route[Id - 1].route.coordinates[index][1],
                lng: this.route[Id - 1].route.coordinates[index][0]
            })
        }
        console.log("route " + Id + " will be loeaded");
        console.log("GeoJson points of the route " + this.lineroutecoordinates.length);
        return this.lineroutecoordinates;
    }
}