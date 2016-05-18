import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';

/*
  Created by Charel92
  Edited by ttmher
*/

@Injectable()
export class Lists {
    constructor(private http:Http) {
    }

// Hier wird die Methode deklariert die die Busse anfragt, später kommen noch ein paar mehr hinzu
    getBusses(serverIP) {
        let busses = this.http.get(serverIP+'/busses');
        return busses;
    }

    getLines(serverIP) {
        let lines = this.http.get(serverIP+`/lines`);
        return lines;
    }

    getStops(serverIP) {
        let stops = this.http.get(serverIP+`/stops`);
        return stops;
    }
    
    getRoutes(serverIP) {
        let routes = this.http.get(serverIP+`/routes`);
        return routes;
    }
}
