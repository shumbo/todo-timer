const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname + '/dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.css'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html'),
    }),
    new WebpackPwaManifest({
      name: 'TodoTimer',
      short_name: 'Todo',
      description: 'A simple Todo app with timer',
      icons: [
        {
          src: path.join(__dirname, 'public/icon.png'),
          sizes: [96, 128, 192, 256, 384, 512, 1024],
          ios: true,
        },
      ],
      background_color: '#ffffff',
      ios: true,
    }),
    new CopyWebpackPlugin([
      {
        from: 'public',
      },
    ]),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};
