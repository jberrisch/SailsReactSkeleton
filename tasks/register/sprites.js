module.exports = function(grunt) {
    grunt.registerTask('sprites', [
        'retinafy',
        'sprite',
        'clean:sprites'
    ]);
};
