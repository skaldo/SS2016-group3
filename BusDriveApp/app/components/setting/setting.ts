import {Page, Storage, LocalStorage, Events} from 'ionic-angular';
import {Component} from '@angular/core';
import {Insomnia} from 'ionic-native';
import {language, de, en} from "../languages/languages";

@Component({
  templateUrl: 'build/components//setting/setting.html'
})

export class SettingPage {
  public serverURL;
  public serverURLListStorage;
  public serverURLList = [];
  public lang;
  public insomnia = true;

  public settings;

  //-----Language-----
  public langTrans;
  public cancelAlert;
  public serverAdressTrans;
  public newServerAdressTrans;
  public settingTrans;

  constructor(public events: Events) {
    this.settings = window.localStorage;
    this.serverURL = this.getServerURL();
    this.lang = this.getLanguage();
    this.serverURLList = this.getServerURLList().split(",");
    this.serverURLListStorage = this.getServerURLList();
    this.insomnia = this.getInsomnia();

    //-----Language-----
    this.langTrans = language.langTrans;
    this.cancelAlert = language.alertCancel;
    this.serverAdressTrans = language.serveradressTrans;
    this.newServerAdressTrans = language.newServerTrans;
    this.settingTrans = language.settingTrans;

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
   * @retruns List of URLs from localStorage
   */
  getServerURLList() {
    return this.settings.getItem("serverURLList");
  }

  /**
   * sets the GUI select as server url
   * @param URL url of the server
   */
  setServerURL(URL) {
    this.settings.setItem("serverURL", URL);
    this.events.publish("newServerURL", URL);
    console.log("set new server url: " + this.serverURL);
  }

  /**
   * @retruns url of the server from localStorage
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
   * @retruns language of GUI from localStorage
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
    this.events.publish("ChangeLanguage");
    this.langTrans = language.langTrans;
    this.cancelAlert = language.alertCancel;
    this.serverAdressTrans = language.serveradressTrans;
    this.newServerAdressTrans = language.newServerTrans;
    this.settingTrans = language.settingTrans;
    console.log("ChangeLanguage: " + lang);
  }

  /**
   * @param insomnia boolean
   * sets insomnia
   */
  setInsomnia(insomnia) {
    this.settings.setItem("insomnia", insomnia);
  }

  /**
   * gets insomnia
   */
  getInsomnia() {
    return this.settings.getItem("insomnia");
  }

  /**
   * changes insomnia
   */
  changeInsomnia(insomnia) {

    if (insomnia === true) {
      Insomnia.keepAwake()
        .then(
        () => console.log('prevent the screen from falling asleep'),
        () => console.log('failed to prevent the screen from falling asleep')
        );
    }
    else if (insomnia === false) {
      Insomnia.allowSleepAgain()
        .then(
        () => console.log('allow the screen to fall asleep'),
        () => console.log('failed to allow the screen to fall asleep')
        );
    }
    console.log("prefent from falling asleep " + insomnia);
    this.setInsomnia(insomnia);
  }
}
