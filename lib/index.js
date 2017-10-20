'use strict'

const Hapi = require('hapi'),
	Server = new Hapi.Server(),
	Utils = require('./utils').Utils,
	Routes = require('./routes').Routes

Server.connection({
	host: 'localhost',
	port: 8000
})

// Add the route
Server.route(
	[].concat(
		Routes.Home,
		Routes.Inventory,
		Routes.Products,
		Routes.Bags,
		Routes.Orders
	))

// Start the server
Server.start()
	.then(() => console.log('Server running at:', Server.info.uri, 'on ' + Utils.CreateHumanReadableDate()))
	.catch((e) => console.log(e))

module.exports = Server
