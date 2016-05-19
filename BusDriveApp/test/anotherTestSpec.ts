import {getBusList()} from "../app/pages/buslist/buslist";

describe('Dieser Test',function(){
  it('hat Zugriff auf andere files',function(){
    expect(getBusList()).toBe(getBusList());
  });
});