//Note that you should not include html
				{ //May 6 2020, added to read a json file but there is a problem in reading. Solution is not found yet.
					type: 'javascript/auto',
				    test: /\.(json|html)/,
					exclude: /(node_modules|bower_components)/,
					use:[
							{
						      loader: 'file-loader',
						      options: { name: '[name].[ext]' },
						    }
						]
				}