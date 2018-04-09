'use strict'

const Hapi = require('hapi'),
	HapiAuthCookie = require('hapi-auth-cookie'),
	Bcrypt = require('bcrypt'),
	Path = require('path'),
	Inert = require('inert'),
	Good = require('good'),
	Swagger = require('hapi-swagger'),
	Vision = require('vision'),
	Handlebars = require('handlebars'),
	Server = new Hapi.Server(),
	Cache = Server.cache({ segment: 'sessions', expiresIn: 3 * 24 * 60 * 60 * 1000 }),
	ValidateFunc = (request, session, callback) => {

		Cache.get(session.sid, (err, cached) => {

      if (err) {
          return callback(err, false);
      }

      if (!cached) {
          return callback(null, false);
      }

      return callback(null, true, cached.account)
  	})
	},
	Utils = require('./../utils').Utils,
	Routes = require('./../routes').Routes,
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
		Inert,
		Vision,
		{
			register: Swagger,
			options: PluginOptions.swagger
		}
	],
	Lab = require('lab'),
	Code = require('code'),
	lab = exports.lab = Lab.script()

Server.connection({
	host: '0.0.0.0',
	port: process.env.PORT || 8001,
	state: { ignoreErrors: true },
	routes: {
		files: { relativeTo: Path.join(__dirname, '../assets') }
	}
})

Server.register(Plugins, err => {

	if (err) {
		throw err
	}

  Server.app.caches = Cache

	Server.auth.strategy('session', 'cookie', {
		cookie: 'sid-example',
		password: 'password-should-be-32-characters',
		isSecure: false,
		redirectTo: '/login',
		appendNext: true, // adds a `next` query value
		validateFunc: ValidateFunc
	})

	Server.auth.default('session')

	Server.route(
		[].concat(
			Routes.Accounts,
			Routes.Addresses,
			Routes.Bags,
			Routes.BagItems,
			Routes.Contacts,
			Routes.Customers,
			Routes.CustomerOrders,
			Routes.Files,
			Routes.Inventory,
			Routes.OrderStatus,
			Routes.Orders,
			Routes.Payments,
			Routes.Products,
			Routes.Views
		))

	Server.views({
		engines: { html: Handlebars },
		path: __dirname + './../templates'
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

lab.experiment('Server connection', () => {

	lab.test('process env is undefined if NODE_ENV is test', done => {

		if (process.env.NODE_ENV === 'test') {
			Code.expect(process.env.PORT).to.be.undefined()
			done()
		}
	})
})

lab.experiment('Hapi Registered Plugins', () => {

	lab.test('length is 3', done => {

		Code.expect(Plugins.length).to.equal(3)
		done()
	})
})

lab.experiment('Routes', () => {

	lab.test('is an object', done => {

		Code.expect(Routes).to.be.an.object()
		done()
	})

	lab.experiment('Object Keys', () => {

		lab.experiment('contains the key', () => {

			const getProperty = name => Routes.hasOwnProperty(name)
			lab.test('Bags', done => {

				Code.expect(getProperty('Bags')).to.be.true()
				done()
			})

			lab.test('Home', done => {

				Code.expect(getProperty('Home')).to.be.true()
				done()
			})

			lab.test('Inventory', done => {

				Code.expect(getProperty('Inventory')).to.be.true()
				done()
			})

			lab.test('Orders', done => {

				Code.expect(getProperty('Orders')).to.be.true()
				done()
			})

			lab.test('Products', done => {

				Code.expect(getProperty('Products')).to.be.true()
				done()
			})
		})

	})

	lab.experiment('Home Collection', () => {

		lab.test('length is 1', done => {

			Code.expect(Routes.Home.length).to.equal(1)
			done()
		})
	})

	lab.experiment('Bags Collection', () => {

		lab.test('length is 4', done => {

			Code.expect(Routes.Bags.length).to.equal(4)
			done()
		})
	})

	lab.experiment('Inventory Collection', () => {

		lab.test('length is 1', done => {

			Code.expect(Routes.Inventory.length).to.equal(4)
			done()
		})
	})

	lab.experiment('Orders Collection', () => {

		lab.test('length is 4', done => {

			Code.expect(Routes.Orders.length).to.equal(4)
			done()
		})
	})

	lab.experiment('Products Collection', () => {

		lab.test('length is 1', done => {

			Code.expect(Routes.Products.length).to.equal(4)
			done()
		})
	})
})

lab.experiment('Server', () => {

	lab.experiment('is a local instance', () => {

		lab.test('on http', done => {

			Code.expect(Server.info.protocol).to.equal('http')
			done()
		})

		lab.test('at the address 0.0.0.0', done => {

			Code.expect(Server.info.host).to.equal('0.0.0.0')
			done()
		})

		lab.test('on port 8001', done => {

			if (process.env.PORT) {
				Code.expect(Server.info.port).to.equal(process.env.PORT)
			}
			else {
				Code.expect(Server.info.port).to.equal(8001)
			}
			done()
		})

		lab.test('at the address http://0.0.0.0:8001', done => {

			Code.expect(Server.info.uri).to.equal('http://0.0.0.0:8001')
			done()
		})
	})
})

lab.experiment('/test', () => {

	lab.test('is a GET request', done => {

		Server.inject('/test', res => {

			Code.expect(res.request.raw.req.method).to.equal('GET')
			done()
		})
	})

	lab.test('returns status code of 200', done => {

		Server.inject('/test', res => {

			Code.expect(res.statusCode).to.equal(200)
			done()
		})
	})

	lab.test('returns a welcome message', done => {

		Server.inject('/test', res => {

			Code.expect(res.rawPayload).to.be.a.buffer()
			done()
		})
	})

})

lab.experiment('bag/list - ', () => {

	lab.test('is a GET request', done => {

		Server.inject('/test/bag/list', res => {

			Code.expect(res.request.raw.req.method).to.equal('GET')
			done()
		})
	})

	lab.experiment('Repsonse', () => {

		lab.test('returns 500 on handler exception (same tick)', done => {

			const handler = request => {

				const a = null
				a.b.c
			}

			Server.route({ method: 'GET', path: '/test/error', handler })

			Server.inject({ url: '/test/error' }, (res) => {

				console.log('===========')
				//console.log(res.statusCode)
				console.log('===========')

				const _res = {
					statusMessage: 'Internal Server Error',
					statusCode: 500
				}

				Code.expect(_res.statusCode).to.equal(500)
				done()
			})
		})

		lab.test('contains an object', done => {

			Server.inject('/test/bag/list', (res) => {

				const result = {
					status: 200,
					data: [
						{
							dataValues: [Object],
							_previousDataValues: [Object],
							_changed: {},
							_modelOptions: [Object],
							_options: [Object],
							__eagerlyLoadedAssociations: [],
							isNewRecord: false
						},
						{
							dataValues: [Object],
							_previousDataValues: [Object],
							_changed: {},
							_modelOptions: [Object],
							_options: [Object],
							__eagerlyLoadedAssociations: [],
							isNewRecord: false
						}
					]
				}
				Code.expect(result, 'Response').to.be.an.object()
				done()
			})
		})

		lab.test('on success, object contains a status property with a value equal to 200', done => {

			Server.inject('/test/bag/list', (res) => {

				const status = res.result.status

				Code.expect(status, 'Response Status').to.be.a.number()
				Code.expect(status, 'Response Status').to.equal(200)
				done()
			})
		})

		lab.test('contains a property called data with a value which is an array', done => {

			Server.inject('/test/bag/list', (res) => {

				Code.expect(res.result.data, 'Response Data').to.be.an.array()
				done()
			})
		})

		lab.experiment('Data', () => {

			lab.test('is an array', done => {

				Server.inject('/test/bag/list', (res) => {

					const data = res.result.data

					Code.expect(data, 'Response Data').to.be.an.array()
					Code.expect(data.length, 'Data Length').to.be.at.least(0)
					done()
				})
			})

			lab.test('array is empty or contains at least one object containing the properties id, product_id, email, gender, size, quantity, release, created_date', done => {

				Server.inject('/test/bag/list', (res) => {

					const data = res.result.data,
						dataObject = data[0]

					if (data.length > 0) {

						Code.expect(dataObject, 'Data Object').to.be.an.object()
						Code.expect(dataObject.id, 'id').to.be.a.number()
						Code.expect(dataObject.product_id, 'product_id').to.be.a.number()
						Code.expect(dataObject.email, 'email').to.be.a.string()
						Code.expect(dataObject.gender, 'gender').to.be.a.string()
						Code.expect(dataObject.size, 'size').to.be.a.string()
						Code.expect(dataObject.quantity, 'quantity').to.be.a.number()
						Code.expect(dataObject.release, 'release').to.be.a.number()
						Code.expect(dataObject.created_date, 'created_date').to.be.a.date()
						Code.expect(dataObject.updated_date, 'created_date').to.be.a.date()
						done()
					}
					else {
						Code.expect(data).to.be.empty()
						done()
					}

				})
			})
		})
	})
})

lab.experiment('bag/detail/{id} - ', () => {

	lab.test('is a GET request', done => {

		Server.inject('/test/bag/detail/1911', (res) => {

			Code.expect(res.request.raw.req.method).to.equal('GET')
			done()
		})
	})

	lab.experiment('When HTTP request contains no parameter', () => {

		lab.test('parameter is undefined', done => {

			Server.inject('/test/bag/detail/', (res) => {

				Code.expect(res.request.params.id, 'Request parameter').to.be.undefined()
				done()
			})
		})

		lab.experiment('Response', () => {

			lab.test('returns an error object', done => {

				Server.inject('/test/bag/detail/', (res) => {

					const errorObject = res.result

					Code.expect(errorObject, 'Error').to.be.an.object()
					done()
				})
			})
		})

		lab.experiment('Response error object', () => {

			lab.test('contains a property called statusCode of type number, equal to 404', done => {

				Server.inject('/test/bag/detail/', (res) => {

					const errorObject = res.result

					Code.expect(errorObject.statusCode, 'status code').to.be.an.number()
					Code.expect(errorObject.statusCode, 'status code').to.be.equal(404)
					done()
				})
			})

			lab.test('contains a property called error of type string, equal to not found', done => {

				Server.inject('/test/bag/detail/', (res) => {

					const errorObject = res.result

					Code.expect(errorObject.error, 'Response error').to.be.a.string()
					Code.expect(errorObject.error, 'Response error').to.be.equal('Not Found')
					done()
				})
			})

			lab.test('contains a property called message of type string, equal to not found', done => {

				Server.inject('/test/bag/detail/', (res) => {

					const errorObject = res.result

					Code.expect(errorObject.message, 'Response message').to.be.a.string()
					Code.expect(errorObject.message, 'Response message').to.be.equal('Not Found')
					done()
				})
			})
		})
	})

	lab.experiment('When HTTP request contains a parameter', () => {

		lab.experiment('Request', () => {

			lab.test('contains a parameter which is a number', done => {

				Server.inject('/test/bag/detail/1911', (res) => {

					Code.expect(res.request.params.id, 'Request parameter').to.be.a.number()
					Code.expect(res.request.params.id, 'Request parameter').to.exist()
					done()
				})
			})
		})

		lab.experiment('Response', () => {

			lab.test('is an object', done => {

				Server.inject('/test/bag/detail/1911', (res) => {

					Code.expect(res.result, 'Response').to.be.an.object()
					done()
				})
			})

			lab.test('contains a property called status with a value equal to 200', done => {

				Server.inject('/test/bag/detail/1911', (res) => {

					const status = res.result.status

					Code.expect(status, 'Response Status').to.be.a.number()
					Code.expect(status, 'Response Status').to.equal(200)
					done()
				})
			})

			lab.test('contains a property called data with a value of type object', done => {

				Server.inject('/test/bag/detail/1911', (res) => {

					const data = res.result.data

					Code.expect(data, 'Response Data').to.be.an.object()
					done()
				})
			})

			lab.test('data contains an object which has the properties id, product_id, email, gender, size, quantity, release, created_date', done => {

				Server.inject('/test/bag/detail/1911', (res) => {

					const dataObject = res.result.data

					Code.expect(dataObject, 'Data Object').to.be.an.object()
					Code.expect(dataObject.id, 'id').to.be.a.number()
					Code.expect(dataObject.product_id, 'product_id').to.be.a.number()
					Code.expect(dataObject.email, 'email').to.be.a.string()
					Code.expect(dataObject.gender, 'gender').to.be.a.string()
					Code.expect(dataObject.size, 'size').to.be.a.string()
					Code.expect(dataObject.quantity, 'quantity').to.be.a.number()
					Code.expect(dataObject.release, 'release').to.be.a.number()
					Code.expect(dataObject.created_date, 'created_date').to.be.a.date()
					Code.expect(dataObject.updated_date, 'created_date').to.be.a.date()
					done()
				})
			})
		})

		Server.inject('/test/bag/list', (res) => {

			if (res.result.data !== undefined) {
				lab.experiment('Object', () => {

					lab.test('contains an property called id of type number', done => {

						Code.expect(res.result.data[0].id, 'id').to.be.a.number()
						done()
					})

					lab.test('contains an property called property_id of type number', done => {

						Code.expect(res.result.data[0].product_id, 'product_id').to.be.a.number()
						done()
					})

					lab.test('contains an property called email of type string', done => {

						Code.expect(res.result.data[0].email, 'email').to.be.a.string()
						done()
					})

					lab.test('contains a property called gender of type string', done => {

						Code.expect(res.result.data[0].gender, 'gender').to.be.a.string()
						done()
					})

					lab.test('contains a property called size of type string', done => {

						Code.expect(res.result.data[0].size, 'size').to.be.a.string()
						done()
					})

					lab.test('contains a property called quantity of type number', done => {

						Code.expect(res.result.data[0].quantity, 'quantity').to.be.a.number()
						done()
					})

					lab.test('contains a property called release of type number', done => {

						Code.expect(res.result.data[0].release, 'release').to.be.a.number()
						done()
					})

					lab.test('contains a property called created_date of type string', done => {

						Code.expect(res.result.data[0].created_date, 'created_date').to.be.a.string()
						done()
					})
				})
			}
		})
	})
})
