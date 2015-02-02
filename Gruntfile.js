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
                files: ['vendor/ks/scss/**/*.scss', 'vendor/ks/scss/**/*js'],
                tasks: ['devWatch'],
            }
        },

        concat_css: {
            options: {
                // assetBaseUrl: 'static/assets',
                // baseDir: 'src/(styles|assets)'
            },
            sass_var: {
                src: ['vendor/ks/scss/lib/components/_variables.scss', 'vendor/ks/scss/lib/**/_variables.scss'],
                dest: 'vendor/ks/scss/lib/_all_variables.scss'
            },
            dev: {
                src: ['vendor/ks/css/*.css'],
                dest: 'vendor/ks/concat/concat.css'
            }
        },

        replace: {
            remove_scss_useless_imports: {
                src: ['<%= concat_css.sass_var.dest %>'],             // source files array (supports minimatch) 
                dest: '<%= concat_css.sass_var.dest %>',             // destination directory or file 
                replacements: [{
                  from: '@import "../all_variables";',                   // string replacement 
                  to: ''
            }]
          }
        },

        csslint: {
            dev: {
                options: {
                    import: 2
                },
                src: ['<%= concat_css.dev.dest %>']
            },
            watch: {
                options: {
                    import: 2
                },
                src: ['vendor/ks/css/imports.css']
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
                src: ['vendor/ks/js/**/*.js', '<%= concat.dev.dest %>']
            }
        },


        concat: {
            options: {
                banner: '<%= banner %>',
                separator: '\n',
                stripBanners: true
            },
            dev: {
                    src: ['vendor/ks/scss/lib/onload_start.js', 'vendor/ks/**/_*.js', 'vendor/ks/scss/lib/onload_end.js'],
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
        'concat_css:sass_var', 'replace:remove_scss_useless_imports', 'compass:dev', 'concat:dev',
        'csslint:watch'
    ]);

    // Dev task
    grunt.registerTask('dev', [
        'clean:dev',
        'concat_css:sass_var', 'compass:dev', 'concat:dev', 'concat_css:dev', 'csslint:dev', 'cssmin:dev',
        'jshint:dev', 'uglify:devJquery', 'uglify:devJs'
    ]);
};
