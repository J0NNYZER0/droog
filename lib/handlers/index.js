'use strict'

const Boom = require('boom'),
	Bcrypt = require('bcrypt'),
	Accounts = require('../api').Accounts,
	AccountsRoles = require('../api').AccountsRoles,
	Addresses = require('../api').Addresses,
	Bags = require('../api').Bags,
	BagItems = require('../api').Bags,
	Contacts = require('../api').Contacts,
	Customers = require('../api').Customers,
	CustomersOrders = require('../api').CustomersOrders,
	Inventory = require('../api').Inventory,
	OrderStatus = require('../api').OrderStatus,
	Orders = require('../api').Orders,
	Payments = require('../api').Payments,
	Products = require('../api').Products,
	Roles = require('../api').Roles,
	PackageJson = require('../../package.json'),
	Utils = require('../utils'),
	Handlers = {
		Droog: {
			Login: (request, reply) => {

				if (request.auth.isAuthenticated) {

					return reply.redirect('/')
				}

				let message = null,
					sid = null

				if (!request.payload.username ||
					!request.payload.password) {

					message = 'Missing username or password!'
				}
				else {

					Accounts.findOne({
						where: {
							username: request.payload.username
						},
						include: [ { model: Roles, as: 'scope' } ]
					})
					.then(data => (data ? Object.assign({}, data.dataValues, { scope: data.dataValues.scope.map(el => el.role) }) : null))
					.then(data => {

						if (!data ||
							!Bcrypt.compareSync(request.payload.password, data.password)) {

							message = 'Invalid username or password!'
						}

						if (!message) {

							sid = String(++data.id)
							request.server.app.cache.set(sid, { account: data }, 0, (err) => {

								if (err) {
										reply(err)
								}

								request.cookieAuth.set({ sid: sid })
								return reply.redirect('/')
							})
						}
						else {
							return reply.view('login', {
								api: 'Droog API ',
								message: message,
								version: PackageJson.version
							}, { layout: 'layout/login' })
						}
					})
					.catch(err => reply(Boom.badImplementation('Something went wrong!')))
				}
			},
			Logout: (request, reply) => {
				request.cookieAuth.clear()
				return reply.redirect('/login')
			}
		},
		Account: {
			List: (request, reply) => {

				return Accounts.findAll({
					include: [ { model: Roles, as: 'scope' } ]
				})
					.then(data => reply({
						status: 200,
						data: data.map(d => Object.assign(
							{},
							d.dataValues,
							{ scope: d.dataValues.scope.map(e => e.role) }
						))
					}))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			},
			Detail: (request, reply) => {

				return Accounts.findOne({
					where: { id: request.params.id },
					include: [ { model: Roles, as: 'scope' } ]
				})
					.then(data => Object.assign({}, data.dataValues, { scope: data.dataValues.scope.map(el => el.role) }))
					.then(data => reply({ status: 200, data }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			},
			Insert: (request, reply) => {
				Accounts.findOrCreate({
						where: {
							username: request.payload.username
						},
						defaults: Object.assign(
							request.payload,
							{
								id: '',
								password: Bcrypt.hashSync(request.payload.password, 10)
							}),
						raw: true
					})
					.then(created => {
						if (created[0].alreadyThere !== undefined)
							reply(Boom.conflict('Something went wrong!'))
						else reply({ status: 200, created })
					})
					.catch(err => {

						return reply(Boom.badImplementation('Something went wrong!'))})
			},
			Update: (request, reply) => {

				return Accounts.update(request.payload, { where: { id: request.payload.id }})
					.then(created => reply({ status: 200, created }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			},
			Delete: (request, reply) => {

				return Accounts.destroy({ where: { id: request.params.id } })
					.then(affected => reply({ status: 200, affected }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			},
			Login: (request, reply) => {

				if (request.auth.isAuthenticated) {

					return reply(Boom.unauthorized('Unauthorized'))
				}

				let message = null,
					sid = null

				if (!request.payload.username ||
					!request.payload.password) {

					message = 'Missing username or password!'
				}
				else {

					Accounts.findOne({
						where: {
							username: request.payload.username
						},
						include: [ { model: Roles, as: 'scope' } ]
					})
					.then(data => (data ? Object.assign({}, data.dataValues, { scope: data.dataValues.scope.map(el => el.role) }) : null))
					.then(data => {

						if (!data ||
							!Bcrypt.compareSync(request.payload.password, data.password)) {

							message = 'Invalid username or password!'
						}

						if (!message) {

							sid = String(++data.id)
							request.server.app.cache.set(sid, { account: data }, 0, (err) => {

								if (err) {
										reply(err)
								}

								request.cookieAuth.set({ sid: sid })
								return reply({
									id: 0,
						     	username: 'mind-ctrl',
									scope: [ 'public' ]
								})
							})
						}
					})
					.catch(err => reply(Boom.badImplementation('Something went wrong!')))
				}
			},
			Logout: (request, reply) => {
				request.cookieAuth.clear()
				return reply.redirect('/login')
			}
		},
		Address: {
			List: (request, reply) => {

				return Addresses.findAll()
					.then(data => reply({ status: 200, data }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			},
			Detail: (request, reply) => {

				return Addresses.findOne({ where: { id: request.params.id } })
					.then(data => reply({ status: 200, data }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			},
			Insert: (request, reply) => {

				return Addresses.create(request.payload)
					.then(created => reply({ status: 200, created }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			},
			Update: (request, reply) => {

				return Addresses.update(request.payload, { where: { id: request.payload.id }})
					.then(created => reply({ status: 200, created }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			},
			Delete: (request, reply) => {

				return Addresses.destroy({ where: { id: request.params.id } })
					.then(affected => reply({ status: 200, affected }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			}
		},
		Bag: {
			List: (request, reply) => {

				return Bags.findAll()
					.then(data => reply({ status: 200, data }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			},
			Detail: (request, reply) => {

				return Bags.findOne({ where: { id: request.params.id } })
					.then(data => reply({ status: 200, data }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			},
			Insert: (request, reply) => {
				return Bags.create({...request.payload, bag_items: [{
					bag_
				}]}, {
					include: [{
						include: [ Bags.BagItems ]
					}]
				})
					.then(created => {
						console.log('created', created)
						reply({ status: 200, created })
					})
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			},
			Update: (request, reply) => {

				return Bags.update(request.payload, { where: { id: request.payload.id }})
					.then(created => reply({ status: 200, created }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			},
			Delete: (request, reply) => {

				return Bags.destroy({ where: { id: request.params.id } })
					.then(affected => reply({ status: 200, affected }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			}
		},
		BagItem: {
			List: (request, reply) => {

				return BagItems.findAll()
					.then(data => reply({ status: 200, data }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			},
			Detail: (request, reply) => {

				return BagItems.findOne({ where: { id: request.params.id } })
					.then(data => reply({ status: 200, data }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			},
			Insert: (request, reply) => {

				return BagItems.create(request.payload)
					.then(created => reply({ status: 200, created }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			},
			Update: (request, reply) => {

				return BagItems.update(request.payload, { where: { id: request.payload.id }})
					.then(created => reply({ status: 200, created }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			},
			Delete: (request, reply) => {

				return BagItems.destroy({ where: { id: request.params.id } })
					.then(affected => reply({ status: 200, affected }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			}
		},
		Contact: {
			List: (request, reply) => {

				return Contacts.findAll()
					.then(data => reply({ status: 200, data }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			},
			Detail: (request, reply) => {

				return Contacts.findOne({ where: { id: request.params.id } })
					.then(data => reply({ status: 200, data }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			},
			Insert: (request, reply) => {

				return Contacts.create(request.payload)
					.then(created => reply({ status: 200, created }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			},
			Delete: (request, reply) => {

				return Contacts.destroy({ where: { id: request.params.id } })
					.then(affected => reply({ status: 200, affected }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			}
		},
		Customer: {
			List: (request, reply) => {

				return Customers.findAll()
					.then(data => reply({ status: 200, data }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			},
			Detail: (request, reply) => {

				return Customers.findOne({ where: { id: request.params.id } })
					.then(data => reply({ status: 200, data }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			},
			Insert: (request, reply) => {

				return Customers.create(request.payload)
					.then(created => reply({ status: 200, created }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			},
			Update: (request, reply) => {

				return Customers.update(request.payload, { where: { id: request.payload.id }})
					.then(created => reply({ status: 200, created }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			},
			Delete: (request, reply) => {

				return Customers.destroy({ where: { id: request.params.id } })
					.then(affected => reply({ status: 200, affected }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			}
		},
		CustomerOrder: {
			List: (request, reply) => {

				return CustomersOrders.findAll()
					.then(data => reply({ status: 200, data }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			},
			Detail: (request, reply) => {

				return CustomersOrders.findOne({ where: { id: request.params.id } })
					.then(data => reply({ status: 200, data }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			},
			Insert: (request, reply) => {

				return CustomerOrders.create(request.payload)
					.then(created => reply({ status: 200, created }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			},
			Update: (request, reply) => {

				return CustomerOrders.update(request.payload, { where: { id: request.payload.id }})
					.then(created => reply({ status: 200, created }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			},
			Delete: (request, reply) => {

				return CustomersOrders.destroy({ where: { id: request.params.id } })
					.then(affected => reply({ status: 200, affected }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			}
		},
		Inventory: {
			List: (request, reply) => {

				return Inventory.findAll()
					.then(data => reply({ status: 200, data }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			},
			Detail: (request, reply) => {

				return Inventory.findOne({ where: { id: request.params.id } })
					.then(data => reply({ status: 200, data }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			},
			Insert: (request, reply) => {

				return Inventory.create(request.payload)
					.then(created => reply({ status: 200, created }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			},
			Update: (request, reply) => {

				return Inventory.update(request.payload, { where: { id: request.payload.id }})
					.then(created => reply({ status: 200, created }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			},
			Delete: (request, reply) => {

				return Inventory.destroy({ where: { id: request.params.id } })
					.then(affected => reply({ status: 200, affected }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			}
		},
		OrderStatus: {
			List: (request, reply) => {

				return OrderStatus.findAll()
					.then(data => reply({ status: 200, data }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			},
			Detail: (request, reply) => {

				return OrderStatus.findOne({ where: { id: request.params.id } })
					.then(data => reply({ status: 200, data }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			},
			Insert: (request, reply) => {

				return OrderStatus.create(request.payload)
					.then(created => reply({ status: 200, created }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			},
			Update: (request, reply) => {

				return OrderStatus.update(request.payload, { where: { id: request.payload.id }})
					.then(created => reply({ status: 200, created }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			},
			Delete: (request, reply) => {

				return OrderStatus.destroy({ where: { id: request.params.id } })
					.then(affected => reply({ status: 200, affected }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			}
		},
		Order: {
			List: (request, reply) => {

				return Orders.findAll()
					.then(data => reply({ status: 200, data }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			},
			Detail: (request, reply) => {

				return Orders.findOne({ where: { id: request.params.id } })
					.then(data => reply({ status: 200, data }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			},
			Insert: (request, reply) => {

				return Orders.create(request.payload)
					.then(created => reply({ status: 200, created }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			},
			Update: (request, reply) => {

				return Orders.update(request.payload, { where: { id: request.payload.id }})
					.then(created => reply({ status: 200, created }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			},
			Delete: (request, reply) => {

				return Orders.destroy({ where: { id: request.params.id } })
					.then(affected => reply({ status: 200, affected }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			},
			History: {
				List: (request, reply) => {

					return Orders.findAll({ where: { id: request.params.id } })
						.then(data => reply({ status: 200, data }))
						.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
				}
			}
		},
		Payment: {
			List: (request, reply) => {

				return Payments.findAll()
					.then(data => reply({ status: 200, data }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			},
			Detail: (request, reply) => {

				return Payments.findOne({ where: { id: request.params.id } })
					.then(data => reply({ status: 200, data }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			},
			Insert: (request, reply) => {

				return Payments.create(request.payload)
					.then(created => reply({ status: 200, created }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			},
			Update: (request, reply) => {

				return Payments.update(request.payload, { where: { id: request.payload.id }})
					.then(created => reply({ status: 200, created }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			},
			Delete: (request, reply) => {

				return Payments.destroy({ where: { id: request.params.id } })
					.then(affected => reply({ status: 200, affected }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			}
		},
		Product: {
			List: (request, reply) => {

				return Products.findAll()
					.then(data => reply({ status: 200, data }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			},
			Detail: (request, reply) => {

				return Products.findOne({ where: { id: request.params.id } })
					.then(data => reply({ status: 200, data }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			},
			Insert: (request, reply) => {

				return Products.create(request.payload)
					.then(created => reply({ status: 200, created }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			},
			Update: (request, reply) => {

				return Products.update(request.payload, { where: { id: request.payload.id }})
					.then(created => reply({ status: 200, created }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			},
			Delete: (request, reply) => {

				return Products.destroy({ where: { id: request.params.id } })
					.then(affected => reply({ status: 200, affected }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			}
		},
		Views: {
			Login: (request, reply) => {

				if (request.auth.isAuthenticated) {

					return reply.redirect('/')
				}

				return reply.view('login', {
					api: 'Droog API ',
					message: '',
					version: PackageJson.version
				}, { layout: 'layout/login' })
			},
			Documentation: (request, reply) => reply.view('documentation/custom', {
				title: 'Welcome to Droog Docs ',
				api: 'Droog API',
				copyright_year: (new Date()).getFullYear(),
				version: PackageJson.version
			}, { layout: 'layout/documentation' }),
			Home: (request, reply) => {

				reply.view('home', {
					title: 'Droog API v' + PackageJson.version,
					username: request.auth.credentials.username,
					message: 'Welcome to Droog',
					description: 'A simple framework for managing a simple store',
					buttonText: 'API documentation',
					mailButtonText: 'hello@droogapi.com',
					version: PackageJson.version
				}, { layout: 'layout/home' })
					.header('DroogAuth', request.headers.authorization)
			}
		}
	}

module.exports = {
	Handlers
}
