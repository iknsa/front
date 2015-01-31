'use strict';

module.exports = function(grunt) {
    // autoload tasks
    require('load-grunt-tasks')(grunt);
    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
          '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
          '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
          ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

        clean: {
            prod: ['dist/*'],
            prodCss: ['dist/css*'],
            prodJs: ['dist/js*'],
            dev: ['vendor/ks/dist/*'],
            css: ['vendor/ks/dist/css*'],
            concat: ['vendor/ks/concat/*'],
            js: ['vendor/ks/dist/js/*']
        },



        compass: {
            dev: {
                options: {
                  sassDir: 'vendor/ks/scss',
                  cssDir: 'vendor/ks/css',
                  fontsDir: 'vendor/fonts',
                  environment: 'development',
                  require: 'susy'
                }
            }
        },

        watch: {
            dev: {
                files: ['vendor/ks/scss/**/*.scss'],
                tasks: ['devWatch'],
            }
        },

        concat_css: {
            options: {
                // assetBaseUrl: 'static/assets',
                // baseDir: 'src/(styles|assets)'
            },
            dev: {
                src: ['vendor/ks/css/*.css'],
                dest: 'vendor/ks/concat/concat.css'
            }
        },

        csslint: {
            dev: {
                options: {
                    import: 2
                },
                src: ['<%= concat_css.dev.dest %>']
            }
        },

        cssmin: {
            dev: {
                files: {
                  'vendor/ks/dist/ks.min.css': ['vendor/ks/concat/**/*.css']
                }
            }
        },



        jshint: {
            gruntfile: {
                src: 'Gruntfile.js'
            },
            dev: {
                src: ['vendor/ks/js/**/*.js']
            }
        },


        concat: {
            options: {
                banner: '<%= banner %>',
                separator: ';',
                stripBanners: true
            },
            dev: {
                    src: ['vendor/ks/js/*'],
                    dest: 'vendor/ks/concat/dev.js',
            }
        },

        uglify: {
            options: {
              banner: '<%= banner %>'
            },
            devJquery: {
                src: ['vendor/contrib/jquery-1.11.2/index.js'],
                dest: 'vendor/ks/dist/ugly/js/jquery/jqery.js'
            },
            devJs: {
                src: ['vendor/ks/dist/js/*.js'],
                dest: 'vendor/ks/dist/ugly/js/dev.js'
            }
        },


    });

    // Default task.
    grunt.registerTask('default', ['jshint']);

    // watch for scss files while in dev
    grunt.registerTask('devWatch', [
        'clean:prodCss',
        'compass:dev', 'concat:dev'
    ]);

    // Dev task
    grunt.registerTask('dev', [
        'clean:dev',
        'compass:dev', 'concat:dev', 'concat_css:dev', 'csslint:dev', 'cssmin:dev',
        'jshint:dev', 'uglify:devJquery', 'uglify:devJs'
    ]);
};
