'use strict'

const Joi = require('joi'),
	Handlers = require('../handlers').Handlers,
	Routes = {
		Home: [
			{
				method: 'GET',
				path: '/',
				handler: Handlers.Home
			}
		],
		Bags: [
			{
				method: 'GET',
				path: '/bag/list',
				handler: Handlers.Bag.List
			},
			{
				method: 'GET',
				path: '/bag/{id}',
				config: {
					validate: {
						params: {
							id: Joi.number().min(1).max(9999).required()
						}
					}
				},
				handler: Handlers.Bag.Get
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
