const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin


let ExtractTextPlugin     = require('extract-text-webpack-plugin');
let webpack               = require('webpack');
let path                  = require('path');
const UglifyJSPlugin      = require('uglifyjs-webpack-plugin');
let CleanWebpackPlugin    = require('clean-webpack-plugin');
var WebpackNotifierPlugin = require('webpack-notifier');

const env = process.env.NODE_ENV || 'development'


module.exports = {
    name: 'coins',
    target: 'web',
    //stats: 'minimal',
    // devtool: 'sourcemap',
    //devtool: 'eval-cheap-module-source-map',
    devtool: false,
    entry: {
        index: './src/js/index.js',
        vendor: [
            'react',
            'react-dom',
            'semantic-ui-react',
            'lodash',
        ],
    },
    resolve: {
        alias: {
            //'react-onsenui': 'react-onsenui/src'
        }
    },
    module: {
        loaders: [
            {
                test: /\.js/,
                exclude: '/node_modules/',
                include: [path.resolve(__dirname, './src')],
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'stage-0', 'react'],
                        'plugins': ['transform-es2015-destructuring', 'transform-object-rest-spread']
                    }
                }]
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                use: 'file-loader?name=../images/[name].[ext]&outputPath=../images/'
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: 'file-loader?name=../fonts/[name].[ext]&outputPath=../fonts/'
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader!less-loader'
                })
            },
            {
                test: /\.css/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
        ]
    },
    plugins: [
        new ExtractTextPlugin('../css/[name].css'),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            // async: true,
            minChunks: Infinity
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(env),
            },
        }),
        //new BundleAnalyzerPlugin(),
        new UglifyJSPlugin({
            // beautify: false,
            // comments: false,
            // output: {comments: false},
             compress: {
            //     sequences: true,
            //     booleans: true,
            //     loops: true,
            //     unused: true,
                 warnings: true,
            //     drop_console: true,
                 unused: true,
            //     unsafe: false
             },
            // warnings: true,
            mangle: false,
        }),
        // new webpack.optimize.OccurrenceOrderPlugin(),

        // new webpack.DefinePlugin({
        //     'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        //     'process.env.DEBUG': JSON.stringify(process.env.DEBUG)
        // }),
        new CleanWebpackPlugin(['public/*'], {
            root: __dirname,
            verbose: true,
            dry: false,
        }),
        new WebpackNotifierPlugin(),
        // new webpack.EnvironmentPlugin({
        //     NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
        //     DEBUG: false
        // })
        // new (require('webpack-bundle-analyzer').BundleAnalyzerPlugin)()
        //new webpack.HotModuleReplacementPlugin(),
        //new webpack.NoEmitOnErrorsPlugin()
    ],
    output: {
        filename: '[name].js',
        path: __dirname + '/public/js',
        publicPath: '../',
        jsonpFunction: 'hui'
    },
};