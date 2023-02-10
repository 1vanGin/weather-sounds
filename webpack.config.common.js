const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: './index.js',
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'), // __dirname - тек. директория
        clean: true
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html')
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'public/favicon.png'),
                    to: path.resolve(__dirname, 'dist')
                },
                {
                    from: path.resolve(__dirname, 'src/icons'),
                    to: path.resolve(__dirname, 'dist/icons')
                },
                // Перемещение картинок в папку с использованием MiniCssExtractPlugin ломает url и заменяет / на \
                // {
                //     from: path.resolve(__dirname, 'src/images'),
                //     to: path.resolve(__dirname, 'dist/images')
                // },
                {
                    from: path.resolve(__dirname, 'src/sounds'),
                    to: path.resolve(__dirname, 'dist/sounds')
                },
            ]
        }),
        new MiniCssExtractPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader,  'css-loader'], // запускается справа на лево
            },
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader,  'css-loader', 'sass-loader'], // запускается справа на лево
            },
            // Перемещение картинок в папку с использованием MiniCssExtractPlugin ломает url и заменяет / на \
            // {
            //     test: /\.(png|jpg|jpeg|gif)$/i,
            //     type: 'asset/resource',
            //     generator: {
            //         filename: path.join('images', '[name][ext]'),
            //     },
            // },
            {
                test: /\.svg$/,
                type: 'asset/resource',
                generator: {
                    filename: path.join('icons', '[name][ext]'),
                },
            },
            {
                test: /\.(woff2?|eot|ttf|otf)$/i,
                type: 'asset/resource',
                // Перемещение шрифта в папку с использованием MiniCssExtractPlugin ломает url и заменяет / на \
                // generator: {
                //     filename: path.join('fonts', '[name][ext]'),
                // },
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
        ],
    },
}