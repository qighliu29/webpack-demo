const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const webpack = require('webpack');

const parts = require('./webpack.parts');
const glob = require('glob');

const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build'),
    // style: glob.sync('./app/**/*.css'),
};

const commonConfig = merge([{
        entry: {
            app: PATHS.app,
            // style: PATHS.style,
        },
        output: {
            path: PATHS.build,
            filename: '[name].js',
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'Webpack demo',
            }),
        ],
    },
    parts.lintJavaScript({
        include: PATHS.app,
    }),
    parts.lintCSS({
        include: PATHS.app,
    }),
    parts.loadFonts({
        options: {
            name: '[name].[hash:8].[ext]',
        },
    }),
    parts.loadJavaScript({
        include: PATHS.app,
    }),
]);

const productionConfig = merge([
    parts.extractCSS({
        use: ['css-loader', parts.autoprefix()],
    }),
    parts.purifyCSS({
        paths: glob.sync(`${PATHS.app}/**/*.js`, {
            nodir: true,
        }),
    }),
    parts.loadImages({
        options: {
            limit: 15000,
            name: '[name].[hash:8].[ext]',
        },
    }),
    parts.generateSourceMaps({
        type: 'source-map',
    }),
    parts.extractBundles([{
        name: 'vendor',
    }]),
    parts.clean(PATHS.build),
    parts.attachRevision(),
    parts.minifyJavaScript(),
    parts.minifyCSS({
        options: {
            discardComments: {
                removeAll: true,
            },
            // Run cssnano in safe mode to avoid
            // potentially unsafe transformations.
            safe: true,
        },
    }),
    parts.setFreeVariable(
        'process.env.NODE_ENV',
        'production'
    ),
    {
        output: {
            chunkFilename: '[name].[chunkhash:8].js',
            filename: '[name].[chunkhash:8].js',
        },
    },
    {
        plugins: [
            new webpack.HashedModuleIdsPlugin(),
        ],
    },
]);

const developmentConfig = merge([
    parts.devServer({
        // Customize host/port here if needed
        host: process.env.HOST,
        port: process.env.PORT,
    }),
    parts.loadCSS(),
    parts.loadImages(),
    {
        output: {
            devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]',
        },
    },
    parts.generateSourceMaps({
        type: 'cheap-module-eval-source-map',
    }),
]);

module.exports = (env) => {
    if (env === 'production') {
        return merge(commonConfig, productionConfig);
    }

    return merge(commonConfig, developmentConfig);
};