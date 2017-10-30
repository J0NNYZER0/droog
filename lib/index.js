'use strict'

const Hapi = require('hapi'),
	Inert = require('inert'),
	Swagger = require('hapi-swagger'),
	Vision = require('vision'),
	Server = new Hapi.Server(),
	Utils = require('./utils').Utils,
	Routes = require('./routes').Routes,
	swaggerOptions = {
		info: {
			'title': 'Documentation',
			'version': '1.0'
		}
	},
	Plugins = [
		Inert,
		Vision,
		{
			'register': Swagger,
			'options': swaggerOptions
		}
	]


Server.connection({
	host: '0.0.0.0',
	port: process.env.PORT || 8000,
	state: { ignoreErrors: true }
})

Server.route(
	[].concat(
		Routes.Bags,
		Routes.Home,
		Routes.Inventory,
		Routes.Orders,
		Routes.Products
	))

Server.register(Plugins, err => {

	if (err) {
		throw err
	}

	Server.start()
		.then(() => console.log('Server running at:', Server.info.uri, 'on ' + Utils.CreateHumanReadableDate()))
		.catch((e) => console.log(e))
})
