frameworks = [ 'jasmine' ];
browsers = [ 'PhantomJS' ];
autoWatch = true;
logLevel = LOG_INFO;
reporters = [ 'progress' ];
reportSlowerThan = 50;

plugins = [
    'testacular-jasmine',
];

files = [
    JASMINE,
    JASMINE_ADAPTER,
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
];
