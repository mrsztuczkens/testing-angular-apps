module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    karma: {
        unit: {
                // base path that will be used to resolve all patterns (eg. files, exclude)
                basePath: '',

                // frameworks to use
                // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
                frameworks: ['mocha', 'chai', 'sinon'],

                // list of files / patterns to load in the browser
                files: [
                    { pattern: 'node_modules/angular/angular.js'},
                    { pattern: 'node_modules/angular-mocks/angular-mocks.js'},
                    { pattern: 'app/src/app.js' },
                    { pattern: 'app/src/controllers/todoListController.js' },
                    { pattern: 'test/spec/**/*.js'}
                ],

                // list of files to exclude
                exclude: [],

                // preprocess matching files before serving them to the browser
                // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
                preprocessors: { },

                // test results reporter to use
                // possible values: 'dots', 'progress'
                // available reporters: https://npmjs.org/browse/keyword/karma-reporter
                reporters: ['dots'],

                // web server port
                port: 9876,

                // enable / disable colors in the output (reporters and logs)
                colors: true,

                //// level of logging
                logLevel: "INFO",

                // enable / disable watching file and executing tests whenever any file changes
                autoWatch: false,
                // start these browsers
                // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
                browsers: ['PhantomJS'],
                browserNoActivityTimeout: 1000,
                singleRun: true
            }
    }
  });
  
  
  grunt.loadNpmTasks('grunt-karma');

  // Default task(s).
  grunt.registerTask('default', []);
  grunt.registerTask('test', [ 'karma' ]);

};