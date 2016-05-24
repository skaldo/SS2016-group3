﻿// Karma configuration
// Generated on Thu May 12 2016 11:12:41 GMT+0200 (Mitteleuropäische Sommerzeit)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'browserify'],


    // list of files / patterns to load in the browser
    files: [
      'node_modules/angular2/bundles/angular2-polyfills.js', // 'Uncaught reflect-metadata shim is required when using class decorators'
      'node_modules/traceur/bin/traceur-runtime.js',         // TypeError: undefined is not a constructor (evaluating 'new exports.Map()')
      'test/**/*Spec.ts',
	  'app/*.ts',
	  'typings/browser.d.ts',
	  'app/**/*.ts'
    ],


    // list of files to exclude
    exclude: [
	  'node_modules/angular2/**/*_spec.js',
	  'node_modules/angular2/src/facade/collection.ts',
      'node_modules/ionic-angular/**/*spec*'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
		'**/*.ts': [ 'browserify' ]
    },
	
	//browserify configuration
	browserify: {
		debug: true,
		// transform: [ 'brfs' ] //???
		plugin: [
			[ 'tsify' ]
		]
	},

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
	
  })
}
