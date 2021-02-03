var path = require("path"); //this will give a abolute path of asgraph such as /home/younggu/git/asgraph

var HtmlWebpackPlugin = require("html-webpack-plugin");

const SRC_DIR = path.resolve(__dirname, "src");

console.log(">>>>path: ", path);
console.log(">>>SRC_DIR: ", SRC_DIR);
/*
	Date: Jan 09 - 2021
	Note that publicPath has been changed because you use Ract.lazy() 
	which produces n_index_bundle.js and being called from <script src="js/built/root_index_bundle.js"></script>
	in webapp/index.html, as a result not loading chunk-bundles properly, generating errors in loading failures.
	
	solution: changed publicPath: "/" to "/js/built", from '1)' below
	see: 
		1) https://stackoverflow.com/questions/53704950/webpack-code-splitting-loading-chunk-failed-error-wrong-file-path
		2) https://medium.com/@botfather/react-loading-chunk-failed-error-88d0bb75b406
	
	
*/
module.exports=
{
		
		mode: "development ",
		entry: 
		{
			root: "./src/main/webapp/js/root_index.jsx",
			admin: "./src/main/webapp/js/admin_index.jsx"
		},
		output:
		{
			path: path.resolve(__dirname, "src/main/webapp/js/built"),
			filename: "[name]_index_bundle.js",
			chunkFilename: "[name]_index_bundle.js",
			publicPath: "/js/built/"
		},	
		resolve:
		{
			extensions: ['.js', '.jsx']
		},	
		module:
		{
			rules:
			[
				{ 
					test: /.(js|jsx)$/,
					exclude: /node_modules/,
					//include: SRC_DIR+"/main/webapp/js", 
					use: 
					{
						loader: "babel-loader"
					}
					
				},
				{ test: /\.css$/, use: ["style-loader", "css-loader"]},
				{				
				  //see https://www.youtube.com/watch?v=cDLfpth5a3s
				  test: /\.(jpe?g|png|gif|svg)$/i, 
				  use: 
				  [
					"file-loader?name=[path][name].[ext]",
					"image-webpack-loader"
				  ]
				},
				{
			        test: /\.html$/i,
			        loader: 'html-loader',
			    },
				{
					//https://github.com/webpack-contrib/file-loader/issues/259
			        test: /\.json$/,
			        loader: "file-loader",
			        type: "javascript/auto"
			    }
			]
		},
		devServer:
		{
			historyApiFallback: true,
			watchContentBase: true,
			https: true
		},
		watchOptions:
		{
			poll: true
		},
		performance: 
		{
		    hints: false
		},
		plugins:
		[
			new HtmlWebpackPlugin
			(
				{
					minify: {callapseWhitespace: true},
					filename: "index.html",
					template: "src/main/webapp/index.html",
					chunks: ["root"]
				}
			),
			new HtmlWebpackPlugin
			(
				{
					minify: {callapseWhitespace: true},
					filename: "admin_index.html",
					template: "src/main/webapp/index.html",
					chunks: ["admin"]
				}
			)
		]
		
};