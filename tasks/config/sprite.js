
module.exports = function(grunt) {

    grunt.config.set('sprite', {
        dist: {
            src: ['assets/images/sprites/renamed/*.png'],
            retinaSrcFilter: ['assets/images/sprites/renamed/*@2x.png'],
            dest: 'assets/images/spritesheet.png',
            retinaDest: 'assets/images/spritesheet@2x.png',
            destCss: 'assets/styles/_spritesheet.less'
        }
    });

    grunt.loadNpmTasks('grunt-spritesmith');
};
