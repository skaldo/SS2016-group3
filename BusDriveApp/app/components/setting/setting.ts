import {Page, Storage, LocalStorage} from 'ionic-angular';
import {language, de, en} from "../languages/languages";

/*
 Created by ttmher
 */

@Page({
  templateUrl: 'build/components//setting/setting.html'
})

export class SettingPage {
  public buttontext;
  public serverURL;

  public settings; //: Storage;

  constructor() {
    this.buttontext = language.name;
    this.settings = window.localStorage; // new Storage(LocalStorage) 
    this.serverURL = this.getServerURL();
  }

  /**
   * sets the GUI input as server url
   * @param URL url of the server
   */
  setServerURL(URL) {
    this.settings.setItem("serverURL", URL);
    console.log("set new server url: "+this.serverURL);
  }

  /**
   * changes the gui-language 
   */
  changeLanguage(lang) {
    if(lang = "de"){
      language = de;
    }
    else {
      language = en;
    }
    this.buttontext = language.name;
    console.log("ChangeLanguage:"+lang);
  }

  /**
   * @retruns url of the server
   */
  getServerURL() {
    return this.settings.getItem("serverURL")
    //.then((value) => {      let serverURL = JSON.stringify(value);      console.log(serverURL);      return serverURL;    })
  }
}
