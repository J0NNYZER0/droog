'use strict'

const Hapi = require('hapi'),
	Catbox = require('catbox'),
	HapiAuthCookie = require('hapi-auth-cookie'),
	HapiAuthJwt2 = require('hapi-auth-jwt2'),
	Bcrypt = require('bcrypt'),
	Path = require('path'),
	Inert = require('inert'),
	Good = require('good'),
	Swagger = require('hapi-swagger'),
	Vision = require('vision'),
	Handlebars = require('handlebars'),
	Connections = {
		Server: {
			host: '0.0.0.0',
			port: process.env.PORT || 8000,
			state: { ignoreErrors: true },
			routes: {
				cors: {
					origin: ['*'],
					headers: ['X-Droog-Auth', 'Access-Control-Allow-Origin', 'Content-Type'],
					credentials: true
				},
				files: { relativeTo: Path.join(__dirname, '../assets') }
			}
		}
	},
	Server = new Hapi.Server({
		cache: [
			{
				name: 'session',
				engine: require('catbox-memory'),
				host: Connections.Server.host,
				port: Connections.Server.port,
				partition: 'session'
			},
			{
				name: 'confirmEmail',
				engine: require('catbox-memory'),
				host: Connections.Server.host,
				port: Connections.Server.port,
				partition: 'confirmEmail'
			}
		]
	}),
	ValidateFuncForSessionCookie = (request, session, callback) => {
		request.server.app.caches.session.get(session.sid, (err, cached) => {

      if (err) {
          return callback(err, false);
      }

      if (!cached) {
          return callback(null, false);
      }

      return callback(null, true, cached.account.scope)
  	})
	},
	ValidateFuncForJwt = (decoded, request, callback) => {

    return callback(null, true, decoded)
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
			sortTags: 'name',
			sortEndpoints: 'method',
			securityDefinitions: {
        'jwt': {
            'type': 'apiKey',
            'name': 'Authorization',
            'in': 'header'
        }
    	},
			security: [{ 'jwt': [] }]
		}
	},
	Plugins = [
		{
			register: Good,
			options: PluginOptions.good
		},
		HapiAuthCookie,
		HapiAuthJwt2,
		Inert,
		Vision,
		{
			register: Swagger,
			options: PluginOptions.swagger
		}
	]
Server.connection(Connections.Server)

Server.register(Plugins, err => {

	if (err) {
		throw err
	}

  Server.app.caches = {
		session: Server.cache({
			cache: 'session',
			segment: 'session',
			expiresIn: 3 * 24 * 60 * 60 * 1000,
			generateFunc: (id, next) => {
				next(null, id)
			},
			generateTimeout: 10000
		}),
		confirmEmail: Server.cache({
			cache: 'confirmEmail',
			segment: 'confirmEmail',
			expiresIn: 30 * 60 * 1000,
			generateFunc: (id, next) => {
				console.log('The token', id.id, 'was created for', id.email, 'on', Utils.CreateHumanReadableDate())
				next(null, id)
			},
			generateTimeout: 10000
		})
	}

	Server.auth.strategy('session', 'cookie', {
		cookie: 'sid-example',
		password: 'password-should-be-32-characters',
		isSecure: false,
		redirectTo: '/login',
		appendNext: true, // adds a `next` query value
		validateFunc: ValidateFuncForSessionCookie
	})

	Server.auth.strategy('jwt', 'jwt', {
		key: '$3CRE7S4NTA!',
		//key: 'NeverShareYourSecret',
		headerKey: 'x-droog-auth',
		validateFunc: ValidateFuncForJwt,
		verifyOptions: { algorithms: [ 'HS256' ] }
	})

	Server.auth.default('jwt');

	Server.route(
		[].concat(
			Routes.Accounts,
			Routes.Addresses,
			Routes.Bags,
			Routes.BagItems,
			Routes.Cache,
			Routes.Contacts,
			Routes.Customers,
			Routes.CustomerOrders,
			Routes.Droog,
			Routes.Files,
			Routes.Inventory,
			Routes.OrderStatus,
			Routes.Orders,
			Routes.Payments,
			Routes.Products,
			Routes.Shop,
			Routes.Views
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

			switch (statusCode) {
				case 401:
					return reply().redirect('/login')
				case 403:
				case 404:
				case 500:
				return reply.view('error', {
						title: statusCode + ' Error',
						message: 'Whoops! You got a ' + statusCode + '.',
						details: errorMessage,
						buttonText: 'Go back home'
					}, { layout: 'layout/error' })
					.code(statusCode)
			}
		}

	  reply.continue()
	})

	Server.start()
		.then(() => console.log('Server running at:', Server.info.uri, 'on ' + Utils.CreateHumanReadableDate()))
		.catch((e) => console.log(e))
})
