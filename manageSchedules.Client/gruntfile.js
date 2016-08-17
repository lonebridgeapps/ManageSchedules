/*
This file in the main entry point for defining grunt tasks and using grunt plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkID=513275&clcid=0x409
*/
module.exports = function (grunt) {

    //grunt.loadNpmTasks('grunt-contrib-uglify');
    //grunt.loadNpmTasks('grunt-contrib-watch');


    grunt.initConfig({
        //uglify: {
        //    my_target: {
        //        files: {'wwwroot/app.js':['app/app.js', 'app/**/*.js'] }
        //    }
        //},

        //watch: {
        //    scripts: {
        //        files: ['app/**/*.js'],
        //        tasks: ['uglify']
        //    }
        //}

        concat: {
            options: {
                sourceMap: true,
            },
            app: {
                src: ['app/**/*.js'],
                dest: 'wwwroot/js/app.js'
            },
            vendor: {
                src: [
                    './wwwroot/lib/angular/angular.js',
                    './wwwroot/lib/angular-ui-router/release/angular-ui-router.js'
                ],
                dest: 'wwwroot/js/vendor.js'
            }
        },

        // Create javascript templates from the html files.
        html2js: {
            main: {
                src: ['app/**/*.html'],
                dest: 'wwwroot/js/templates.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['concat', 'html2js']);
};