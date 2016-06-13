
import {Http, Response, ResponseOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/RX';
import {Busses} from '../../app/components/Services/busses';

/**
  Busses.ts service test
*/

describe("the process of getting available Bus entries from the Server",function(){
	
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



  let http = <Http> {
    get(url:string):Observable<Response>{
			let response:Response = new Response(
				new ResponseOptions({body:testData})
			);
			return Observable.of(response);
    }
  };
  

	it('should load Bus entries', function(done){
    let bussesMock:Busses = new Busses(http); //	TypeError: undefined is not a constructor (evaluating 'new busses_1.Busses(http)')
    bussesMock.requestBusses("");
		expect(bussesMock.getBusses()).not.toEqual([]);
    done();
	})
})
