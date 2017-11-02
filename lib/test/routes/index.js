'use strict'

const Joi = require('joi'),
	Handlers = require('../../handlers').Handlers,
	Routes = {
		Addresses: [
			{
				method: 'GET',
				path: '/test/address/list',
				config: {
					handler: Handlers.Address.List,
					description: 'Select an address list',
					notes: 'Fetches a list of addresses',
					tags: ['api']
				}
			},
			{
				method: 'GET',
				path: '/test/address/detail/{id}',
				config: {
					handler: Handlers.Address.Detail,
					description: 'Select an address detail',
					notes: 'Fetches an existing address detail',
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
				path: '/test/address/upsert',
				config: {
					handler: Handlers.Address.Upsert,
					description: 'Insert or update an address',
					notes: 'Insert or update a new or existing address',
					tags: ['api'],
					validate: {
						payload: {
							id: Joi.number().required(),
							email: Joi.string().required(),
							phone: Joi.string().required(),
							address1: Joi.string().required(),
							address2: Joi.string(),
							city: Joi.string().required(),
							state: Joi.string().required(),
							zip: Joi.string().required(),
							is_billing: Joi.boolean().required(),
							is_shipping: Joi.boolean().required()
						}
					},
					plugins: {
						'hapi-swagger': {
							payloadType: 'form'
						}
					}
				}
			},
			{
				method: 'DELETE',
				path: '/test/address/delete/{id}',
				config: {
					handler: Handlers.Address.Delete,
					description: 'Delete an address',
					notes: 'Deletes an existing address by the id parameter',
					tags: ['api'],
					validate: {
						params: {
							id: Joi.number().min(1).max(9999).required()
						}
					}
				}
			}
		],
		Bags: [
			{
				method: 'GET',
				path: '/test/bag/list',
				config: {
					handler: Handlers.Bag.List,
					description: 'Select a bag list',
					notes: 'Fetches a list of bags',
					tags: ['api']
				}
			},
			{
				method: 'GET',
				path: '/test/bag/detail/{id}',
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
				path: '/test/bag/upsert',
				config: {
					handler: Handlers.Bag.Upsert,
					description: 'Insert or update a bag',
					notes: 'Inserts or updates an existing bag',
					tags: ['api'],
					validate: {
						payload: {
							id: Joi.number().required(),
							product_id: Joi.number().required(),
							email: Joi.string().required(),
							gender: Joi.string().required(),
							size: Joi.string().required(),
							quantity: Joi.string(),
							release: Joi.number().required()
						}
					},
					plugins: {
						'hapi-swagger': {
							payloadType: 'form'
						}
					}
				}
			},
			{
				method: 'DELETE',
				path: '/test/bag/delete/{id}',
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
		Contacts: [
			{
				method: 'GET',
				path: '/test/contact/list',
				config: {
					handler: Handlers.Contact.List,
					description: 'Select a contact list',
					notes: 'Fetches a list of contacts',
					tags: ['api']
				}
			},
			{
				method: 'GET',
				path: '/test/contact/detail/{id}',
				config: {
					handler: Handlers.Contact.Detail,
					description: 'Select an contact detail',
					notes: 'Fetches an existing contact detail',
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
				path: '/test/contact/upsert',
				config: {
					handler: Handlers.Contact.Upsert,
					description: 'Insert or update a contact',
					notes: 'Insert or update a new or existing contact',
					tags: ['api'],
					validate: {
						payload: {
							id: Joi.number().required(),
							email: Joi.string().required(),
							reason: Joi.string().required(),
							comments: Joi.string().required()
						}
					},
					plugins: {
						'hapi-swagger': {
							payloadType: 'form'
						}
					}
				}
			},
			{
				method: 'DELETE',
				path: '/test/contact/delete/{id}',
				config: {
					handler: Handlers.Contact.Delete,
					description: 'Delete a contact',
					notes: 'Deletes an existing contact by the id parameter',
					tags: ['api'],
					validate: {
						params: {
							id: Joi.number().min(1).max(9999).required()
						}
					}
				}
			}
		],
		Customers: [
			{
				method: 'GET',
				path: '/test/customer/list',
				config: {
					handler: Handlers.Customer.List,
					description: 'Select a customer list',
					notes: 'Fetches a list of customers',
					tags: ['api']
				}
			},
			{
				method: 'GET',
				path: '/test/customer/detail/{id}',
				config: {
					handler: Handlers.Customer.Detail,
					description: 'Select an customer detail',
					notes: 'Fetches an existing customer detail',
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
				path: '/test/customer/upsert',
				config: {
					handler: Handlers.Customer.Upsert,
					description: 'Insert or update a customer',
					notes: 'Insert or update a new or existing customer',
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
				path: '/test/customer/delete/{id}',
				config: {
					handler: Handlers.Customer.Delete,
					description: 'Delete a customer',
					notes: 'Deletes an existing customer by the id parameter',
					tags: ['api'],
					validate: {
						params: {
							id: Joi.number().min(1).max(9999).required()
						}
					}
				}
			}
		],
		Documentation: [
			{
				method: 'GET',
				path: '/test/documentation',
				config: {
					handler: Handlers.Documentation
				}
			}
		],
		Files: [
			{
				method: 'GET',
				path: '/test/assets/{file*}',
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
				path: '/test',
				config: {
					handler: Handlers.Home,
					description: 'Get Droog API home page',
					notes: 'Returns the API\'s home page with logo and link to documentation',
					tags: ['api']
				}
			}
		],
		Inventory: [
			{
				method: 'GET',
				path: '/test/inventory/list',
				config: {
					handler: Handlers.Inventory.List,
					description: 'Select an inventory item list',
					notes: 'Fetches a list of inventory',
					tags: ['api']
				}
			},
			{
				method: 'GET',
				path: '/test/inventory/detail/{id}',
				config: {
					handler: Handlers.Inventory.Detail,
					description: 'Select an inventory item detail',
					notes: 'Fetches an existing inventory item detail by id',
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
				path: '/test/inventory/upsert',
				config: {
					handler: Handlers.Inventory.Upsert,
					description: 'Insert or update a new or existing inventory item',
					notes: 'Inserts or updates a new or existing inventory item',
					tags: ['api'],
					validate: {
						payload: {
							id: Joi.string().required(),
							product_id: Joi.string().required(),
							size: Joi.string().required(),
							color: Joi.string().required(),
							sex: Joi.string().required(),
							quantity: Joi.number().required(),
							release: Joi.number().required()
						}
					},
					plugins: {
						'hapi-swagger': {
							payloadType: 'form'
						}
					}
				}
			},
			{
				method: 'DELETE',
				path: '/test/inventory/delete',
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
				path: '/test/order/list',
				config: {
					handler: Handlers.Order.List,
					description: 'Select an order list',
					notes: 'Fetches a list of orders',
					tags: ['api']
				}
			},
			{
				method: 'GET',
				path: '/test/order/detail/{id}',
				config: {
					handler: Handlers.Order.Detail,
					description: 'Select an order detail',
					notes: 'Fetches an existing order by id',
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
				path: '/test/order/upsert',
				config: {
					handler: Handlers.Order.Upsert,
					description: 'Insert or update a new or existing order',
					notes: 'Inserts or updates an existing order',
					tags: ['api'],
					validate: {
						payload: {
							id: Joi.number().required(),
							email: Joi.string().required()
						}
					},
					plugins: {
						'hapi-swagger': {
							payloadType: 'form'
						}
					}
				}
			},
			{
				method: 'DELETE',
				path: '/test/order/delete/{id}',
				config: {
					handler: Handlers.Order.Delete,
					description: 'Deletes an order',
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
		Preorders: [
			{
				method: 'GET',
				path: '/test/preorder/list',
				config: {
					handler: Handlers.Preorder.List,
					description: 'Select a preorder list',
					notes: 'Fetches a list of preorders',
					tags: ['api']
				}
			},
			{
				method: 'GET',
				path: '/test/preorder/detail/{id}',
				config: {
					handler: Handlers.Preorder.Detail,
					description: 'Select an preorder detail',
					notes: 'Fetches an existing preorder detail',
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
				path: '/test/preorder/upsert',
				config: {
					handler: Handlers.Preorder.Upsert,
					description: 'Insert or update a preorder',
					notes: 'Insert or update a new or existing preorder',
					tags: ['api'],
					validate: {
						payload: {
							id: Joi.number().required(),
							email: Joi.string().required(),
							preorder: Joi.string().required(),
							size: Joi.string().required(),
							reason: Joi.string().required(),
							release: Joi.number().required()
						}
					},
					plugins: {
						'hapi-swagger': {
							payloadType: 'form'
						}
					}
				}
			},
			{
				method: 'DELETE',
				path: '/test/preorder/delete/{id}',
				config: {
					handler: Handlers.Preorder.Delete,
					description: 'Delete a preorder',
					notes: 'Deletes an existing preorder by the id parameter',
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
				path: '/test/product/list',
				config: {
					handler: Handlers.Product.List,
					description: 'Select a product list',
					notes: 'Fetches a list of products',
					tags: ['api']
				}
			},
			{
				method: 'GET',
				path: '/test/product/detail/{id}',
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
				path: '/test/product/upsert',
				config: {
					handler: Handlers.Product.Upsert,
					description: 'Insert or update a product',
					notes: 'Inserts or updates a new or existing product',
					tags: ['api'],
					validate: {
						payload: {
							id: Joi.string().required(),
							name: Joi.string().required(),
							details: Joi.string().required(),
							price: Joi.number().required(),
							release: Joi.number().required()
						}
					},
					plugins: {
						'hapi-swagger': {
							payloadType: 'form'
						}
					}
				}
			},
			{
				method: 'DELETE',
				path: '/test/product/delete/{id}',
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
