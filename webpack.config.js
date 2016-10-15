var path = require('path');
module.exports = {
  entry: "./src/main.js",
  output: {
    path: __dirname,
    filename: "./dist/bundle.js"
  },
  module: {
    loaders: [
      // {test: path.join(__dirname, 'src'),loader: 'babel-loader',query: {presets: ['es2015'] }  }
      {test: /\.js$/,loader: 'babel-loader',query: {presets: ['es2015'] }  }
    ]
  }
}