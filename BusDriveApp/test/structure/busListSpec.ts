import {BusListPage} from '../../app/pages/buslist/buslist.ts';
import {Http, Response, ResponseOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/observable';
import {Lists} from '../../app/components/Services/lists.ts';
import {Assert} from '../util'; //imported from Steffens util according to his suggestion
/**
  Created by Oliver
  Edited by Erik
  BusListPage tests
*/
let busListPage = BusListPage;

describe('Dieser Test ist ein Beispiel',function(){
  it('hat Zugriff auf andere files',function(){
    expect(typeof busListPage).toBe(typeof BusListPage);
  });
});

describe("setting up fake lists.ts for getbuslist test",function(){
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
	
	let lists = <Lists>{
		getBusses(serverUrl:string):Observable<Response>{
			let response: Response = new Response(
				new ResponseOptions({body:testData})
			);
			return Observable.of(response);
		}
	};
	let x,y,z;
	let testObject = new BusListPage(x,y,lists,z);
	it('testing get function', function(done){
		Assert.equalJson(testData,testObject.getBuslist(), 'Wrong Buslist fetched');
		done();
	})
})
