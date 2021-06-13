const path = require('path');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const config = () => {
  // const suffix = env.prod ? ".min" : "";
  const isDevelopment = process.env.NODE_ENV !== 'production';
  console.log(isDevelopment);

  return {
    mode: isDevelopment ? 'development' : 'production',
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          include: path.join(__dirname, 'src'),
          use: ["babel-loader", "eslint-loader"],
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: ["file-loader"],
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1
              }
            },
            'postcss-loader'
          ]
        }
      ]
    },
    resolve: {
      extensions: [
        '.js',
        '.jsx'
      ]
    },
    devServer: {
      port: 3012,
      public: 'staging.irithyll.com',
      hot: true,
      disableHostCheck: true,
      proxy: {
        '/api/**': {
          changeOrigin: true,
          target: 'https://gw2api.irithyll.com',
        }
      }
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            name: "commons",
            chunks: "initial",
            minChunks: 2,
            minSize: 0,
          },
        },
      },
      chunkIds: "named", // To keep filename consistent between different modes (for example building only)
    },
    devtool: 'eval-source-map',
    plugins: [
      isDevelopment && new webpack.HotModuleReplacementPlugin(),
      isDevelopment && new ReactRefreshPlugin(),
      new HtmlWebpackPlugin({
        filename: './index.html',
        template: './public/index.html',
      }),
    ].filter(Boolean)
  }
};

module.exports = config;