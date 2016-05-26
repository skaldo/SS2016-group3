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

    /**
     * @param serverURL URL of the server
     * @returns JSON of busses
     */
    getBusses(serverURL) {
        let busses = this.http.get(serverURL + "/busses");
        return busses;
    }
    
    /**
     * @param serverURL URL of the Server
     * @returns JSN of lines
     */
    getLines(serverURL) {
        let lines = this.http.get(serverURL + "/lines");
        return lines;
    }

    /**
     * @param serverURL URL of the Server
     * @retruns JSON of stops
     */
    getStops(serverURL) {
        let stops = this.http.get(serverURL + "/stops");
        return stops;
    }
    
    /**
     * @param serverURL URL of the Server
     * @retruns JSON of routes
     */
    getRoutes(serverURL) {
        let routes = this.http.get(serverURL + "/routes");
        return routes;
    }

    /**
     * posts realTimeData to server
     * @param serverURL URL of the Server
     * @param busID ID of the selected bus
     * @param longitude Longitude of current position
     * @param latitude Latitude of current position
     */
    postRealTimeData(serverURL, busID, longitude, latitude) {
        let realTimeData = JSON.stringify(
            {
                "busid": busID,
                "position": {
                    "type": "Point",
                    "coordinatates": [longitude, latitude]
                },
                "timeStamp": Date.now()
            })
        let senddata = new XMLHttpRequest();
        senddata.open('POST', serverURL + "/realTimeData");
        senddata.setRequestHeader('Content-Type', 'application/json');
        senddata.send(realTimeData)
        console.log("Senden")
        console.log("Latitude: ", latitude, "Longitude: ", longitude);
        console.log("Bus: ", busID);
    }

    /**
     * posts updateBusStatus to server
     * @param serverURL URL of the Server
     * @param busID ID of the selected bus
     * @param lineID ID of the selected line
     */
    postBusStatus(serverURL, busID, lineID) {
        let busStatus = JSON.stringify(
            {
                "lineid": lineID,
                "busid": busID
            })
        let senddata = new XMLHttpRequest();
        senddata.open('POST', serverURL + "/updateBusStatus");
        senddata.setRequestHeader("Content-Type", "application/json");
        senddata.send(busStatus)
        console.log("Senden")
        console.log("Bus: ", busID, "Line: ", lineID);
    }
}
