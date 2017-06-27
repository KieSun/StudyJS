const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build'),
};

module.exports = {
    devServer: {
        overlay: {
            errors: true,
            warnings: true,
        }
    },
    entry: {
        app: PATHS.app,
    },
    module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          emitWarning: true,
        }
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
    ],
};