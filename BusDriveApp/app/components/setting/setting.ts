import {Page, Storage, LocalStorage} from 'ionic-angular';
import {language, de, en} from "../languages/languages";

/*
 Created by ttmher
 */

@Page({
  templateUrl: 'build/components//setting/setting.html'
})

export class SettingPage {
  public serverURL;
  public serverURLListStorage;
  public serverURLList = [];
  public lang;

  public settings;
  //language support
  public langTrans;
  public cancelAlert;
  public serverAdressTrans;
  public newServerAdressTrans;
  public settingTrans;

  constructor() {
    this.settings = window.localStorage;
    this.serverURL = this.getServerURL();
    this.lang = this.getLanguage();
    this.serverURLList = this.getServerURLList().split(",");
    this.serverURLListStorage = this.getServerURLList();
    //---- Language Support-----
    this.langTrans=language.langTrans;
    this.cancelAlert=language.alertCancel;
    this.serverAdressTrans=language.serveradressTrans;
    this.newServerAdressTrans=language.newServerTrans;
    this.settingTrans=language.settingTrans;

  }

  /**
   * adds the GUI input to server url list
   * @param URL url of the server
   */
  addToServerURLList(URL) {
    this.serverURLListStorage = this.serverURLListStorage + "," + URL;
    this.settings.setItem("serverURLList", this.serverURLListStorage);
    this.serverURLList = this.getServerURLList().split(",");
  }

  /**
   * @retruns List of URLs
   */
  getServerURLList() {
    return this.settings.getItem("serverURLList");
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
    this.langTrans=language.langTrans;
    this.cancelAlert=language.alertCancel;
    this.serverAdressTrans=language.serveradressTrans;
    this.newServerAdressTrans=language.newServerTrans;
    this.settingTrans=language.settingTrans;
    console.log("ChangeLanguage: " + lang);
  }
}
