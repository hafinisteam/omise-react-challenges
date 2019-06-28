const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = env => {

  const isDev = env === 'development';
  const isProduction = env === 'production';
  console.log(env);
	return {
		entry: './src/index.js',
		output: {
			filename: 'bundle.js',
			path: path.resolve(__dirname, 'dist'),
			publicPath: '/'
		},
		devtool: 'source-map',
		devServer: {
			contentBase: './public'
		},
		module: {
			rules: [
				{
					enforce: 'pre',
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'eslint-loader',
					options: {
						emitWarning: true
					}
				},
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel-loader'
				},
				{
					test: /\.css$/i,
					use: ['style-loader', 'css-loader']
				}
			]
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: './public/index.html',
				meta: {
					viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
				}
			})
		],
		resolve: {
			extensions: ['*', '.js']
		}
	};
};
