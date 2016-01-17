module.exports = {
  entry: {
    login: './src/js/login.js'
  },

  output: {
    path: './public/js',
    filename: '[name].js'
  },

  // enable source maps
  devtool: 'source-map',

  module: {
    loaders: [
      // compile sass from source
      {
        test: /\.scss$/,
        // sourcemaps enabled
        loaders: ['style', 'css?sourceMap', 'sass?sourceMap']
      },

      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'stage-0']
          // ,cacheDirectory: true
        }
      }
    ]
  }
};
