const path = require('path');
const webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm

const config = {
  // context: __dirname,
  // entry: ['./src/index.js'],
  entry: path.resolve(__dirname, 'src', 'index.js'),
  // https://webpack.js.org/configuration/devtool/#development
  devtool: process.env.NODE_ENV === 'development' ? 'cheap-eval-source-map' : false,
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/'  // https://webpack.js.org/guides/public-path/
  },
  devServer: {
    hot: true,
    contentBase: './public',
    publicPath: 'http://localhost:3000/',
    historyApiFallback: true,
    port: 3000
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  stats: {
      colors: true,
      reasons: true,
      chunks: false
  },
  plugins: [ // https://webpack.js.org/plugins/
    // https://webpack.js.org/guides/hot-module-replacement/
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
    // new HtmlWebpackPlugin({ template: './public/index.html' })

    // new webpack.DefinePlugin({
    //   'process.env': {
    //     'NODE_ENV': JSON.stringify('production')
    //   }
    // })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        // use: 'babel-loader',
        exclude: /node_modules/,
        loader: 'babel-loader',  // https://github.com/babel/babel-loader
        // include: path.resolve(__dirname, './src'),
        query: {
          presets: ['es2015']
        },
      },
      {
       test: /\.css$/,                                     //    /\.scss/
       use: ['style-loader', 'css-loader']                 // , 'sass-loader'
     },
     {
       test: /\.(jpe?g|png|gif|svg)$/i,
       loader: "url-loader?name=/public/images/[name].[ext]"
     }

    //  { test: /\.png$/,
    //    loader: 'file'
    //  }
      // {
      //   test: /\.jsx?$/,
      //   loader: 'babel-loader',
      //   include: [path.resolve('js')]
      // }
    ]
  }
};

if (process.env.NODE_ENV !== 'production') {
  console.log('In development mode!');
} else {
  console.info('Running in production');
}

  module.exports = config;
