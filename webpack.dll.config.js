const path = require('path');
const webpack = require('webpack');
const TerserJSPlugin = require('terser-webpack-plugin');
const optimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    entry: {
        modules: [
            'react',
            'react-dom',
            'react-router-dom'
        ]
    },
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: `js/[name].[hash].dll.js`,
        library: '[name]'
    },
    optimization:{
        minimizer: [
            new TerserJSPlugin(),
            new optimizeCSSAssetsPlugin()
        ]
    },
    plugins: [
    new webpack.DllPlugin({
        name:'[name]',
        path: path.join(__dirname, '[name]-manifest.json')
    })
    ],
}
