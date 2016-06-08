import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {SettingPage} from '../../components/setting/setting';

@Injectable()
export class Stops {
    private stops = [];
    private linestops = [];

    private serverURL;

    constructor(private http: Http, private setting: SettingPage) {
        this.serverURL = setting.getServerURL();
    }

    /**
      * requests stops from server
      */
    requestStops() {
        this.http.get(this.serverURL + "/stops").map(res => res.json()).subscribe(
            data => {
                this.stops = data["stops"];
            },
            err => console.error("requestStops failed"),
            () => console.log('requestStops completed')
        );

    }

    /**
     * @retruns stops of the line
     */
    getLineStops(Id) {
        this.linestops = [];
        for (let i = 0; i < this.stops.length; i++) {
            for (let j = 0; j < this.stops[i].lines.length; j++) {
                if (Id === parseInt(this.stops[i].lines[j].id)) {
                    console.log("add stop to linestops:" + this.stops[i].name);
                    this.linestops.push(this.stops[i]);
                }
            }
        }
        return this.linestops;
    }

    /**
     * @retruns names of linestops
     */
    getLineStopsNames() {
        let linestopsnames = [];
        for (let i = 0; i < this.linestops.length; i++) {
            linestopsnames.push(this.linestops[i].name);
        }
        return linestopsnames;
    }

    /**
     * @returns coordinates of linestops
     */
    getLineStopsCoordinates(){
        let linestopscoordinates = [];
        for (let i = 0; i < this.linestops.length; i++) {
            linestopscoordinates.push(this.linestops[i].location.coordinates);
        }
        return linestopscoordinates;
    }
}