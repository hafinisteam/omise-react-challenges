const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === "development";
  const isProduction = argv.mode === "production";

  const cssLoaders = [
    isDevelopment && require.resolve("style-loader"),
    isProduction && MiniCssExtractPlugin.loader,
    "css-loader"
  ].filter(Boolean);

  return {
    mode: isProduction ? "production" : isDevelopment && "development",
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "build"),
      publicPath: "/",
      filename: isProduction
        ? "static/js/[name].[chunkhash:8].js"
        : isDevelopment && "static/js/bundle.js",
      chunkFilename: isProduction
        ? "static/js/[name].[chunkhash:8].chunk.js"
        : isDevelopment && "static/js/[name].chunk.js"
    },
    devtool: "source-map",
    devServer: {
      contentBase: "./public"
    },
    module: {
      rules: [
        {
          enforce: "pre",
          test: /\.js$/,
          exclude: /node_modules/,
          loader: require.resolve("eslint-loader"),
          options: {
            emitWarning: true
          }
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: require.resolve("babel-loader")
        },
        {
          test: /\.css$/,
          use: cssLoaders
        },
        {
          test: [/\.jpe?g$/, /\.png$/],
          loader: require.resolve("url-loader"),
          options: {
            limit: 10000,
            name: "static/media/[name].[hash:8].[ext]"
          }
        }
      ]
    },
    resolve: {
      extensions: ["*", ".js"]
    },
    optimization: isProduction
      ? {
          minimize: true,
          minimizer: [
            new TerserPlugin({
              parallel: true,
              cache: true
            }),
            new OptimizeCSSAssetsPlugin()
          ],
          splitChunks: {
            chunks: "all"
          },
          runtimeChunk: true
        }
      : {},
    plugins: [
      isProduction &&
        new MiniCssExtractPlugin({
          filename: "static/css/[name].[contenthash:8].css",
          chunkFilename: "static/css/[name].[contenthash:8].chunk.css"
        }),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        inject: true
      })
    ].filter(Boolean)
  };
};
