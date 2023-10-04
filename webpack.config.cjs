const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const TsCheckerPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const buildPath = path.resolve(__dirname, 'dist');
const srcPath = path.resolve(__dirname, 'src');
const isProd = process.env.NODE_ENV === 'production';

const getSettingsForStyles = (withModules = false) => {
  return [
    MiniCssExtractPlugin.loader,
    !withModules
      ? 'css-loader'
      : {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: !isProd ? '[path][name]__[local]' : '[hash:base64]',
            },
          },
        },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: ['autoprefixer'],
        },
      },
    },
    {
      loader: 'sass-loader',
      options: {
        additionalData: '@import "./src/styles/styles.scss";',
      },
    },
  ];
};

module.exports = {
  target: isProd ? 'browserslist' : 'web',
  entry: path.join(srcPath, './main.tsx'),
  output: {
    path: buildPath,
    filename: 'bundle.js',
    publicPath: '/',
  },
  devtool: isProd ? 'hidden-source-map' : 'eval-source-map',
  resolve: {
    extensions: ['.tsx', '.jsx', '.js', '.ts'],
    alias: {
      api: path.join(srcPath, 'api'),
      assets: path.join(srcPath, 'assets'),
      config: path.join(srcPath, 'config'),
      contexts: path.join(srcPath, 'contexts'),
      entities: path.join(srcPath, 'entities'),
      pages: path.join(srcPath, 'pages'),
      components: path.join(srcPath, 'components'),
      hooks: path.join(srcPath, 'hooks'),
      utils: path.join(srcPath, 'utils'),
      styles: path.join(srcPath, 'styles'),
      store: path.join(srcPath, 'store'),
    },
  },
  module: {
    rules: [
      {
        test: /\.module\.s?css$/,
        use: getSettingsForStyles(true),
      },
      {
        test: /\.s?css$/,
        exclude: /\.module\.s?css$/,
        use: getSettingsForStyles(),
      },
      {
        test: /\.[tj]sx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.mp4$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'videos/',
            },
          },
        ],
      },
      {
        test: /\.(png|jpg)$/,
        type: 'asset/resource',
      },
      {
        test: /\.svg$/i,
        type: 'asset',
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: [/url/] },
        use: ['@svgr/webpack'],
      },
    ],
  },
  devServer: {
    host: 'localhost',
    // https://stackoverflow.com/a/73018329
    hot: true,
    static: {
      directory: path.join(__dirname, './src'),
    },
    open: true,
    historyApiFallback: true,
    port: 9000,
  },
  plugins: [
    !isProd && new ReactRefreshWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]-[hash].css',
    }),
    new Dotenv(),
    new TsCheckerPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
      inject: true,
    }),
  ].filter(Boolean),
};
