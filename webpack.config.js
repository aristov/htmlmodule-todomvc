const path = require('path')

module.exports = [
	{
		mode : 'none',
		entry : './src/index.js',
		output : {
			path : path.join(__dirname, 'build'),
			publicPath : '/build/',
			filename : 'index.bundle.js',
		},
		externals : {
			window : 'window',
		},
		devServer : {
			static : {
				directory : __dirname,
			},
			hot : true,
		},
	},
]
