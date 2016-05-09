/**
 * Creates a webfont from SVG sources
 *
 * ---------------------------------------------------------------
 *
 * For usage docs see:
 *   https://github.com/sapegin/grunt-webfont
 *
 *
 */

module.exports = function(grunt) {

    grunt.config.set('webfont', {
        dist: {
            src: 'assets/images/svg/*.svg',
            dest: 'assets/fonts',
            destCss: 'assets/styles/',
            options: {
                stylesheet: 'less',
                fontFilename: 'dior-icons',
                types: 'eot,woff,ttf,svg',
                htmlDemo: false,
                hashes: false
            }
        }
    });

    grunt.loadNpmTasks('grunt-webfont');
};
