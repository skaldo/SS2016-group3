import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {SettingPage} from '../../components/setting/setting';


@Injectable()
export class Routes {
    private route = [];
    private lineroute = [];

    private serverURL;

    constructor(private http: Http, private setting: SettingPage) {
        this.serverURL = setting.getServerURL();
    }

    /**
     * requests routes from server
     */
    requestRoutes() {
        this.http.get(this.serverURL + "/routes").map(res => res.json()).subscribe(
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
        this.lineroute = [];
        for (var index = 0; index < this.route[Id - 1].route.coordinates.length; index++) {
            this.lineroute.push({
                lat: this.route[Id - 1].route.coordinates[index][1],
                lng: this.route[Id - 1].route.coordinates[index][0]
            })
        }
        console.log("route " + Id + " will be loeaded");
        console.log("GeoJson points of the route " + this.lineroute.length);
        return this.lineroute;
    }
}