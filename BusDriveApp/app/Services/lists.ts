import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';

@Injectable()
export class Lists {
    constructor(private http:Http) {
    }

// Hier wird die Methode deklariert die die Busse anfragt, später kommen noch ein paar mehr hinzu
    getBusses() {
        let busses = this.http.get(`http://192.168.178.76:3000/busses`);
        return busses;
    }

    getLines() {
        let lines = this.http.get(`http://192.168.178.76:3000/lines`);
        return lines;
    }

    getStops() {
        let stops = this.http.get(`http://192.168.178.76:3000/stops`);
        return stops;
    }
}