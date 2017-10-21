'use strict'
const Bags = require('../api').Bags,
	Inventory = require('../api').Inventory,
	Orders = require('../api').Orders,
	Products = require('../api').Products,
	Handlers = {
		Home: (request, reply) => reply('Welcome to Droog'),
		Bag: {
			List: (request, reply) => {

				return Bags.findAll()
					.then(data => reply({ status: 200, data }))
					.catch(err => reply({ status: 500, errorMessage: err, data: [] }))
			},
			Get: (request, reply) => reply('Not yet implemented'),
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
