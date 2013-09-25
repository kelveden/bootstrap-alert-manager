module.exports = function(config) {
    config.set({
        frameworks: [ 'jasmine' ],
        browsers: [ 'PhantomJS' ],
        autoWatch: true,
        files: [
            'src/js/*.js',
            'test/js/*-spec.js',
            {
                pattern: 'test/js/lib/jquery-*.js',
                watched: false
            },
            {
                pattern: 'test/js/lib/jasmine-jquery-*.js',
                watched: false
            }
        ]
    });
};