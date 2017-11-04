'use strict'
const Addresses = require('../api').Addresses,
	Bags = require('../api').Bags,
	Contacts = require('../api').Contacts,
	Inventory = require('../api').Inventory,
	Orders = require('../api').Orders,
	Preorders = require('../api').Preorders,
	Products = require('../api').Products,
	PackageJson = require('../../package.json'),
	Utils = require('../utils'),
	Handlers = {
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
			Upsert: (request, reply) => {

				return Addresses.upsert(request.payload)
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
			Upsert: (request, reply) => {

				return Bags.upsert(request.payload)
					.then(created => reply({ status: 200, created }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			},
			Delete: (request, reply) => {

				return Bags.destroy({ where: { id: request.params.id } })
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
			Upsert: (request, reply) => {

				return Contacts.upsert(Object.assign(request.payload, { updated_date: Utils.CreateTimestamp }))
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

			List: (request, reply) => reply('Not yet implemented'),
			Detail: (request, reply) => reply('Not yet implemented'),
			Upsert: (request, reply) => reply('Not yet implemented'),
			Delete: (request, reply) => reply('Not yet implemented')
		},
		Documentation: (request, reply) => reply.view('documentation/custom', {
			title: 'Welcome to Droog Docs ',
			api: 'Droog API',
			copyright_year: (new Date()).getFullYear(),
			version: PackageJson.version
		}, { layout: 'layout/layout2' }),
		Home: (request, reply) => reply.view('index', {
			title: 'Droog API v ' + PackageJson.version,
			api: 'Droog API',
			version: PackageJson.version
		}),
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
			Upsert: (request, reply) => {

				return Inventory.upsert(request.payload)
					.then(created => reply({ status: 200, created }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			},
			Delete: (request, reply) => {

				return Inventory.destroy({ where: { id: request.params.id } })
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
			Upsert: (request, reply) => {

				return Orders.upsert(request.payload)
					.then(created => reply({ status: 200, created }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			},
			Delete: (request, reply) => {

				return Orders.destroy({ where: { id: request.params.id } })
					.then(affected => reply({ status: 200, affected }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			}
		},
		Preorder: {
			List: (request, reply) => {

				return Preorders.findAll()
					.then(data => reply({ status: 200, data }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			},
			Detail: (request, reply) => {

				return Preorders.findOne({ where: { id: request.params.id } })
					.then(data => reply({ status: 200, data }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			},
			Upsert: (request, reply) => {

				return Preorders.upsert(request.payload)
					.then(created => reply({ status: 200, created }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			},
			Delete: (request, reply) => {

				return Preorders.destroy({ where: { id: request.params.id } })
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
			Upsert: (request, reply) => {

				return Products.upsert(request.payload)
					.then(created => reply({ status: 200, created }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			},
			Delete: (request, reply) => {

				return Products.destroy({ where: { id: request.params.id } })
					.then(affected => reply({ status: 200, affected }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			}
		}
	}

module.exports = {
	Handlers
}
