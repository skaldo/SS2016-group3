import {BusListPage} from '../../app/pages/buslist/buslist.ts';
import {Http, Response, ResponseOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/RX';
import {Assert} from '../util'; //imported from Steffens util according to his suggestion


import {Page, NavController, NavParams, MenuController} from 'ionic-angular';
import {LineListPage} from '../../app/pages/linelist/linelist.ts';
import {BusDriveInterface} from '../../app/components/Services/busdriveinterface';
import {Busses} from '../../app/components/Services/busses';
import {SettingPage} from '../../app/components/setting/setting';

/**
  Created by Oliver
  Edited by Erik
  BusListPage tests
*/


  let nav:NavController;
  let navParams:NavParams;
  let settingPage:SettingPage;
  let menuController:MenuController;


describe('Dieser Test ist ein Beispiel',function(){
  let busListPage:BusListPage;
  it('hat Zugriff auf andere files',function(){
    expect(typeof busListPage).toBe(typeof BusListPage);
  });
});

describe("getting the Busses from the Server",function(){
	
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



  //let busDriveInterface:BusDriveInterface;
  //new BusDriveInterface(undefined:Http,mockedBuslist,undefined:Lines,undefined:Stops,undefined:Routes,undefined:Provider,undefined:CustomStops)
  
  //let testObject = new BusListPage(nav,navParams,busDriveInterface,menuController);
  

  let http = <Http> {
    get(url:string):Observable<Response>{
			let response:Response = new Response(
				new ResponseOptions({body:testData})
			);
			return Observable.of(response);
    }
  };

 let bussesMock = new Busses(http);
  
	it('should load Bus entries to Busses.busses', function(done){
		expect(bussesMock.getBusses()).not.toEqual([]);
    done();
	})
})
