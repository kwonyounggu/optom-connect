var path = require("path"); //this will give a abolute path of asgraph such as /home/younggu/git/asgraph

var HtmlWebpackPlugin = require("html-webpack-plugin");

const SRC_DIR = path.resolve(__dirname, "src");

console.log(">>>>path: ", path);
console.log(">>>SRC_DIR: ", SRC_DIR);

module.exports=
{
		
		mode: "development",
		entry: 
		{
			root: "./src/main/webapp/js/root_index.jsx",
			admin: "./src/main/webapp/js/admin_index.jsx"
		},
		output:
		{
			path: path.resolve(__dirname, "src/main/webapp/js/built"),
			filename: "[name]_index_bundle.js",
			publicPath: "/"
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
					test: /\.m?js$/, 
					exclude: /(node_modules|bower_components)/,
					//include: SRC_DIR+"/main/webapp/js", 
					use: 
					{
						loader: "babel-loader",
						options: 
						{
          					presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-stage-0"]
          				}
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