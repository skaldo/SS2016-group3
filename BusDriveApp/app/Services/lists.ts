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
    getBusses(serverURL) {
        let busses = this.http.get(serverURL+'/busses');
        return busses;
    }

    getLines(serverURL) {
        let lines = this.http.get(serverURL+`/lines`);
        return lines;
    }

    getStops(serverURL) {
        let stops = this.http.get(serverURL+`/stops`);
        return stops;
    }
    
    getRoutes(serverURL) {
        let routes = this.http.get(serverURL+`/routes`);
        return routes;
    }
}
