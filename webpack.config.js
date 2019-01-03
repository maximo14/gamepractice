const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      hash: true
    }),
    new MiniCSSExtractPlugin({
      filename: "estilos.css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }, 
      { 
        test: /\.scss$/, 
        loader: [
          MiniCSSExtractPlugin.loader,
          "css-loader",
          'sass-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    port: 9000,
    disableHostCheck: true
  }
};