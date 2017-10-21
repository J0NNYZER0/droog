'use strict'

const Hapi = require('hapi'),
	Server = new Hapi.Server(),
	Utils = require('./utils').Utils,
	Routes = require('./routes').Routes

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

Server.start()
	.then(() => console.log('Server running at:', Server.info.uri, 'on ' + Utils.CreateHumanReadableDate()))
	.catch((e) => console.log(e))

module.exports = Server
