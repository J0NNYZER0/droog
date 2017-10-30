'use strict'
const Bags = require('../api').Bags,
	Inventory = require('../api').Inventory,
	Orders = require('../api').Orders,
	Products = require('../api').Products,
	PackageJson = require('../../package.json'),
	Handlers = {
		Home: (request, reply) => reply.view('index', {
			title: 'Welcome to Droog ',
			api: 'Droog API',
			version: PackageJson.version
		}),
		Documentation: (request, reply) => reply.view('documentation/custom', {
			title: 'Welcome to Droog Docs ',
			api: 'Droog API',
			version: PackageJson.version
		}, { layout: 'layout/layout2' }),
		Bag: {
			List: (request, reply) => {

				return Bags.findAll()
					.then(data => reply({ status: 200, data }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			},
			Get: (request, reply) => {

				return Bags.findOne({ where: { id: request.params.id } })
					.then(data => reply({ status: 200, data }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			},
			Upsert: (request, reply) => reply('Not yet implemented'),
			Delete: (request, reply) => reply('Not yet implemented')
		},
		Inventory: {

			List: (request, reply) => {

				return Inventory.findAll()
					.then(data => reply({ status: 200, data }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			}
		},
		Order: {
			List: (request, reply) => {

				return Orders.findAll()
					.then(data => reply({ status: 200, data }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			},
			Get: (request, reply) => reply('Not yet implemented'),
			Upsert: (request, reply) => reply('Not yet implemented'),
			Delete: (request, reply) => reply('Not yet implemented')
		},
		Product: {

			List: (request, reply) => {

				return Products.findAll()
					.then(data => reply({ status: 200, data }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			}
		}
	}

module.exports = {
	Handlers
}
