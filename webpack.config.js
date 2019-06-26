const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: __dirname + "/public",
    publicPath: "/"
  },
  devtool: 'source-map',
  devServer: {
    contentBase: "./public"
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      meta: {
        viewport: "width=device-width, initial-scale=1, shrink-to-fit=no"
      }
    })
  ],
  resolve: {
    extensions: ["*", ".js"]
  }
};
