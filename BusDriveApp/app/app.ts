import {App, Platform, MenuController, Nav, Events} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {ViewChild} from '@angular/core';
import {HomePage} from './pages/home/home';
import {Lists} from './components/Services/lists';
import {SettingPage} from './components/setting/setting';
import {AboutPage} from './components/about/about';
import {language} from "./components/languages/languages";

@App({
  templateUrl: 'build/app.html',
  providers: [Lists, SettingPage],
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  pages: Array<{ title: string, component: any, icon: string }>;

  //---------Language Support-----
  public settingTrans;
  public about;
  constructor(private platform: Platform, private menu: MenuController, public events: Events) {
    this.initializeApp();
    this.setPages();
    this.events.subscribe("ChangeLanguage", () => {
      this.setPages();
    });
  }

  /**
   * initializes the app
   */
  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.styleDefault();
    });
    let settings = window.localStorage;
    if (!(settings["serverURL"])) {
      settings.setItem("serverURL", "http://localhost:3000");
      settings.setItem("serverURLList", "http://localhost:3000")
    }
  }
  
  /**
   * sets the pages of menu
   */
  setPages() {
    this.settingTrans = language.settingTrans;
    this.about = language.about;
    this.pages = [
      { title: 'Tour', component: HomePage, icon: 'bus' },
      { title: this.settingTrans, component: SettingPage, icon: 'settings' },
      { title: this.about, component: AboutPage, icon: 'alert' }
    ];

  }

  /**
   * closes the menu when clicking a link from the menu and navigates to the new page if it is not the current page
   */
  openPage(page) {
    this.menu.close();
    this.nav.setRoot(page.component);
  }

  exit() {
    this.platform.exitApp()
  }
}