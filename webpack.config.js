const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';

module.exports = {
    mode,
    entry: {
        main: './src/index.ts',
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.s[ca]ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.hbs$/,
                use: 'handlebars-loader',
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/templates/index.hbs',
            filename: 'index.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'style/main.css',
        }),
    ],
    resolve: {
        extensions: ['.js', '.ts'],
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
    performance: {
        hints: false,
    },
    devServer: {
        static: path.join(__dirname, 'dist'),
        compress: true,
        port: 8080,
    },
};
