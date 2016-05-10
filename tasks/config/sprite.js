/**
 * `copy`
 *
 * ---------------------------------------------------------------
 *
 * Copy files and/or folders from your `assets/` directory into
 * the web root (`.tmp/public`) so they can be served via HTTP,
 * and also for further pre-processing by other Grunt tasks.
 *
 * #### Normal usage (`sails lift`)
 * Copies all directories and files (except CoffeeScript and LESS)
 * from the `assets/` folder into the web root -- conventionally a
 * hidden directory located `.tmp/public`.
 *
 * #### Via the `build` tasklist (`sails www`)
 * Copies all directories and files from the .tmp/public directory into a www directory.
 *
 * For usage docs see:
 *   https://github.com/gruntjs/grunt-contrib-copy
 *
 */
module.exports = function(grunt) {

    grunt.config.set('sprite', {
        dist: {
            src: ['assets/images/sprites/*.png'],
            retinaSrcFilter: ['assets/images/sprites/*@2x.png'],
            dest: 'assets/images/spritesheet.png',
            retinaDest: 'assets/images/spritesheet@2x.png',
            destCss: 'assets/styles/_spritesheet.less'
        }
    });

    grunt.loadNpmTasks('grunt-spritesmith');
};
