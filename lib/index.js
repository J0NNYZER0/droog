'use strict'

const Hapi = require('hapi'),
	Path = require('path'),
	Inert = require('inert'),
	Swagger = require('hapi-swagger'),
	Vision = require('vision'),
	Handlebars = require('handlebars'),
	Server = new Hapi.Server(),
	Utils = require('./utils').Utils,
	Routes = require('./routes').Routes,
	swaggerOptions = {
		documentationPage: false,
		swaggerUIPath: '/template/documentation/',
		info: {
			'title': 'Documentation',
			'version': '1.0'
		},
		jsonEditor: true,
		validatorUrl: null
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
	state: { ignoreErrors: true },
	routes: {
		files: { relativeTo: Path.join(__dirname, '../assets') }
	}
})

Server.register(Plugins, err => {

	if (err) {
		throw err
	}

	Server.route(
		[].concat(
			Routes.Addresses,
			Routes.Bags,
			Routes.Contacts,
			Routes.Customers,
			Routes.Documentation,
			Routes.Files,
			Routes.Home,
			Routes.Inventory,
			Routes.Orders,
			Routes.Preorders,
			Routes.Products
		))

	Server.views({
		engines: { html: Handlebars },
		path: __dirname + '/templates',
		layout: 'layout/layout'
	})

	Server.start()
		.then(() => console.log('Server running at:', Server.info.uri, 'on ' + Utils.CreateHumanReadableDate()))
		.catch((e) => console.log(e))
})
