import {StopsPage} from '../../app/pages/stops/stops.ts';
/**
  Created by Erik
  StopsPage tests
  Problem with the NavParams from the server.
*/

describe("tests for the StopsPage",function(){

	let testStopsPage = new StopsPage();
	
	/** This test is testing if the Stops are correct*/
	it("testing the creation of the list",function(){

		expect(testStopsPage.counter).toBe(1);

	});
});