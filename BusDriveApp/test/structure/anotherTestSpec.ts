import {BusListPage} from '../../app/pages/buslist/buslist';

describe('Dieser Test',function(){
  it('hat Zugriff auf andere files',function(){
    expect(BusListPage.getBusList()).toBe(BusListPage.getBusList());
  });
});