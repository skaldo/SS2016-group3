import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {SettingPage} from '../../components/setting/setting';

@Injectable()
export class Provider {

    private serverURL;

    constructor(private http: Http, private setting: SettingPage) {
        this.serverURL = setting.getServerURL();
    }

    /**
     * posts realTimeData to server
     * @param busID ID of the selected bus
     * @param longitude Longitude of current position
     * @param latitude Latitude of current position
     */
    postRealTimeData(busID, longitude, latitude) {
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
        senddata.open('POST', this.serverURL + "/realTimeData");
        senddata.setRequestHeader('Content-Type', 'application/json');
        senddata.send(realTimeData)
        console.log("Senden: " + "Bus: " + busID, " Latitude: " + latitude, " Longitude: " + longitude);
    }

    /**
     * posts updateBusStatus to server
     * @param busID ID of the selected bus
     * @param lineID ID of the selected line
     */
    postBusStatus(busID, lineID) {
        let busStatus = JSON.stringify(
            {
                "lineId": lineID,
                "busId": busID
            })
        let senddata = new XMLHttpRequest();
        senddata.open('POST', this.serverURL + "/updateBusStatus");
        senddata.setRequestHeader("Content-Type", "application/json");
        senddata.send(busStatus)
        console.log("Senden: " + "Bus: " + busID, " Line: " + lineID);
    }

}