const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const { CleanWebpackPlugin } = require ('clean-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const optimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    entry: {
        app:path.resolve(__dirname,'src','index.js'),
},
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: `js/[name].[hash].js`,
        publicPath: 'http://localhost:3003/',
        chunkFilename: 'js/[id].[chunkhash].js'
    },
    optimization:{
        minimizer: [
            new TerserJSPlugin(),
            new optimizeCSSAssetsPlugin()
        ]
    },

    module:{
        rules:[
            {
                test: /\.jpg|png|gif|woff|eot|ttf|svg|mp4|webm$/,
                use: {
                    loader: 'url-loader',
                    options:{
                        limit: 10000,
                        name: '[name].[hash].[ext]',
                        outputPath: '/assets'
                    }
                },
                exclude: /node_modules/,
            },
            {
                test: /\.js$/i,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: [
                    {
                        loader:MiniCssExtractPlugin.loader,
                    },                    
                    'css-loader'
                    ],
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash].css',
            chunkFilename: 'css/[id].[chunkhash].css'
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,'public/index.html')
        }),
        new webpack.DllReferencePlugin({
            manifest: require('./modules-manifest.json')
        }),
        new AddAssetHtmlPlugin({
            filepath: path.resolve(__dirname,'dist/js/*.dll.js'),
            outputPath: 'js',
            publicPath: 'http://localhost:3003/js'
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['**/app.*'],
        })
    ],
}
