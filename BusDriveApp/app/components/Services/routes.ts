import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

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
     * @retruns route of the route
     */
    getLineRoute(Id) {
        this.lineroute = [];
        this.lineroute = this.routes[Id - 1].route.coordinates;
        console.log("route " + Id + " will be loeaded");
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
                this.lineroute[index][1].toString(),
                this.lineroute[index][0].toString()
            ])
        }
        console.log("GeoJson points of the route " + lineroutecoordinates.length);
        return lineroutecoordinates;
    }
}