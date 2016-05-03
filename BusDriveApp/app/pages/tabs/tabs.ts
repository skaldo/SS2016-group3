import {Page} from 'ionic-angular';
import {DrivePage} from '../drive/drive';
import {MapPage} from '../map/map';
import {StopsPage} from '../stops/stops';


@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = DrivePage;
  tab2Root: any = MapPage;
  tab3Root: any = StopsPage;
}
