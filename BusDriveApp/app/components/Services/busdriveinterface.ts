import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Busses} from '../../components/services/busses';
import {Lines} from '../../components/services/lines';
import {Stops} from '../../components/services/stops';
import {Routes} from '../../components/services/routes';
import {Provider} from '../../components/services/provider';
import {CustomStops} from '../../components/services/customstops';

@Injectable()
export class BusDriveInterface {

    constructor(private http: Http, private busses: Busses, private lines: Lines, private stops: Stops, private routes: Routes, private provider: Provider, private customstops: CustomStops) {
    }

    /**
     * requests busses from server
     */
    requestBusses(serverURL) {
        this.busses.requestBusses(serverURL);
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
    requestLines(serverURL) {
        this.lines.requestLines(serverURL);
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
    requestStops(serverURL) {
        this.stops.requestStops(serverURL);
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
    requestRoutes(serverURL) {
        this.routes.requestRoutes(serverURL);
    }

    /**
     * @retruns route of the line
     */
    getLineRouteCoordinates(Id) {
        return this.routes.getLineRouteCoordinates(Id);
    }

    /**
     * requests stops from server
     */
    requestCustomStops(serverURL) {
        this.customstops.requestCustomStops(serverURL);
    }

    /**
     * @retruns names of customstops
     */
    getCustomStopsNames() {
        return this.customstops.getCustomStopsNames();
    }

    /**
     * @returns coordinates of customstops
     */
    getCustomStopsCoordinates() {
        return this.customstops.getCustomStopsCoordinates();
    }

    /**
     * posts realTimeData to server
     * @param busID ID of the selected bus
     * @param longitude Longitude of current position
     * @param latitude Latitude of current position
     */
    postRealTimeData(busID, longitude, latitude, serverURL) {
        this.provider.postRealTimeData(busID, longitude, latitude, serverURL);
    }

    /**
     * posts updateBusStatus to server
     * @param busID ID of the selected bus
     * @param lineID ID of the selected line
     */
    postBusStatus(busID, lineID, serverURL) {
        this.provider.postBusStatus(busID, lineID, serverURL);
    }
}
