
develop: [![Build Status](https://travis-ci.org/GSE-Project/SS2016-group3.svg?branch=develop)](https://travis-ci.org/GSE-Project/SS2016-group3) [![Coverage Status](https://coveralls.io/repos/GSE-Project/SS2016-group3/badge.svg?branch=develop)](https://coveralls.io/r/GSE-Project/SS2016-group3?branch=develop) 

master: [![Build Status](https://travis-ci.org/GSE-Project/SS2016-group3.svg?branch=master)](https://travis-ci.org/GSE-Project/SS2016-group3) [![Coverage Status](https://coveralls.io/repos/GSE-Project/SS2016-group3/badge.svg?branch=master)](https://coveralls.io/r/GSE-Project/SS2016-group3?branch=master)
# Digitale Dörfer - mobile people’s bus system


This project deals with the development of a mobile people’s bus system. The system consists of a mobile app that serves as the people’s bus host system and another mobile app for citizens to use the different people’s busses. It is intended, that the system will be used within the project [Digitale Dörfer](http://www.digitale-doerfer.de)

BusDriveApp
------------------

This repository contains the source code of the BusDriveApp, used by the bus driver.

This app is used to track the bus and send this to the server.

The application is written in [TypeScript](https://github.com/Microsoft/TypeScript) utilizes the beta version of the cross-platform development framework [Ionic](https://github.com/driftyco/ionic/tree/2.0).

Requirements documentation:
- [Tracebility Matrix](https://github.com/GSE-Project/SS2016-group3/blob/master/Doc/tracebility%20matrix.pdf)

Design documentation: 
- [Component diagram](https://github.com/GSE-Project/SS2016-group3/blob/master/Doc/Architecture%20-%20Component%20Diagramm.pdf)

How to build the application
---------------------------------------

1) Install the Node.js, the LTS version is fine.

2) Open a command-line (or shell).

3) Install the Ionic CLI tools:

    `npm install -g ionic@beta (on the Mac OSX use sudo)`

4) Go to the BusDriveApp directory.

5) Install the NPM dependencies:

    `npm install`

6) Start the integrated web server:

    `ionic serve`

	
7) The app will open in a browser.

In order to see some data in the application, you'll need to start a mock server. 
---------------------------------------
Please follow these steps:

1) Go to [Json-Server](https://github.com/typicode/json-server) and follow the instructions.

2) Download [json-data](https://github.com/GSE-Project/SS2016-group3/blob/master/Test-Json/object.json)

3) Open a command line in the directory where your json-data is saved and start he server

    `json-serer -w object.json`

