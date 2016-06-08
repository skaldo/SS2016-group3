import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {SettingPage} from '../../components/setting/setting';
import {Busses} from '../../components/services/busses';
import {Lines} from '../../components/services/lines';
import {Stops} from '../../components/services/stops';
import {Routes} from '../../components/services/routes';
import {Provider} from '../../components/services/provider';

@Injectable()
export class BusDriveInterface {
    private serverURL;

    constructor(private http: Http, private setting: SettingPage, private busses: Busses, private lines: Lines, private stops: Stops, private routes: Routes, private provider: Provider) {
        this.serverURL = setting.getServerURL();
    }

    /**
     * requests busses from server
     */
    requestBusses() {
        this.busses.requestBusses();
    }
    /**
     * @returns JSON of busses
     */
    getBusses() {
        return this.busses.getBusses();
    }

    /**
     * @returns id and numberPlate of the busses as a list of tuples
     */
    getBussesInfos() {
        return this.busses.getBussesInfos();
    }

    /**
     * requests lines from server
     */
    requestLines() {
        this.lines.requestLines();
    }
    /**
     * @returns JSON of lines
     */
    getLines() {
        return this.lines.getLines();
    }

    /**
    * @returns id and name of the lines as a list of tuples
    */
    getLinesInfos() {
        return this.lines.getLinesInfos();
    }


    /**
     * requests stops from server
     */
    requestStops() {
        this.stops.requestStops()
    }

    /**
     * @retruns stops of the line
     */
    getLineStops(Id) {
        return this.stops.getLineStops(Id);
    }

    /**
     * @retruns names of linestops
     */
    getLineStopsNames() {
        return this.stops.getLineStopsNames();
    }

    /**
     * @returns coordinates of linestops
     */
    getLineStopsCoordinates() {
        return this.stops.getLineStopsCoordinates();
    }


    /**
     * requests routes from server
     */
    requestRoutes() {
        this.routes.requestRoutes();
    }

    /**
     * @retruns route of the line
     */
    getLineRouteCoordinates(Id) {
        return this.routes.getLineRouteCoordinates(Id);
    }

    /**
     * posts realTimeData to server
     * @param busID ID of the selected bus
     * @param longitude Longitude of current position
     * @param latitude Latitude of current position
     */
    postRealTimeData(busID, longitude, latitude) {
        this.provider.postRealTimeData(busID, longitude, latitude);
    }

    /**
     * posts updateBusStatus to server
     * @param busID ID of the selected bus
     * @param lineID ID of the selected line
     */
    postBusStatus(busID, lineID) {
        this.provider.postBusStatus(busID, lineID);
    }
}
