import {DrivePage} from '../../app/pages/drive/drive.ts';
/**
  Created by Erik
  DrivePage tests
*/

describe("tests for the DrivePage",function(){

	let testDrivePage = new DrivePage();
	
	/** This test is testing if the increase function works*/
	it("testing the increase function",function(){
		testDrivePage.counter=0;
		testDrivePage.increase();
		expect(testDrivePage.counter).toBe(1);
		testDrivePage.counter=0;
	});
	/**This test should be an error or the number of seats should stay the same */
		it("testing the increase maximum function",function(){
		testDrivePage.counter=10;
		testDrivePage.increase();
		expect(testDrivePage.counter).toBe(10); 
		testDrivePage.counter=0;
	});
	/** This test is testing if the decrease function is working properly*/
	it('testing the decrease function',function(){
		testDrivePage.counter=5;
		testDrivePage.decrease();
		expect(testDrivePage.counter).toBe(4);
		testDrivePage.counter=0;
	});
	
	/** This test is checking that the # of passagners doesnt go below 0*/
	it('testing the decrease function',function(){
		testDrivePage.counter=0;
		testDrivePage.decrease();
		expect(testDrivePage.counter).toBe(0);
	});

});