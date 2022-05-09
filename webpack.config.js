module.exports = [
	{
		mode : 'none',
		entry : './src/index.js',
		output : {
			publicPath : '/dist',
			filename : 'index.bundle.js',
		},
		devServer : {
			static : {
				directory : __dirname,
			},
			hot : true,
		},
	},
]
