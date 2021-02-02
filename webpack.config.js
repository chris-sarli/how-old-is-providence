// NOTE: To use this example standalone (e.g. outside of deck.gl repo)
// delete the local development overrides at the bottom of this file

const HtmlWebpackPlugin = require('html-webpack-plugin');

const CONFIG = {
  mode: 'development',

  entry: {
    app: './src/app.js'
  },
  
  plugins: [new HtmlWebpackPlugin({
    title: 'deck.gl example',
    template: 'src/index.html'
  })],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
    ],
  }
};

module.exports = CONFIG;

// This line enables bundling against src in this repo rather than installed module
// module.exports = env => (env ? require('../../../webpack.config.local')(CONFIG)(env) : CONFIG);


