const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const pkg = require('./package.json');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const NpmInstallPlugin = require('npm-install-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
  style: path.join(__dirname, 'app/main.css')
};

//common enviroment for build && production

const common = {
  // Entry accepts a path or an object of entries.
  // We'll be using the latter form given it's
  // convenient with more complex configurations.
  entry: {
    app: PATHS.app,
    style: PATHS.style
  },
  output: {
    path: PATHS.build,
    filename: '[name].js'
  },
 
module: {
  loaders: [
    {
      test: /.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015', 'react']
      }
    },
    {
      test: /\.json$/,
      loader: 'raw-loader'
    }
  ]
},
plugins: [
    new HtmlWebpackPlugin({
      title: 'Kilbi Timetable',
      template: './template.html'

    })
    ]
  };

  //enviroment for production

  if(TARGET === 'start' || !TARGET) {
    module.exports = merge(common, {
      devtool: 'eval-source-map',
      devServer: {
        // Enable history API fallback so HTML5 History API based
        // routing works. This is a good default that will come
        // in handy in more complicated setups.
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,

        // Display only errors to reduce the amount of output.
        stats: 'errors-only',

        // Parse host and port from env to allow customization.
        //
        // If you use Vagrant or Cloud9, set
        // host: process.env.HOST || '0.0.0.0';
        //
        // 0.0.0.0 is available to all network devices
        // unlike default localhost
        host: process.env.HOST,
        port: process.env.PORT

        // If you want defaults, you can use a little trick like this
        // port: process.env.PORT || 3000
        },
        module: {
          loaders: [
          // Define development specific CSS setup
            {
              test: /\.css$/,
              loaders: ['style', 'css'],
              include: PATHS.app
            }
            ]
          },
          plugins: [

            new webpack.HotModuleReplacementPlugin(),
            new NpmInstallPlugin({
              save: true // --save
            })
            ]
          });
  }

//enviroment for build

  if(TARGET === 'build' || TARGET === 'stats') {

    module.exports = merge(common, {
      // Define vendor entry point needed for splitting
      entry: {
        // Set up an entry chunk for our vendor bundle.
        // You can filter out dependencies here if needed with
        // `.filter(...)`.
        vendor: Object.keys(pkg.dependencies)
      },
      output: {
        path: PATHS.build,
        filename: '[name].[chunkhash].js',
        chunkFilename: '[chunkhash].js'
      },
      module: {
        loaders: [
        // Extract CSS during build
          {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style', 'css'),
            include: PATHS.app
          }
          ]
        },
        plugins: [

          new CleanWebpackPlugin([PATHS.build]),

          new ExtractTextPlugin('[name].[chunkhash].css'),
          
          // Extract vendor and manifest files
          new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
          }),

          new webpack.optimize.UglifyJsPlugin({
            compress: {
              warnings: false
            }
          }),

          new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
            // You can set this to '"development"' or
            // JSON.stringify('development') for your
            // development target to force NODE_ENV to development mode
            // no matter what
          })
          ]
        });
  }