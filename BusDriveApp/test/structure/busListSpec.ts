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
		]
		expect(testBuslist).toBe(actualBuslist);
	});
		
});