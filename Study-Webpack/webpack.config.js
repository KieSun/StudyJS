const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BabiliPlugin = require("babili-webpack-plugin");
const webpack = require('webpack');

const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build'),
};

module.exports = {
    devServer: {
        overlay: {
            errors: true,
            warnings: true,
        },
    },
    devtool: 'source-map',
    entry: {
        app: PATHS.app,
        vendor: ['react'],
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    emitWarning: true,
                },
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        },
                    },
                }),
            },
        ],
    },
    output: {
        path: PATHS.build,
        filename: '[name].js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack Demo!',
        }),
        new ExtractTextPlugin("[name].css"),
        new BabiliPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
    ],
};