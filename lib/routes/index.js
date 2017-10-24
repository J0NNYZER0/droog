'use strict'

const Joi = require('joi'),
	Handlers = require('../handlers').Handlers,
	Routes = {
		Home: [
			{
				method: 'GET',
				path: '/',
				config: {
					handler: Handlers.Home,
					description: 'Home',
					notes: 'Returns the API\'s home page with a welcome message',
					tags: ['api']
				}
			}
		],
		Bags: [
			{
				method: 'GET',
				path: '/bag/list',
				config: {
					handler: Handlers.Bag.List,
					description: 'Bags List',
					notes: 'Returns a list of bags',
					tags: ['api']
				}
			},
			{
				method: 'GET',
				path: '/bag/{id}',
				config: {
					handler: Handlers.Bag.Get,
					description: 'Bag Detail',
					notes: 'Returns a detail of a bag',
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
				handler: Handlers.Bag.Upsert
			},
			{
				method: 'DELETE',
				path: '/bag/delete',
				handler: Handlers.Bag.Delete
			}
		],
		Inventory: [
			{
				method: 'GET',
				path: '/inventory/list',
				handler: Handlers.Inventory.List
			}
		],
		Orders: [
			{
				method: 'GET',
				path: '/order/list',
				handler: Handlers.Order.List
			},
			{
				method: 'GET',
				path: '/order/{id}',
				handler: Handlers.Order.Get
			},
			{
				method: 'POST',
				path: '/order/upsert',
				handler: Handlers.Order.Upsert
			},
			{
				method: 'DELETE',
				path: '/order/delete',
				handler: Handlers.Order.Delete
			}
		],
		Products: [
			{
				method: 'GET',
				path: '/product/list',
				handler: Handlers.Product.List
			}
		]
	}

module.exports = {
	Routes
}
