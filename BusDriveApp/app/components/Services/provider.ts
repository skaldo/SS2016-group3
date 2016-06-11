import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class Provider {

    constructor(private http: Http) {
    }

    /**
     * posts realTimeData to server
     * @param busID ID of the selected bus
     * @param longitude Longitude of current position
     * @param latitude Latitude of current position
     */
    postRealTimeData(busID, longitude, latitude, serverURL) {
        let realTimeData = JSON.stringify(
            {
                "busId": busID,
                "position": {
                    "type": "Point",
                    "coordinates": [longitude, latitude]
                },
                "timeStamp": Date.now()
            })
        let senddata = new XMLHttpRequest();
        senddata.open('POST', serverURL + "/realTimeData");
        senddata.setRequestHeader('Content-Type', 'application/json');
        senddata.send(realTimeData)
        console.log("Senden: " + "Bus: " + busID, " Latitude: " + latitude, " Longitude: " + longitude);
    }

    /**
     * posts updateBusStatus to server
     * @param busID ID of the selected bus
     * @param lineID ID of the selected line
     */
    postBusStatus(busID, lineID, serverURL) {
        let busStatus = JSON.stringify(
            {
                "lineId": lineID,
                "busId": busID
            })
        let senddata = new XMLHttpRequest();
        senddata.open('POST', serverURL + "/updateBusStatus");
        senddata.setRequestHeader("Content-Type", "application/json");
        senddata.send(busStatus)
        console.log("Senden: " + "Bus: " + busID, " Line: " + lineID);
    }

}