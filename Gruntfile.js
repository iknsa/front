'use strict';

module.exports = function(grunt) {
    // autoload tasks
    require('load-grunt-tasks')(grunt);

    // Project's paths
    var pathConfig = function(appName) {
        this.app = appName || appConfig.name;

        return {
            app: this.app,
            templates: this.app + '/templates',
            css: this.app + '/css',
            scss: this.app + 'scss',
            fonts: this.app + '/fonts',
            img: this.app + 'img',
            js: this.app + 'js'
        }
    };

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
            prodCss: ['dist/css/*'],
            prodJs: ['dist/js/*'],

            dev: ['vendor/dist/*'],
            devCss: ['vendor/dist/css*'],
            devJs: ['vendor/dist/js/*'],

            concat: ['vendor/concat/*'],

            qunit_dev: ['vendor/qunit/*.js']
        },


        compass: {
            dev: {
                options: {
                  sassDir: 'vendor/ks/lib',
                  cssDir: 'vendor/ks/lib/css',
                  http_fonts_path: "../fonts",
                  fontsDir: 'vendor/iknsa/fonts',
                  environment: 'development',
                  require: 'susy'
                }
            }
        },

        watch: {
            dev_css: {
                files: ['vendor/iknsa/ks/**/*.scss'],
                tasks: ['dev_css'],
            },
            dev_js: {
                files: ['vendor/iknsa/ks/**/*.js'],
                tasks: ['dev_js'],
            }
        },

        concat_css: {
            options: {
                // assetBaseUrl: 'static/assets',
                // baseDir: 'src/(styles|assets)'
            },
            sass_var: {
                src: ['vendor/iknsa/ks/lib/components/_variables.scss', 'vendor/iknsa/ks/lib/**/_variables.scss'],
                dest: 'vendor/iknsa/ks/lib/_all_variables.scss'
            },
            sass_mixins: {
                src: ['vendor/iknsa/ks/lib/**/_mixins.scss'],
                dest: 'vendor/iknsa/ks/lib/_all_mixins.scss'
            },
            dev: {
                src: ['vendor/iknsa/css/*.css'],
                dest: 'vendor/iknsa/concat/concat.css'
            }
        },

        replace: {
            remove_variables_imports: {
                src: ['<%= concat_css.sass_var.dest %>'],             // source files array (supports minimatch) 
                dest: '<%= concat_css.sass_var.dest %>',             // destination directory or file 
                replacements: [{
                  from: '@import "../all_variables";',                   // string replacement 
                  to: ''
                }]
            },
            remove_mixins_imports: {
                src: ['<%= concat_css.sass_mixins.dest %>'],             // source files array (supports minimatch) 
                dest: '<%= concat_css.sass_mixins.dest %>',             // destination directory or file 
                replacements: [{
                  from: "@import '../all_mixins';",                   // string replacement 
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
                src: ['vendor/iknsa/css/imports.css']
            }
        },

        cssmin: {
            dev: {
                files: {
                  'vendor/iknsa/dist/ks.min.css': ['vendor/iknsa/concat/**/*.css']
                }
            }
        },



        jshint: {
            gruntfile: {
                src: 'Gruntfile.js'
            },
            dev: {
                src: ['vendor/iknsa/js/**/*.js', '<%= concat.dev.dest %>']
            }
        },


        concat: {
            options: {
                banner: '<%= banner %>',
                separator: '\n//-------------------\n',
                stripBanners: true
            },
            common: {
                src: ['vendor/iknsa/ks/lib/onload_start.js', 'vendor/iknsa/ks/lib/**/_*.js', '!vendor/iknsa/ks/lib/**/*_test.js',
                      'vendor/iknsa/ks/lib/onload_end.js'],
                dest: 'vendor/iknsa/js/dev.js',
            },
            core: {
                src: ['vendor/iknsa/ks/lib/core/actionRules.js', 'vendor/iknsa/ks/lib/core/core.js'],
                dest: 'vendor/iknsa/js/core.js'
            },
            strategies: {
                src: [
                      'vendor/iknsa/ks/lib/**/strategy-*.js'
                    ],
                dest: 'vendor/iknsa/js/strategies.js',
            },
            dev: {
                src: ["<%= concat.common.dest %>", "<%= concat.core.dest %>", "<%= concat.strategies.dest %>"],
                dest: "<%= concat.common.dest %>"
            },
            qunit: {
                src: ['vendor/iknsa/ks/lib/**/*_test.js'],
                dest: 'vendor/iknsa/qunit/tests.js'
            }
        },

        uglify: {
            options: {
              banner: '<%= banner %>'
            },
            devJquery: {
                src: ['vendor/contrib/jquery-1.11.2/index.js'],
                dest: 'vendor/iknsa/dist/ugly/js/jquery/jqery.js'
            },
            devJs: {
                src: ['vendor/iknsa/dist/js/*.js'],
                dest: 'vendor/iknsa/dist/ugly/js/dev.js'
            }
        },

        copy: {
            test: {
                files: [

                    // makes all src relative to cwd
                    {
                        expand: true,
                        cwd: 'vendor/iknsa/ks/lib/base/',
                        src: ['**'],
                        dest: 'vendor/iknsa/ks/lib/test/',
                        rename: function(dest, src) {
                            return dest + src.replace(/base/g, "test");
                        }
                    },
                    {
                        expand: true,
                        src: ['templates/base.html'],
                        dest: '',
                        rename: function(dest, src) {
                            return dest + src.replace(/base/g, "test");
                        }
                    }
                ],
            },

            qunit: {
                files: [
                    {
                        src: '<%= concat.dev.dest %>',
                        dest: 'vendor/iknsa/qunit/dev.js'
                    }
                ]
            },

            export_core_js: {
                files: [
                    {
                        expand: true,
                        cwd: 'vendor/iknsa/ks/lib/core/',
                        src: ['**'],
                        dest: 'exports/core-js/'
                    }
                ]
            },

            export_strategies_js: {
                files: [
                    {
                        expand: true,
                        src: "vendor/iknsa/js/strategies.js",
                        dest: 'exports/core-js/strategies.js'
                    }
                ]
            }
        },
    });

    grunt.registerTask("test", ["test"]);

    // Default task.
    // grunt.registerTask('default', ['jshint']);

    // watch for scss files while in dev
    grunt.registerTask('dev_css', [
        'clean:prodCss',
        'concat_css:sass_var', 'replace:remove_variables_imports', 'concat_css:sass_mixins', 'replace:remove_mixins_imports', 
        'compass:dev',
        // 'csslint:watch'
    ]);

    // watch for js files while in dev
    grunt.registerTask('qunit', [
        'clean:qunit_dev',
        'concat:qunit',
        'copy:qunit'
    ]);

    // watch for js files while in dev
    grunt.registerTask('dev_js', [
        'concat',
        'jshint:dev'
    ]);

    // watch for js files while in dev
    grunt.registerTask('export_core_js', [
        'copy:export_core_js',
        'copy:export_strategies_js',
    ]);

    // Dev task
    grunt.registerTask('dev', [
        'clean:prodCss',
        'concat_css:sass_var', 'replace:remove_variables_imports', 'concat_css:sass_mixins', 'replace:remove_mixins_imports', 
        'compass:dev',
        'concat:dev', 'jshint:dev'
    ]);
};
