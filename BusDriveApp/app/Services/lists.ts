import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';

@Injectable()
export class Lists {
    constructor(private http: Http) {
    }

    getBusses() {
        let busses = this.http.get(`http://localhost:3000/busses`);
        return busses;
    }
}