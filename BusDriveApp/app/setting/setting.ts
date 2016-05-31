import {Page, Storage, LocalStorage} from 'ionic-angular';
import {language, de, en} from "../languages/languages";

/*
 Created by ttmher
 */

@Page({
  templateUrl: 'build/setting/setting.html'
})

export class SettingPage {
  public buttontext;
  public serverURL;

  public settings; //: Storage;

  constructor() {
    this.serverURL = "http://localhost:3000";
    this.buttontext = language.name;

    this.settings = window.localStorage; // new Storage(LocalStorage) 
  }

  /**
   * sets the GUI input as server url
   * @param URL url of the server
   */
  setServerURL(URL) {
    this.settings.setItem('serverURL', URL);
  }

  /**
   * changes the gui-language 
   */
  changeLanguage() {
    if (language === en) language = de; else language = en;
    this.buttontext = language.name;
    console.log("-> ChangeLanguage");
  }

  /**
   * @retruns url of the server
   */
  getServerURL() {
    return this.settings.getItem("serverURL")
    //.then((value) => {      let serverURL = JSON.stringify(value);      console.log(serverURL);      return serverURL;    })
  }
}
