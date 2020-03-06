// let ExtractTextPlugin = require('extract-text-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//
//
// const isDev = process.env.NODE_ENV === 'development';
// const isProd = !isDev;

module.exports = function () {
    return [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            // loader: 'babel-loader'
            // loader: 'script-loader'
        },
        {
            test: /\.hbs$/,
            loader: 'handlebars-loader'
        },
        {
            test: /\.(jpe?g|png|gif|svg|)$/i,
            // loader: 'file-loader?name=images/[hash].[ext]'
            use: {
                loader: "file-loader",
                options: {
                    name: "./images/[name].[hash].[ext]",
                },
            },
        },
        {
            test: /\.(eot|svg|ttf|woff|woff2)$/,
            loader: 'file-loader?name=fonts/[hash].[ext]'
        },

    ];
};
