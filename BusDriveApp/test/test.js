var path = require('path'),
  karma = require('karma').server,
 // tsLint = require('gulp-tslint'); keine ahnung was dat is.

module.exports = {
  karma: function (done) {
    karma.start({
      configFile: path.resolve('../karma.config.js'),
      singleRun: true
    }, function (exitCode) {
      done(exitCode);
    });
  },
  karmaDebug: function (done) {
    karma.start({
      configFile: path.resolve('../karma.config.js'),
      singleRun: false,
      browsers: ['PhantomJS']
    }, function (exitCode) {
      done(exitCode);
    })
  }
}