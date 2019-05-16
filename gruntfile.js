'use strict';
module.exports = function(grunt) {

  var appFiles = [
    'client/app.js',
    'client/app.config.js',
    'client/services/*.js',
    'client/directives/*.js',
    'client/filters/*.js',
    'client/controllers/*.js',
    'client/constants/*.js'
  ];
  
  var taskConfig = {
    replace: {
      spanish: {
        src: 'meanivan-cli/files-templates/constant.js',
        dest: 'client/constants/dictionary.js',
        replacements: [{
          from: /my-name-here/gm,
          to: 'DICTIONARY'
        },{
          from: /{[\s\S]*}/gm,
          to: grunt.file.read('client/i18n/es-ES.json')
        }]
      },
      english: {
        src: 'meanivan-cli/files-templates/constant.js',
        dest: 'client/constants/dictionary.js',
        replacements: [{
          from: /my-name-here/gm,
          to: 'DICTIONARY'
        },{
          from: /{[\s\S]*}/gm,
          to: grunt.file.read('client/i18n/en-US.json')
        }]
      },
      portuguese: {
        src: 'meanivan-cli/files-templates/constant.js',
        dest: 'client/constants/dictionary.js',
        replacements: [{
          from: /my-name-here/gm,
          to: 'DICTIONARY'
        },{
          from: /{[\s\S]*}/gm,
          to: grunt.file.read('client/i18n/pt-BR.json')
        }]
      }
    },
    uglify: {
      options : {
        sourceMap: true
      },
      appEnglish: {
        files: {
          'public/js/app-EN.min.js' : appFiles
        }
      },
      appPortuguese: {
        files: {
          'public/js/app-PT.min.js' : appFiles
        }
      },
      appSpanish: {
        files: {
          'public/js/app-ES.min.js' : appFiles
        }
      },
      vendor: {
        files: {
          'public/js/vendor.min.js' : [
            'node_modules/angular/angular.js',
            'node_modules/angular-sanitize/angular-sanitize.js',
            'node_modules/angular-messages/angular-messages.js',
            'node_modules/angular-translate/dist/angular-translate.js',
            'node_modules/angular-ui-router/release/angular-ui-router.js',
            'node_modules/webfontloader/webfontloader.js',
            'client/vendor/**/*.js'
          ]
        }
      }
    },
    watch: {
      options: {
        interrupt: true,
      },
      vendor: {
        files: 'client/vendor/**',
        tasks: ['build-vendor']
      },
      jade: {
        files: 'client/views/**/*.jade',
        tasks: []
      },
      scripts: {
        files: 'client/**/*.js',
        tasks: []
      }
    },
    jshint: {
      options:{
        jshintrc: '.jshintrc',
        verbose: false,
        fix: true
      },
      all: [
        'server.js',
        'gruntfile.js',
        'client/services/*.js',
        'client/controllers/*.js',
        'client/directives/*.js',
        'client/filters/*.js',
        'server/**/*.js'
      ]
    },
    jscs: {
      src: [
        'server.js',
        'gruntfile.js',
        'client/services/*.js',
        'client/controllers/*.js',
        'client/directives/*.js',
        'client/filters/*.js',
        'server/**/*.js'
      ],
      options: {
        config: '.jscsrc',
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },
    mocha_istanbul: {
      coverage: {
        src: 'test',
        options: {
          print: 'detail',
          coverage: true,
          coverageFolder: 'coverage'
        },
        check: {
          lines: 40,
          statements: 40
        }
      }
    },
    stylus: {
      compile: {
        files: {
          'public/css/stylus.min.css': ['client/styles/main.styl'],
          // 'public/css/vendor.min.css' : [],
          'public/css/helperClasses.css': ['client/styles/compiler-helper/base.styl']
        }
      }
    }
  };

  grunt.initConfig( taskConfig );
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-mocha-istanbul');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.registerTask('lint', [
    'jshint',
    'jscs'
  ]);
  grunt.registerTask('test', [
    'mochaTest'
  ]);
  grunt.registerTask('coverage', [
    'mocha_istanbul'
  ]);
  grunt.registerTask('translate', [
    'replace:english',
    'uglify:appEnglish',
    'replace:portuguese',
    'uglify:appPortuguese',
    'replace:spanish',
    'uglify:appSpanish'
  ]);
  grunt.registerTask('build', [
    'translate',
    'uglify:vendor',
    'stylus'
    /* @ToDo: hacer "grunt todo" para buscar en los todo del sistema */
  ]);
};