module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // grunt watch config
    watch: {
      scripts: {
        files: [
          'app/scripts/**/*.js'
        ],
        tasks: ['uglify']
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
          'dist/**/*.html',
          'dist/**/*.css',
          'dist/**/*.js',
        ],
        options: {
          livereload: true
        }
      },

      resources: {
        files: [ 'app/resources/'],
        tasks: [ 'copy:resources' ]
      }
    },

    clean: [ 'dist' ],

    copy: {
      resources: {
        files: [
          {
            expand: true,
            src: ['resources/**/*'],
            cwd: 'app/',
            dest: 'dist/'
          }
        ]
      },

      lib: {
        files: [
          {
            expand: true,
            src: ['lib/**/*'],
            cwd: 'app/',
            dest: 'dist/'
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
          base: "dist/",
          livereload: true
        }
      }
    },

    compass: {
      dist: {
        options: {
          importPath: [
            'app/lib/bootstrap/',
            'app/lib/font-awesome/scss/'
          ],
          fontsDir: 'app/resources/fonts',
          httpFontsDir: 'resources/fonts',
          sassDir: 'app/style/',
          cssDir: 'dist/style/css'
        }
      }
    },

    typescript: {
      main: {
        src: ['app/scripts/main.ts'],
        dest: 'dist/scripts/main.js',
        options: {
          module: 'amd', //or commonjs
          dist: 'es5', //or es3
          basePath: 'app/scripts/',
          sourceMap: true,
          declaration: true
        }
      },

      admin: {
        src: ['app/scripts/admin/main.ts'],
        dest: 'dist/scripts/admin/main.js',
        options: {
          module: 'amd', //or commonjs
          dist: 'es5', //or es3
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
            dest: "dist/",
            cwd: "app/",
            ext: '.html'
          }
        ]
      }
    },

    uglify: {
      dist: {
        files: {
          'dist/scripts/main.min.js': ['app/scripts/**/*.js']
        }
      }
    },

    ngconstant: {
      options: {
        name: 'nwb.config',
        dest: 'dist/scripts/config.js',
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
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-ng-constant');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-typescript');

  // Default task(s).
  grunt.registerTask('default', [
    'compass:dist',
    'uglify',
    'jade',
    'copy',
    'connect'
  ]);

  // nop task
  grunt.registerTask('nop', function() {});

};
