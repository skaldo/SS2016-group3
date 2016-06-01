import {BusListPage} from '../../app/pages/buslist/buslist.ts';
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

describe("test",function(){
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
	
	let testObject = new BusListPage(x,y,lists,z);
	it('name', function(done){
		
		done();
	})
})

describe("tests for the buslist page",function(){

	let testBuslistPage = new BusListPage();

	it("testing the getBuslist function",function(){
		
		let testBuslist = testBuslistPage.getBuslist();
		let actualBuslist = [
			{
			  "id": 1,
			  "numberPlate": "KL-AB345",
			  "color": "green",
			  "picture": "http://www.tm4.com/wp-content/uploads/2014/08/Foton-bus-12-m-e1407525133477.png"
			},
			{
			  "id": 2,
			  "numberPlate": "KL-CD678",
			  "color": "red",
			  "picture": "http://littlebabybum.com/wp-content/uploads/2015/01/wheels-on-the-bus-red.png"
			}
		]//get paar sekunden um die get function aufzurufen.
		expect(testBuslist).toBe(actualBuslist);
		
	});
		
});