// var path = require('path') // reference to current path on our computer

module.exports = {
    entry: {
        app: './app/_scripts/app.js', // entry to app.js file
        vendor: './app/_scripts/vendor.js',
        lib: './app/_scripts/lib.js',// entry to app.js file
    },
    output: {
        filename: '[name].js' //w rap for each entry own ouput
    },
    module: {
        loaders: [
        {
            loader: 'babel-loader',
            query: {
                presets: [
                ['env', { modules: false }],
                ],
            },
            test:  /\.(js|jsx)$/,
            exclude: /node_modules/
        },
        ]
    }
}
