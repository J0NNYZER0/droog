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
	}

Server.connection({
	host: '0.0.0.0',
	port: process.env.PORT || 8000,
	state: { ignoreErrors: true }
})


Server.route(
	[].concat(
		Routes.Home,
		Routes.Inventory,
		Routes.Products,
		Routes.Bags,
		Routes.Orders
	))

Server.register([
	Inert,
	Vision,
	{
		'register': Swagger,
		'options': swaggerOptions
	}], err => {

	if (err) {
		throw err
	}

	Server.start()
		.then(() => console.log('Server running at:', Server.info.uri, 'on ' + Utils.CreateHumanReadableDate()))
		.catch((e) => console.log(e))
})

module.exports = Server
