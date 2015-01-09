'use strict';

module.exports = function (grunt) {
  // Show elapsed time at the end
  require('time-grunt')(grunt);
  // Load all grunt tasks
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    nodeunit: {
      files: ['test/**/*_test.js']
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib: {
        src: ['lib/**/*.js']
      },
      test: {
        src: ['test/**/*.js']
      }
    },
    browserify: {
      all: {
        files: {
          'dist/pkcs7.js': 'lib/pkcs7.js'
        },
        options: {
          browserifyOptions: {
            standalone: 'pkcs7'
          }
        }
      },
      pad: {
        files: {
          'dist/pkcs7.pad.js': 'lib/pad.js'
        },
        options: {
          browserifyOptions: {
            standalone: 'pkcs7.pad'
          }
        }
      },
      unpad: {
        files: {
          'dist/pkcs7.unpad.js': 'lib/unpad.js'
        },
        options: {
          browserifyOptions: {
            standalone: 'pkcs7.unpad'
          }
        }
      },
      unpad_global: {
        files: {
          'dist/pkcs7.unpad.global.js': 'lib/unpad.js'
        },
        options: {
          plugin: ['deumdify'],
          browserifyOptions: {
            standalone: 'pkcs7.unpad'
          }
        }
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib: {
        files: '<%= jshint.lib.src %>',
        tasks: ['jshint:lib', 'nodeunit']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'nodeunit']
      }
    }
  });

  // Default task.
  grunt.registerTask('default', ['jshint', 'nodeunit', 'browserify']);
};
