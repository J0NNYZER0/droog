'use strict'

const Hapi = require('hapi'),
	HapiAuthJwt2 = require('hapi-auth-jwt2'),
	Bcrypt = require('bcrypt'),
	Path = require('path'),
	Inert = require('inert'),
	Good = require('good'),
	Swagger = require('hapi-swagger'),
	Vision = require('vision'),
	Handlebars = require('handlebars'),
	Server = new Hapi.Server(),
	Users = [
		{
			id: '1',
			username: 'J0NNYZER0',
			password: '$2a$10$iqJSHD.BGr0E2IxQwYgJmeP3NvhPrXAeLSaGCj6IR/XU5QtjVu5Tm',
			name: 'Jon'
		}
	],
	GetUser = (username) => {
		return Users.find(u => {
			if (u.username === username)
			return u
		})
	},
	Validation = (decoded, request, callback) => {
		const user = GetUser(decoded.username)
    if (!user) return callback(null, false)
		else return callback(null, true)
    //Bcrypt.compare(password, user.password, (err, isValid) => callback(err, isValid, { id: user.id, name: user.name }))
	},
	Utils = require('./utils').Utils,
	Routes = require('./routes').Routes,
	PluginOptions = {
		good: {
			ops: {
				interval: 1000
			},
			reporters: {
				consoleEventReporter: [
					{
						module: 'good-squeeze',
						name: 'Squeeze',
						args: [{ log: '*', response: '*' }]
					},
					{
						module: 'good-console'
					},
					'stdout'
				],
				errorEventReporter: [
					{
						module: 'good-squeeze',
						name: 'Squeeze',
						args: [
							{
								error: '*'
							}
						]
					},
					{
						module: 'good-squeeze',
						name: 'SafeJson'
					},
					{
						module: 'good-file',
						args: ['./logs/errors/error_events.log']
					}
				],
				logEventReporter: [
					{
						module: 'good-squeeze',
						name: 'Squeeze',
						args: [{ log: '*V' }]
					},
					{
						module: 'good-squeeze',
						name: 'SafeJson'
					},
					{
						module: 'good-file',
						args: ['./logs/logs/log_events.log']
					}
				],
				responseEventReporter: [
					{
						module: 'good-squeeze',
						name: 'Squeeze',
						args: [
							{
								response: '*'
							}
						]
					},
					{
						module: 'good-squeeze',
						name: 'SafeJson'
					},
					{
						module: 'good-file',
						args: ['./logs/responses/response_events.log']
					}
				],
				opsEventReporter: [
					{
						module: 'good-squeeze',
						name: 'Squeeze',
						args: [
							{
								ops: '*'
							}
						]
					},
					{
						module: 'good-squeeze',
						name: 'SafeJson'
					},
					{
						module: 'good-file',
						args: ['./logs/ops/ops_events.log']
					}
				]
			}
		},
		swagger: {
			documentationPage: false,
			swaggerUIPath: '/template/documentation/',
			info: {
				'title': 'Documentation',
				'version': '1.0'
			},
			jsonEditor: true,
			validatorUrl: null,
			grouping: 'tags',
			sortEndpoints: 'method'
		}
	},
	Plugins = [
		{
			register: Good,
			options: PluginOptions.good
		},
		HapiAuthJwt2,
		Inert,
		Vision,
		{
			register: Swagger,
			options: PluginOptions.swagger
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

	Server.auth.strategy('jwt', 'jwt',
	{
		key: '$4n74_C!4U$3',
		headerKey: 'droogauth',
		validateFunc: Validation,
		verifyOptions: { ignoreExpiration: true }
	})

	Server.auth.default('jwt')

	Server.route(
		[].concat(
			Routes.Addresses,
			Routes.Bags,
			Routes.BagItems,
			Routes.Contacts,
			Routes.Customers,
			Routes.CustomerOrders,
			Routes.Documentation,
			Routes.Files,
			Routes.Home,
			Routes.Inventory,
			Routes.Login,
			Routes.OrderStatus,
			Routes.Orders,
			Routes.Payments,
			Routes.Products,
			Routes.Users
		))

	Server.views({
		engines: { html: Handlebars },
		path: __dirname + '/templates'
	})


	Server.ext('onPreResponse', (request, reply) => {
		if (request.response.isBoom) {
			const err = request.response,
			errorMessage = err.output.payload.error,
			statusCode = err.output.payload.statusCode

			if (statusCode === 401)
      	return reply().redirect('/login')
		}

	  reply.continue()
	})

	Server.start()
		.then(() => console.log('Server running at:', Server.info.uri, 'on ' + Utils.CreateHumanReadableDate()))
		.catch((e) => console.log(e))
})
