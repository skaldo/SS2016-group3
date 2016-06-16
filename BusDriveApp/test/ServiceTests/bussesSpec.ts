
import {Http, Response, ResponseOptions, Headers,HTTP_PROVIDERS, XHRBackend} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {provide} from '@angular/core';
import {Observable} from 'rxjs/RX';
import {Busses} from '../../app/components/Services/busses';
import {
  describe,
  expect,
  beforeEach,
  it,
  inject,
  injectAsync,
  beforeEachProviders
} from '@angular/core/testing';


/**
  busses.ts service test
*/

describe("the process of getting available Bus entries from the Server",function(){
	
   beforeEachProviders(() => {
      return [
        HTTP_PROVIDERS,
        provide(XHRBackend, {useClass: MockBackend}),
        Busses
      ];
   });

	it('should load Bus entries', inject([XHRBackend, Busses], (mockBackend, busses) => {
      
      let testData =   {busses:  [{
        id: 1,
        numberPlate: "KL-AB345",
        color: "green",
        picture: "http://www.tm4.com/wp-content/uploads/2014/08/Foton-bus-12-m-e1407525133477.png"
         },
        {
        id: 2,
        numberPlate: "KL-CD678",
        color: "red",
        picture: "http://littlebabybum.com/wp-content/uploads/2015/01/wheels-on-the-bus-red.png"
      }]};
    
    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        connection.mockRespond(new Response(
          new ResponseOptions({body: testData}
          )));
      }
    );
      
    busses.requestBusses("http://localhost:3000");
		expect(busses.getBusses()).not.toEqual([]);
	}));
});
