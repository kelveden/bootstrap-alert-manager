/*globals module*/
module.exports = function (grunt) {
    "use strict";

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            main: {
                files: [
                    {
                        src: 'src/js/<%= pkg.name %>.js',
                        dest: 'build/<%= pkg.name %>-<%= pkg.version %>.js'
                    },
                    {
                        src: 'src/css/<%= pkg.name %>.css',
                        dest: 'build/<%= pkg.name %>-<%= pkg.version %>.css'
                    }
                ]
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                preserveComments: 'some'
            },
            build: {
                src: 'src/js/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>-<%= pkg.version %>.min.js'
            }
        },
        cssmin: {
            build: {
                src: 'src/css/<%= pkg.name %>.css',
                dest: 'build/<%= pkg.name %>-<%= pkg.version %>.min.css'
            }
        },
        jslint: {
            files: [
                'Gruntfile.js',
                'src/js/*.js',
                'test/js/*.js'
            ]
        },
        karma: {
            unit: {
                options: {
                    configFile: 'karma.conf.js',
                    autoWatch: false,
                    singleRun: true,
                    keepalive: true
                }
            }
        },
        bump: {
            options: {
                files: [ 'package.json', 'bower.json' ],
                pushTo: "origin"
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-css');
    grunt.loadNpmTasks('grunt-bump');

    grunt.registerTask('default', [ 'jslint', 'karma:unit', 'uglify', 'cssmin', 'copy' ]);
};
