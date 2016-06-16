
import {CustomStops} from '../../app/components/Services/customstops';
import {Http, Response, ResponseOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/RX';

/** 
 * Created by Erik
 * Edited by Oliver
 *  
 * customstops.ts service test
*/

describe("the process of getting available line entries from the server",function(){
    let testData = {customstops: [
      {
        "lineId": 1,
        "id": 1,
        "pickUpTime": 1500,
        "location": {
          "type": "Point",
          "coordinates": [
            7.606974,
            49.206611
          ]
        },
        "numberOfPersons": 3,
        "deviceID": 85757,
        "info": {
          "name": "Sascha",
          "address": "Uni Ost",
          "assistance": [
            2
          ]
        }
      },
      {
        "lineId": 1,
        "id": 2,
        "pickUpTime": 1200,
        "location": {
          "type": "Point",
          "coordinates": [
            7.603509,
            49.207039
          ]
        },
        "numberOfPersons": 1,
        "deviceID": 857547,
        "info": {
          "name": "Charel",
          "address": "Uni Sporthalle",
          "assistance": [
            2,
            1
          ]
        }
      },
      {
        "lineId": 1,
        "id": 3,
        "pickUpTime": 1430,
        "location": {
          "type": "Point",
          "coordinates": [
            7.600365,
            49.209681
          ]
        },
        "numberOfPersons": 2,
        "deviceID": 8578547,
        "info": {
          "name": "Patrick",
          "address": "Uni West",
          "assistance": [
            4,5
          ]
        }
      }
    ]};

    let http = <Http> {
    get(url:string):Observable<Response>{
			let response:Response = new Response(
				new ResponseOptions({body:testData})
			);
			return Observable.of(response);
        }
     };
    /**  
        testing if the customstops variable empty is
    */
    it('should load customstops entries', function(done){
        let customStopsMock:CustomStops = new CustomStops(http);  //	TypeError: undefined is not a constructor
        customStopsMock.requestCustomStops("");
        expect(customStopsMock.requestCustomStops(1)).not.toEqual([]);

    });
    /**  
        testing if the linecustomstops variable empty is
    */
    it('should load customlinestops entries', function(done){
        let customStopsMock:CustomStops = new CustomStops(http);  //	TypeError: undefined is not a constructor
        customStopsMock.requestCustomStops("");
        expect(customStopsMock.getLineCustomStops(1)).not.toEqual([]);

    });

    it('should load the ID of linecustomstops', function(){
      let customStopsMock:CustomStops = new CustomStops(http);
      customStopsMock.requestCustomStops("");
      expect(customStopsMock.getLineCustomStopsIds).not.toEqual([]);
    });

    it('should load the names of linecustomstops', function(){
      let customStopsMock:CustomStops = new CustomStops(http);
      customStopsMock.requestCustomStops("");
      expect(customStopsMock.getLineCustomStopsNames).not.toEqual([]);
    });

    it('should load the pickuptimes of linecustomstops', function(){
      let customStopsMock:CustomStops = new CustomStops(http);
      customStopsMock.requestCustomStops("");
      expect(customStopsMock.getLineCustomStopPickUpTimes()).not.toEqual([]);
    });

    it('should load the coordinates of linecustomstops', function(){
      let customStopsMock:CustomStops = new CustomStops(http);
      customStopsMock.requestCustomStops("");
      expect(customStopsMock.getLineCustomStopsCoordinates()).not.toEqual([]);
    });

    it('should load the number of persons', function(){
      let customStopsMock:CustomStops = new CustomStops(http);
      customStopsMock.requestCustomStops("");
      expect(customStopsMock.getLineCustomStopsNumberOfPersons()).not.toEqual([]);
    });

    it('should load the adresses of linecustomstops', function(){
      let customStopsMock:CustomStops = new CustomStops(http);
      customStopsMock.requestCustomStops("");
      expect(customStopsMock.getLineCustomStopsAddresses()).not.toEqual([]);
    });

    it('should load the assistances of linecustomstops', function(){
      let customStopsMock:CustomStops = new CustomStops(http);
      customStopsMock.requestCustomStops("");
      expect(customStopsMock.getLineCustomStopsAssistances()).not.toEqual([]);
    });

    it('should load the list of linecustomstops containing all information', function(){
      let customStopsMock:CustomStops = new CustomStops(http);
      customStopsMock.requestCustomStops("");
      expect(customStopsMock.getLineCustomStopsAll()).not.toEqual([]);
    });
})