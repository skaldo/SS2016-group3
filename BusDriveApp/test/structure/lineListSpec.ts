import {LineListPage} from '../../app/pages/linelist/linelist';
/**
  Created by Erik
  LineListPage tests
*/

describe("tests for the LineListPage",function(){

	let testLineListPage = new LineListPage();
    let testBuslistPage = new BusListPage();
	
	it("testing the getLinelist() function",function(){
		
		let testLinelist = testLinelistPage.getLinelist();
		let actualLinelist = [
			{
			  "id": 1,
			  "name": "Dorftour",
			  "routeRef": 1,
			  "busses": [
				1
			  ]
			},
			{
			  "id": 2,
			  "name": "Kaiserslautern und zurück",
			  "routeRef": 2,
			  "busses": [
				2
			  ]
			},
			{
			  "id": 3,
			  "name": "Uni",
			  "routeRef": 3,
			  "busses": [
				3
			  ]
			},
			{
			  "id": 4,
			  "name": "Uni ( ungenau )",
			  "routeRef": 4,
			  "busses": [
				4
			  ]
			}
		]
		expect(testLinelist).toBe(actualLinelist);
	});
	
	it('testing the busnavigate function',function(){
		bus={
			  "id": 1,
			  "numberPlate": "KL-AB345",
			  "color": "green",
			  "picture": "http://www.tm4.com/wp-content/uploads/2014/08/Foton-bus-12-m-e1407525133477.png"
			};
		testBuslistPage.navigate(bus);
		
		expect(testLineListPage.selectedbus).toBe(bus);
	});

});