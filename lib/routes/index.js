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
					description: 'Select a bag list',
					notes: 'Fetches a list of bags',
					tags: ['api']
				}
			},
			{
				method: 'GET',
				path: '/bag/detail/{id}',
				config: {
					handler: Handlers.Bag.Detail,
					description: 'Select a bag detail',
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
					tags: ['api'],
					validate: {
						params: {
							id: Joi.number().min(1).max(9999).required()
						}
					}
				}
			}
		],
		Inventory: [
			{
				method: 'GET',
				path: '/inventory/list',
				config: {
					handler: Handlers.Inventory.List,
					description: 'Select an inventory item list',
					notes: 'Fetches a list of inventory',
					tags: ['api']
				}
			},
			{
				method: 'GET',
				path: '/inventory/detail/{id}',
				config: {
					handler: Handlers.Inventory.Detail,
					description: 'Select an inventory item detail',
					notes: 'Fetches an existing order',
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
				path: '/inventory/upsert',
				config: {
					handler: Handlers.Inventory.Upsert,
					description: 'Insert or update a new or existing inventory item',
					notes: 'Inserts or updates a new or existing inventory item',
					tags: ['api']
				}
			},
			{
				method: 'DELETE',
				path: '/inventory/delete',
				config: {
					handler: Handlers.Inventory.Delete,
					description: 'Deletes an inventory item',
					notes: 'Deletes an existing inventory item by the id parameter',
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
					description: 'Select an order list',
					notes: 'Fetches a list of orders',
					tags: ['api']
				}
			},
			{
				method: 'GET',
				path: '/order/detail/{id}',
				config: {
					handler: Handlers.Order.Detail,
					description: 'Select an order detail',
					notes: 'Fetches an existing order',
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
				path: '/order/upsert',
				config: {
					handler: Handlers.Order.Upsert,
					description: 'Insert or update a new or existing order',
					notes: 'Fetches a list of orders',
					tags: ['api']
				}
			},
			{
				method: 'DELETE',
				path: '/order/delete/{id}',
				config: {
					handler: Handlers.Order.Delete,
					description: 'Get an order list',
					notes: 'Deletes an existing order by the id parameter',
					tags: ['api'],
					validate: {
						params: {
							id: Joi.number().min(1).max(9999).required()
						}
					}
				}
			}
		],
		Products: [
			{
				method: 'GET',
				path: '/product/list',
				config: {
					handler: Handlers.Product.List,
					description: 'Select a product list',
					notes: 'Fetches a list of products',
					tags: ['api']
				}
			},
			{
				method: 'GET',
				path: '/product/detail/{id}',
				config: {
					handler: Handlers.Product.Detail,
					description: 'Select an order detail',
					notes: 'Fetches an existing order',
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
				path: '/product/upsert',
				config: {
					handler: Handlers.Product.Upsert,
					description: 'Insert or update a product',
					notes: 'Inserts or updates a new or existing product',
					tags: ['api']
				}
			},
			{
				method: 'DELETE',
				path: '/product/delete/{id}',
				config: {
					handler: Handlers.Product.Delete,
					description: 'Deletes a product',
					notes: 'Deletes an existing product by the id parameter',
					tags: ['api'],
					validate: {
						params: {
							id: Joi.number().min(1).max(9999).required()
						}
					}
				}
			}
		]
	}

module.exports = {
	Routes
}
