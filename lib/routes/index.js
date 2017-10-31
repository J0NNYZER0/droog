'use strict'

const Joi = require('joi'),
	Handlers = require('../handlers').Handlers,
	Routes = {
		Files: [
			{
				method: 'GET',
				path: '/assets/{file*}',
				handler: {
					directory: {
						path: __dirname + '../../assets'
					}
				}
			}
		],
		Home: [
			{
				method: 'GET',
				path: '/',
				config: {
					handler: Handlers.Home,
					description: 'Get Droog API home page',
					notes: 'Returns the API\'s home page with logo and link to documentation',
					tags: ['api']
				}
			}
		],
		Documentation: [
			{
				method: 'GET',
				path: '/documentation',
				config: {
					handler: Handlers.Documentation
				}
			}
		],
		Bags: [
			{
				method: 'GET',
				path: '/bag/list',
				config: {
					handler: Handlers.Bag.List,
					description: 'Get a bag list',
					notes: 'Fetches a list of bags',
					tags: ['api']
				}
			},
			{
				method: 'GET',
				path: '/bag/{id}',
				config: {
					handler: Handlers.Bag.Get,
					description: 'Get a bag detail',
					notes: 'Fetches an existing bag by the id parameter',
					tags: ['api'],
					validate: {
						params: {
							id: Joi.number().min(1).max(9999).required()
						}
					}
				}
			},
			{
				method: 'POST',
				path: '/bag/upsert',
				config: {
					handler: Handlers.Bag.Upsert,
					description: 'Insert or update a bag',
					notes: 'Inserts or updates an existing bag',
					tags: ['api'],
					plugins: {
						'hapi-swagger': {
							payloadType: 'form'
						}
					}
				}
			},
			{
				method: 'DELETE',
				path: '/bag/delete/{id}',
				config: {
					handler: Handlers.Bag.Delete,
					description: 'Delete a bag',
					notes: 'Deletes an existing bag by the id parameter',
					tags: ['api']
				}
			}
		],
		Inventory: [
			{
				method: 'GET',
				path: '/inventory/list',
				config: {
					handler: Handlers.Inventory.List,
					description: 'Get an inventory list',
					notes: 'Fetches a list of inventory',
					tags: ['api']
				}
			}
		],
		Orders: [
			{
				method: 'GET',
				path: '/order/list',
				config: {
					handler: Handlers.Order.List,
					description: 'Get an order list',
					notes: 'Fetches a list of orders',
					tags: ['api']
				}
			},
			{
				method: 'GET',
				path: '/order/{id}',
				config: {
					handler: Handlers.Order.Get,
					description: 'Get an order detail',
					notes: 'Fetches an existing order',
					tags: ['api']
				}
			},
			{
				method: 'POST',
				path: '/order/upsert',
				config: {
					handler: Handlers.Order.Upsert,
					description: 'Insert or update an order',
					notes: 'Fetches a list of orders',
					tags: ['api']
				}
			},
			{
				method: 'DELETE',
				path: '/order/delete',
				config: {
					handler: Handlers.Order.Delete,
					description: 'Get an order list',
					notes: 'Deletes an existing order by the id parameter',
					tags: ['api']
				}
			}
		],
		Products: [
			{
				method: 'GET',
				path: '/product/list',
				config: {
					handler: Handlers.Product.List,
					description: 'Get a product list',
					notes: 'Fetches a list of products',
					tags: ['api']
				}
			}
		]
	}

module.exports = {
	Routes
}
