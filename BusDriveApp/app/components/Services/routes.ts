import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class Routes {
    private routes = [];
    private lineroute = [];

    constructor(private http: Http) {
    }

    /**
     * requests routes from server
     */
    requestRoutes(serverURL) {
        this.http.get(serverURL + "/routes").map(res => res.json()).subscribe(
            data => {
                this.routes = data["routes"];
            },
            err => console.error("requestRoute failed"),
            () => console.log('requestRoute completed')
        );
    }

    /**
     * @param id of the selected line
     * @retruns route of the line
     */
    getLineRoute(LineId) {
        this.lineroute = [];
        this.lineroute = this.routes[LineId - 1].route.coordinates;
        console.log("route " + LineId + " will be loaded");
        return this.lineroute;
    }

    /**
     * @retruns coordinates of the lineroute
     */
    getLineRouteCoordinates() {
        let lineroutecoordinates = [];
        for (var index = 0; index < this.lineroute.length; index++) {
            lineroutecoordinates.push({
                lat: this.lineroute[index][1],
                lng: this.lineroute[index][0]
            })
        }
        console.log("GeoJson points of the route " + lineroutecoordinates.length);
        return lineroutecoordinates;
    }

    /**
     * @retruns coordinates of the lineroute
     */
    getLineRouteCoordinatesNative() {
        let lineroutecoordinates = [];
        for (var index = 0; index < this.lineroute.length; index++) {
            lineroutecoordinates.push([
                this.lineroute[index][1],
                this.lineroute[index][0]
            ])
        }
        console.log("GeoJson points of the route " + lineroutecoordinates.length);
        return lineroutecoordinates;
    }
}