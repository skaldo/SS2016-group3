import {LineListPage} from '../../app/pages/linelist/linelist.ts';
import {BusListPage} from '../../app/pages/buslist/buslist.ts';
import {Page, NavController, NavParams} from 'ionic-angular';
/**
  Created by Erik
  LineListPage tests
*/

describe("tests for the LineListPage",function(){

	var nav;
	var navParams;
	var lists;
	
	var testLineListPage = new LineListPage(nav, navParams,lists); // Probleme mit dem Contructor
    var testBuslistPage = new BusListPage(nav, navParams,lists);
	var testLinelist = testLineListPage.getLinelist();

	it("testing the getLinelist() function",function(){
		
		var actualLinelist = [
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
	
	/*it('testing the busnavigate function',function(){
		var bus={
			  "id": 1,
			  "numberPlate": "KL-AB345",
			  "color": "green",
			  "picture": "http://www.tm4.com/wp-content/uploads/2014/08/Foton-bus-12-m-e1407525133477.png"
			};
		testBuslistPage.navigate(bus);
		
		expect(testLineListPage.getselectedbus).toBe(bus);
	});
   */
});