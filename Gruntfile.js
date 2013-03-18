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
        testacular: {
            unit: {
                options: {
                    configFile: 'testacular.conf.js',
                    autoWatch: false,
                    singleRun: true,
                    keepalive: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-testacular');
    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-css');

    grunt.registerTask('default', [ 'jslint', 'testacular:unit', 'uglify', 'cssmin', 'copy' ]);
};
