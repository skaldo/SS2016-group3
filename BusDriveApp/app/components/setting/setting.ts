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
  public lang;

  public settings; //: Storage;

  constructor() {
    this.buttontext = language.name;
    this.settings = window.localStorage; // new Storage(LocalStorage) 
    this.serverURL = this.getServerURL();
    this.lang = this.getLanguage();
  }

  /**
   * sets the GUI input as server url
   * @param URL url of the server
   */
  setServerURL(URL) {
    this.settings.setItem("serverURL", URL);
    console.log("set new server url: " + this.serverURL);
  }

  /**
   * @retruns url of the server
   */
  getServerURL() {
    return this.settings.getItem("serverURL")
    //.then((value) => {      let serverURL = JSON.stringify(value);      console.log(serverURL);      return serverURL;    })
  }

  /**
   * sets the GUI input as GUI language
   * @param URL url of the server
   */
  setLanguage(lang) {
    this.settings.setItem("Language", lang);
    console.log("set new language: " + this.lang);
  }
  
  /**
   * @retruns language of GUI
   */
  getLanguage() {
    return this.settings.getItem("Language")
  }

  /**
   * changes the gui-language 
   */
  changeLanguage(lang) {
    if (lang === "en") {
      language = en;
      this.setLanguage(lang);
    }
    else {
      language = de;
      this.setLanguage(lang);
    }
    this.buttontext = language.name;
    console.log("ChangeLanguage: " + lang);
  }
}
