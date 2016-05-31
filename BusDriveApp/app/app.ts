import {App, Platform, MenuController, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {ViewChild} from '@angular/core';
import {HomePage} from './pages/home/home';
import {SettingPage} from './setting/setting';


@App({
  templateUrl: 'build/app.html',
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = HomePage;
  pages: Array<{ title: string, component: any }>;

  constructor(private platform: Platform, private menu: MenuController) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'HomePage', component: HomePage },
      { title: 'Settings', component: SettingPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}