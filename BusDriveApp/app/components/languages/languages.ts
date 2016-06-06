/**
 * Created by Sascha on 10.05.2016.
 */
export class Language {
    //id: number;
    //name:string;
    //passengers:string;

    constructor(public id: number, public name: string, public driveTitle: string, public passengers: string, public numberplate: string,
        public chooseBus: string, public lineTitle: string, public lineName: string, public mapTitle: string, public stopTitle: string,
        public alertTitle: string, public alertCancel: string, public findUs: string, public opinion: string, public disclaimer: string,
        public imprint: string, public privacyPolicy: string, public licence: string, public versionInfo: string, public beginTour: string,
        public langTrans:string,public serveradressTrans,public newServerTrans:string, public settingTrans:string, public about:string) {

        this.id = id;
        this.name = name;
        this.driveTitle = driveTitle;
        this.passengers = passengers;
        this.numberplate = numberplate;
        this.chooseBus = chooseBus;
        this.lineTitle = lineTitle;
        this.mapTitle = mapTitle;
        this.stopTitle = stopTitle;
        this.alertTitle = alertTitle;
        this.alertCancel = alertCancel;
        this.lineName = lineName;
        //------- about-page
        this.findUs = findUs;
        this.opinion = opinion;
        this.disclaimer = disclaimer;
        this.imprint = imprint;
        this.privacyPolicy = privacyPolicy;
        this.licence = licence;
        this.versionInfo = versionInfo;
        //----------home screen------
        this.beginTour = beginTour;
        //------Settingspage-------
        this.langTrans=langTrans;
        this.serveradressTrans=serveradressTrans;
        this.newServerTrans=newServerTrans;
        //------Sidemunu-----------
        this.settingTrans=settingTrans;
        this.about=about;
        
    }

}


export var en = new Language(0, "EN", "Drive", "Seats taken:", "Numberplate:",
    "Choose bus", "Choose line", "Line", "Map", "Schedule", "End tour?", "Cancel", "Find us on", "Your opinion",
    "Disclaimer", "Imprint", "Privacy Policy", "Licence", "Version Info", "Start Tour","Language","Serveraddress","New serveraddress","Settings","About");
export var de = new Language(1, "DE", "Fahren", "Belegte Plätze:", "Nummernschild",
    "Wähle Bus aus", "Wähle Linie aus", "Linie", "Karte", "Fahrplan", "Fahrt beenden?", "Abbrechen", " Sie finden uns auf", "Ihre Meinung",
    "Rechtliches", "Impressum", "Datenschutzerklärung", "Lizenz", "Versionsinfo", "Tour starten","Sprache","Serveradresse","Neue Serveradresse","Einstellungen","Über uns");

export var language;
let settings = window.localStorage;
let lang = settings.getItem("Language");
if ("en" === lang) {
    language = en;
}
else {
    language = de
    settings.setItem("Language","de");
}

