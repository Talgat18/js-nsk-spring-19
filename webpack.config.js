const path = require('path');

module.exports = {
    entry: './typerace/src/js/main.js',
    output: {
        path: path.resolve(__dirname, './typerace/dist/js'),
        filename: 'bundle.js'
    }
};