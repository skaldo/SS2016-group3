import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {SettingPage} from '../../components/setting/setting';

@Injectable()
export class Lines {
    private lines = [];

    private serverURL;

    constructor(private http: Http, private setting: SettingPage) {
        this.serverURL = setting.getServerURL();
    }

    /**
     * requests lines from server
     */
    requestLines() {
        this.http.get(this.serverURL + "/lines").map(res => res.json()).subscribe(
            data => {
                this.lines = data["lines"];
            },
            err => console.error('requestLines failed'),
            () => console.log('requestLines completed')
        );
    }

    /**
     * @returns JSON of lines
     */
    getLines() {
        return this.lines;
    }

    /**
     * @returns id and name of the lines as a list of tuples
     */
    getLinesInfos() {
        let linesInfos = [];
        for (let i = 0; i < this.lines.length; i++) {
            linesInfos.push([this.lines[i].id, this.lines[i].name]);
        }
        return linesInfos;
    }
}