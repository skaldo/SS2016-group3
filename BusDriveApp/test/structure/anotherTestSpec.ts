import {BusListPage} from '../../app/pages/buslist/buslist';

let busListPage = BusListPage;

describe('Dieser Test',function(){
  it('hat Zugriff auf andere files',function(){
    expect(typeof busListPage).toBe(typeof BusListPage);
  });
});