import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class Busses {
    private busses = [];

    constructor(private http: Http) {
    }

    /**
     * requests busses from server
     */
    requestBusses(serverURL) {
        console.log("requestBusses called");
        console.log(this.http)
        this.http.get(serverURL + "/busses").map(res => res.json()).subscribe(
            data => {
                this.busses = data["busses"];
            },
            err => console.error('requestBusses failed'),
            () => console.log('requestBusses completed')
        );
    }

    /**
     * @returns JSON of busses
     */
    getBusses() {
        return this.busses;
    }

    /**
     * @returns id and numberPlate of the busses as a list of tuples
     */
    getBussesInfos() {
        let bussesInfos = [];
        for (let i = 0; i < this.busses.length; i++) {
            bussesInfos.push([this.busses[i].id, this.busses[i].numberPlate]);
        }
        return bussesInfos;
    }
}