'use strict'
const Bags = require('../api').Bags,
	Inventory = require('../api').Inventory,
	Orders = require('../api').Orders,
	Products = require('../api').Products,
	Handlers = {
		Home: (request, reply) => reply('Welcome to Droog'),
		Bag: {
			List: (request, reply) => reply('Not yet implemented'),
			Get: (request, reply) => reply('Not yet implemented'),
			Upsert: (request, reply) => reply('Not yet implemented'),
			Delete: (request, reply) => reply('Not yet implemented')
		},
		Inventory: {

			List: (request, reply) => Inventory.findAll()
				.then((data) => reply({ status: 200, data }))
				.catch({ status: 500, data: [] })
		},
		Order: {
			List: (request, reply) => reply('Not yet implemented'),
			Get: (request, reply) => reply('Not yet implemented'),
			Upsert: (request, reply) => reply('Not yet implemented'),
			Delete: (request, reply) => reply('Not yet implemented')
		},
		Product: {

			List: (request, reply) => Products.findAll()
				.then((data) => reply({ status: 200, data }))
				.catch({ status: 500, data: [] })
		}
	}

module.exports = {
	Handlers
}
