
module.exports = function(grunt) {

    grunt.config.set('retinafy', {
        dist: {
            options: {
                sizes: {
                    '50%':  { suffix: '' },
                    '100%': { suffix: '@2x' }
                }
            },
            files: [{
                expand: true,
                cwd: 'assets/images/sprites',
                src: ['*.png'],
                dest: 'assets/images/sprites/renamed'
            }]
        }
    });

    grunt.loadNpmTasks('grunt-retinafy');
};
