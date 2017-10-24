'use strict'

const Joi = require('joi'),
	Handlers = require('../../handlers').Handlers,
	Routes = {
		Home: [
			{
				method: 'GET',
				path: '/test',
				config: {
					handler: Handlers.Home
				}
			}
		],
		Bags: [
			{
				method: 'GET',
				path: '/test/bag/list',
				config: {
					handler: Handlers.Bag.List
				}
			},
			{
				method: 'GET',
				path: '/test/bag/{id}',
				config: {
					handler: Handlers.Bag.Get,
					validate: {
						params: {
							id: Joi.number().min(1).max(9999).required()
						}
					}
				}
			},
			{
				method: 'POST',
				path: '/test/bag/upsert',
				handler: Handlers.Bag.Upsert
			},
			{
				method: 'DELETE',
				path: '/test/bag/delete',
				handler: Handlers.Bag.Delete
			}
		],
		Inventory: [
			{
				method: 'GET',
				path: '/test/inventory/list',
				handler: Handlers.Inventory.List
			}
		],
		Orders: [
			{
				method: 'GET',
				path: '/test/order/list',
				handler: Handlers.Order.List
			},
			{
				method: 'GET',
				path: '/test/order/{id}',
				handler: Handlers.Order.Get
			},
			{
				method: 'POST',
				path: '/test/order/upsert',
				handler: Handlers.Order.Upsert
			},
			{
				method: 'DELETE',
				path: '/test/order/delete',
				handler: Handlers.Order.Delete
			}
		],
		Products: [
			{
				method: 'GET',
				path: '/test/product/list',
				handler: Handlers.Product.List
			}
		]
	}

module.exports = {
	Routes
}
