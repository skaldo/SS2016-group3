import {Page, Platform, NavController} from 'ionic-angular';
import {AppAvailability} from 'ionic-native';
import {language} from "../../components/languages/languages";
import {LicensePage} from "../../components/about/license/license";

/*
  Created by ttmher
*/

@Page({
    templateUrl: 'build/components/about/about.html',
})

export class AboutPage {
    private platform;
    private nav;
//----------Language-------
    private findUs;
    private opinion;
    private disclaimer;
    private imprint;
    private privacyPolicy;
    private licence;
    private versionInfo;

    constructor(platform: Platform, nav: NavController) {
        this.platform = platform;
        this.nav = nav;
        this.findUs=language.findUs;
        this.opinion=language.opinion;
        this.disclaimer=language.disclaimer;
        this.imprint=language.imprint;
        this.privacyPolicy=language.privacyPolicy;
        this.licence=language.licence;
        this.versionInfo=language.versionInfo;

    }
    /**
     * opens a url in the system app if installed or in the browser
     * @param url url of the website
     */
    openURL(url) {
        this.platform.ready().then(() => {
            open(url, "_system", "location=true");
        });
    }

    openTwitter(url) {
        let app;
        if (this.platform === 'iOS') {
            app = 'twitter://';
        }
        else if (this.platform === 'Android') {
            app = 'com.twitter.android';
        }

        AppAvailability.check(app)
            .then(
            function () {  // Success callback
                window.open(url, '_system', 'location=no');
                console.log('Twitter is available');
            },
            function () {  // Error callback
                window.open('https://' + url, '_system', 'location=no');
                console.log('Twitter is not available');
            }
            );
    }

    openFacebook(url) {
        let app;
        if (this.platform === 'iOS') {
            app = 'fb://';
        }
        else if (this.platform === 'Android') {
            app = 'com.facebook.katana';
        }

        AppAvailability.check(app)
            .then(
            function () {  // Success callback
                window.open('fb://facewebmodal/f?href=' + url, '_system', 'location=no');
                console.log('Facebook is available');
            },
            function () {  // Error callback
                window.open('https://www.facebook.com/' + url, '_system', 'location=no');
                console.log('Facebook is not available');
            }
            );
    }
    
    openYouTube(url) {
        let app;
        if (this.platform === 'iOS') {
            app = 'fb://';
        }
        else if (this.platform === 'Android') {
            app = 'com.google.android.youtube';
        }

        AppAvailability.check(app)
            .then(
            function () {  // Success callback
                window.open(url, '_system', 'location=no');
                console.log('YouTube is available');
            },
            function () {  // Error callback
                window.open('https://www.youtube.com/channel/' + url, '_system', 'location=no');
                console.log('YouTube is not available');
            }
            );
    }

    /**
     * opens the mail app with new email to "email"
     * @param email email adress for the message
     */
    mailto(email) {
        window.open(`mailto:${email}`, '_system');
    }

    /**
     * opens the LicensePage
     */
    openLicense() {
        console.log("-> LicensePage");
        this.nav.push(LicensePage, {
        });
    }

}