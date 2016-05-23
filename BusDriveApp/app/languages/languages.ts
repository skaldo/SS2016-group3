/**
 * Created by Sascha on 10.05.2016.
 */
export class Language {
    //id: number;
    //name:string;
    //passengers:string;

    constructor(public id:number, public name:string, public driveTitle:string, public passengers:string, public numberplate:string,
    public chooseBus:string, public lineTitle:string, public lineName:string, public mapTitle:string, public stopTitle:string,
    public alertTitle:string, public alertCancel:string){
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
    }
    
}


export var en = new Language(0,"EN","Drive","Seats taken:","Numberplate:",
    "Choose bus","Choose line","Line","Map","Schedule","End tour?","Cancel");
export var de = new Language(1,"DE","Fahren","Belegte Plätze:","Nummernschild",
    "Wähle Bus aus","Wähle Linie aus","Linie","Karte","Fahrplan","Fahrt beenden?","Abbrechen");

export var language;

language = en;
