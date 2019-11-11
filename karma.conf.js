module.exports = function (config) {
    config.set ({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            '/unit/*.js',
            '/scripts/*.js'
        ],
        exclude: [],
        
        preprocessors: {
            '/scripts/*.js': 'coverage'
        },

        coverageReporter: {
            reporters: [
                {type: 'html'},
                {type: 'lcov'},
                {type: 'text-summary'}
            ]
        },

        reporters: ['spec', 'coverage'],

        port: 9876,

        colors: true,

        logLevel: config.LOG_INFO,

        autoWatch: true,

        browsers: ['PhantomJS'],

        singleRun: false,

        concurrency: Infinity
    })
}
