import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class CustomStops {
    private customstops = [];

    constructor(private http: Http) {
    }

    /**
      * requests customstops from server
      */
    requestCustomStops(serverURL) {
        this.http.get(serverURL + "/customstops").map(res => res.json()).subscribe(
            data => {
                this.customstops = data["customstops"];
            },
            err => console.error("requestCustomStops failed"),
            () => console.log('requestCustomStops completed')
        );

    }

    /**
     * @retruns names of customstops
     */
    getCustomStopsNames() {
        let customstopsnames = [];
        for (let i = 0; i < this.customstops.length; i++) {
            customstopsnames.push(this.customstops[i].name);
        }
        return customstopsnames;
    }

    /**
     * @returns coordinates of customstops
     */
    getCustomStopsCoordinates(){
        let customstopscoordinates = [];
        for (let i = 0; i < this.customstops.length; i++) {
            customstopscoordinates.push(this.customstops[i].location.coordinates);
        }
        return customstopscoordinates;
    }
}