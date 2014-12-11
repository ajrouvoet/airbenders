module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // grunt watch config
    watch: {
      scripts: {
        files: [
          'app/scripts/**/*.ts',
          '!**/[mM]ain.d.ts', // generated
          '!app/lib/**/*'
        ],
        tasks: ['typescript']
      },

      styles: {
        files: [
          'app/style/**/*.sass',
          'app/style/**/*.scss',
          '!app/lib/**/*'
        ],
        tasks: ['compass:dist']
      },

      jade: {
        files: [
          'app/*.jade',
          'app/views/**/*.jade',
          '!app/lib/**/*'
        ],
        tasks: ['jade']
      },

      reload: {
        files: [
          'app/views/**/*.html',
          'app/WEB-INF/**/*.jade',
          'app/style/css/**/*.css',
          'app/scripts/**/*.js'
        ],
        options: {
          livereload: true
        }
      },

      resources: {
        files: [ 'app/resources/' ],
        tasks: [ 'copy:resources' ]
      }
    },

    clean: [ 'target' ],

    copy: {
      resources: {
        files: [
          {
            expand: true,
            src: ['resources/**/*'],
            cwd: 'app/',
            dest: 'target/'
          }
        ]
      },

      lib: {
        files: [
          {
            expand: true,
            src: ['lib/**/*'],
            cwd: 'app/',
            dest: 'target/'
          }
        ]
      }
    },

    connect: {
      server: {
        options: {
          port: 8080,
          hostname: '*',
          keepalive: true,
          base: "target/"
        }
      }
    },

    compass: {
      dist: {
        options: {
          importPath: [
            'app/style/bootstrap/',
            'app/lib/font-awesome/scss/'
          ],
          fontsDir: 'app/resources/fonts',
          httpFontsDir: 'resources/fonts',
          sassDir: 'app/style/',
          cssDir: 'target/style/css'
        }
      }
    },

    typescript: {
      main: {
        src: ['app/scripts/main.ts'],
        dest: 'target/scripts/main.js',
        options: {
          module: 'amd', //or commonjs
          target: 'es5', //or es3
          basePath: 'app/scripts/',
          sourceMap: true,
          declaration: true
        }
      },

      admin: {
        src: ['app/scripts/admin/main.ts'],
        dest: 'target/scripts/admin/main.js',
        options: {
          module: 'amd', //or commonjs
          target: 'es5', //or es3
          basePath: 'app/scripts/',
          sourceMap: true,
          declaration: true
        }
      }
    },

    jade: {
      compile: {
        options: {
          data: {
            debug: false
          }
        },
        files: [
          {
            expand: true,
            src: "**/*.jade",
            dest: "target/",
            cwd: "app/",
            ext: '.html'
          }
        ]
      }
    },

    ngconstant: {
      options: {
        name: 'nwb.config',
        dest: 'target/scripts/config.js',
        constants: {
          apiUrl: "http://localhost\\:8000/api/",
          debug: false
        }
      },

      dev: {
        debug: true
      }
    },

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-ng-constant');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-typescript');

  // Default task(s).
  grunt.registerTask('default', [
    'ngconstant:dev',
    'compass:dist',
    'typescript',
    'jade',
    'copy'
  ]);

  // nop task
  grunt.registerTask('nop', function() {});

};
