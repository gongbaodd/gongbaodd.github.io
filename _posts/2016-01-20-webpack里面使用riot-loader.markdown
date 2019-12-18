---
layout: post
categories: fe
---

# webpack里面使用riot-loader

```javascript
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var plugins = [
    new webpack.ProvidePlugin({
        riot: 'riot'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin()
];

module.exports = {
    entry: './src/app',
    output: {
        path: __dirname + '/prd',
        filename: 'app.js'
    },
    plugins: plugins,
    module: {
        preLoaders: [
            {
                test: /\.tag$/,
                loader: 'riotjs-loader',
                exclude: /node_modules/,
                query: { type: 'none' }
            }
        ],
        loaders: [
            {
                test: /\.js|\.tag|\.es6$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                }
            },{
                test: /\.scss$/,
                loaders: ["style", "css?sourceMap", "sass?sourceMap"]
            }
        ]
    },
    resolve: {
        alias: {
            yo: __dirname + '/bower_components/Yo',
            zepto: __dirname + '/bower_components/zepto/zepto.js',
            qrcode: __dirname + '/bower_components/qrcode/dist/arale-qrcode/3.0.5/index.js',
        }
    },
    devtool: "source-map",
    devServer: {
        contentBase: './prd',
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true
    }
}

```
