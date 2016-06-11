import {Events} from 'ionic-angular';
import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Busses} from '../../components/services/busses';
import {Lines} from '../../components/services/lines';
import {Stops} from '../../components/services/stops';
import {Routes} from '../../components/services/routes';
import {Provider} from '../../components/services/provider';
import {CustomStops} from '../../components/services/customstops';
import {SettingPage} from '../../components/setting/setting';

@Injectable()
export class BusDriveInterface {
        private serverURL;

    constructor(private http: Http, private setting: SettingPage, public events: Events, private busses: Busses, private lines: Lines, private stops: Stops, private routes: Routes, private provider: Provider, private customstops: CustomStops) {
        this.serverURL = setting.getServerURL();
        this.events.subscribe("newServerURL", (URL) =>{
            this.serverURL = URL;
            console.log("serverURl changed interface:" + URL)
        })
    }

    /**
     * requests busses from server
     */
    requestBusses() {
        this.busses.requestBusses(this.serverURL);
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
        this.lines.requestLines(this.serverURL);
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
        this.stops.requestStops(this.serverURL);
    }

    /**
     * @param Id id of the selected line
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
        this.routes.requestRoutes(this.serverURL);
    }

    /**
     * @param Id id of the selected line
     * @retruns route of the line
     */
    getLineRoute(Id) {
        return this.routes.getLineRoute(Id);
    }

    /**
     * @retruns route of the line
     */
    getLineRouteCoordinates() {
        return this.routes.getLineRouteCoordinates();
    }

    /**
     * @retruns coordinates of the lineroute
     */
    getLineRouteCoordinatesNative() {
        return this.routes.getLineRouteCoordinatesNative();
    }

    /**
     * requests stops from server
     */
    requestCustomStops() {
        this.customstops.requestCustomStops(this.serverURL);
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
    postRealTimeData(busID, longitude, latitude) {
        this.provider.postRealTimeData(busID, longitude, latitude, this.serverURL);
    }

    /**
     * posts updateBusStatus to server
     * @param busID ID of the selected bus
     * @param lineID ID of the selected line
     */
    postBusStatus(busID, lineID) {
        this.provider.postBusStatus(busID, lineID, this.serverURL);
    }
}
