'use strict'

const Joi = require('joi'),
	Handlers = require('../handlers').Handlers,
	Routes = {
		Addresses: [
			// /address/list
			{
				method: 'GET',
				path: '/address/list',
				config: {
					handler: Handlers.Address.List,
					description: 'Select an address list',
					notes: 'Fetches a list of addresses',
					tags: ['api']
				}
			},
			// /address/detail/{id}'
			{
				method: 'GET',
				path: '/address/detail/{id}',
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
			// /address/upsert
			{
				method: 'POST',
				path: '/address/upsert',
				config: {
					handler: Handlers.Address.Upsert,
					description: 'Insert or update an address',
					notes: 'Insert or update a new or existing address',
					tags: ['api'],
					validate: {
						payload: {
							id: Joi.number().required(),
							customer_id: Joi.number().required(),
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
			// /address/delete/{id}
			{
				method: 'DELETE',
				path: '/address/delete/{id}',
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
			// /bag/list
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
			// /bag/detail/{id}
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
			// /bag/upsert
			{
				method: 'POST',
				path: '/bag/upsert',
				config: {
					handler: Handlers.Bag.Upsert,
					description: 'Insert or update a bag',
					notes: 'Inserts or updates an existing bag',
					tags: ['api'],
					validate: {
						payload: {
							id: Joi.number().required(),
							customer_id: Joi.number().required()
						}
					},
					plugins: {
						'hapi-swagger': {
							payloadType: 'form'
						}
					}
				}
			},
			// /bag/delete/{id}
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
		BagItems: [
			// /bag/item/list
			{
				method: 'GET',
				path: '/bag/item/list',
				config: {
					handler: Handlers.BagItem.List,
					description: 'Select a bag item list',
					notes: 'Fetches a list of bag items',
					tags: ['api']
				}
			},
			// /bag/item/detail/{id}
			{
				method: 'GET',
				path: '/bag/item/detail/{id}',
				config: {
					handler: Handlers.BagItem.Detail,
					description: 'Select a bag item detail',
					notes: 'Fetches an existing bag item by the id parameter',
					tags: ['api'],
					validate: {
						params: {
							id: Joi.number().min(1).max(9999).required()
						}
					}
				}
			},
			// /bag/item/upsert
			{
				method: 'POST',
				path: '/bag/item/upsert',
				config: {
					handler: Handlers.BagItem.Upsert,
					description: 'Insert or update a bag item',
					notes: 'Inserts or updates an existing bag item',
					tags: ['api'],
					validate: {
						payload: {
							id: Joi.number().required(),
							bag_id: Joi.number().required(),
							inventory_id: Joi.number().required(),
							quantity: Joi.number().required(),
							type: Joi.string().required()
						}
					},
					plugins: {
						'hapi-swagger': {
							payloadType: 'form'
						}
					}
				}
			},
			// /bag/item/delete/{id}
			{
				method: 'DELETE',
				path: '/bag/item/delete/{id}',
				config: {
					handler: Handlers.BagItem.Delete,
					description: 'Delete a bag item',
					notes: 'Deletes an existing bag item by the id parameter',
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
			// /contact/list
			{
				method: 'GET',
				path: '/contact/list',
				config: {
					handler: Handlers.Contact.List,
					description: 'Select a contact list',
					notes: 'Fetches a list of contacts',
					tags: ['api']
				}
			},
			// /contact/detail/{id}
			{
				method: 'GET',
				path: '/contact/detail/{id}',
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
			// /contact/upsert
			{
				method: 'POST',
				path: '/contact/upsert',
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
			// /contact/delete/{id}
			{
				method: 'DELETE',
				path: '/contact/delete/{id}',
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
			// /customer/list
			{
				method: 'GET',
				path: '/customer/list',
				config: {
					handler: Handlers.Customer.List,
					description: 'Select a customer list',
					notes: 'Fetches a list of customers',
					tags: ['api']
				}
			},
			// /customer/detail/{id}
			{
				method: 'GET',
				path: '/customer/detail/{id}',
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
			// /customer/upsert
			{
				method: 'POST',
				path: '/customer/upsert',
				config: {
					handler: Handlers.Customer.Upsert,
					description: 'Insert or update a customer',
					notes: 'Insert or update a new or existing customer',
					tags: ['api'],
					validate: {
						payload: {
							id: Joi.number().required(),
							user_id: Joi.number().required(),
							first_name: Joi.string().required(),
							last_name: Joi.string().required(),
							email: Joi.string().required(),
							phone: Joi.number().required()
						}
					},
					plugins: {
						'hapi-swagger': {
							payloadType: 'form'
						}
					}
				}
			},
			// /customer/delete/{id}
			{
				method: 'DELETE',
				path: '/customer/delete/{id}',
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
		CustomerOrders: [
			// /customer/order/list
			{
				method: 'GET',
				path: '/customer/order/list',
				config: {
					handler: Handlers.CustomerOrder.List,
					description: 'Select a customer list',
					notes: 'Fetches a list of customers',
					tags: ['api']
				}
			},
			// /customer/order/detail/{id}
			{
				method: 'GET',
				path: '/customer/order/detail/{id}',
				config: {
					handler: Handlers.CustomerOrder.Detail,
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
			// /customer/order/upsert
			{
				method: 'POST',
				path: '/customer/order/upsert',
				config: {
					handler: Handlers.CustomerOrder.Upsert,
					description: 'Insert or update a customer',
					notes: 'Insert or update a new or existing customer',
					tags: ['api'],
					validate: {
						payload: {
							id: Joi.number().required(),
							customer_id: Joi.number().required(),
							order_id: Joi.number().required()
						}
					},
					plugins: {
						'hapi-swagger': {
							payloadType: 'form'
						}
					}
				}
			},
			// /customer/order/delete/{id}
			{
				method: 'DELETE',
				path: '/customer/order/delete/{id}',
				config: {
					handler: Handlers.CustomerOrder.Delete,
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
				path: '/documentation',
				config: {
					handler: Handlers.Documentation
				}
			}
		],
		Files: [
			{
				method: 'GET',
				path: '/assets/{file*}',
				handler: {
					directory: {
						path: '../assets'
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
		Inventory: [
			// /inventory/list
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
			// /inventory/detail/{id}
			{
				method: 'GET',
				path: '/inventory/detail/{id}',
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
			// /inventory/upsert
			{
				method: 'POST',
				path: '/inventory/upsert',
				config: {
					handler: Handlers.Inventory.Upsert,
					description: 'Insert or update a new or existing inventory item',
					notes: 'Inserts or updates a new or existing inventory item',
					tags: ['api'],
					validate: {
						payload: {
							id: Joi.number().required(),
							product_id: Joi.number().required(),
							quantity: Joi.number().required()
						}
					},
					plugins: {
						'hapi-swagger': {
							payloadType: 'form'
						}
					}
				}
			},
			// /inventory/delete/{id}
			{
				method: 'DELETE',
				path: '/inventory/delete/{id}',
				config: {
					handler: Handlers.Inventory.Delete,
					description: 'Deletes an inventory item',
					notes: 'Deletes an existing inventory item by the id parameter',
					tags: ['api'],
					validate: {
						params: {
							id: Joi.number().min(1).max(9999).required()
						}
					}
				}
			}
		],
		OrderStatus: [
			// /order/status/list
			{
				method: 'GET',
				path: '/order/status/list',
				config: {
					handler: Handlers.OrderStatus.List,
					description: 'Select an order list',
					notes: 'Fetches a list of orders',
					tags: ['api']
				}
			},
			// /order/status/detail/{id}
			{
				method: 'GET',
				path: '/order/status/detail/{id}',
				config: {
					handler: Handlers.OrderStatus.Detail,
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
			// /order/status/upsert
			{
				method: 'POST',
				path: '/order/status/upsert',
				config: {
					handler: Handlers.OrderStatus.Upsert,
					description: 'Insert or update a new or existing order',
					notes: 'Inserts or updates an existing order',
					tags: ['api'],
					validate: {
						payload: {
							id: Joi.number().required(),
							order_id: Joi.number().required(),
							step: Joi.string().required(),
							status: Joi.string().required(),
							details: Joi.string().required()
						}
					},
					plugins: {
						'hapi-swagger': {
							payloadType: 'form'
						}
					}
				}
			},
			// /order/status/delete/{id}
			{
				method: 'DELETE',
				path: '/order/status/delete/{id}',
				config: {
					handler: Handlers.OrderStatus.Delete,
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
		Orders: [
			// /order/list
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
			// /order/detail/{id}
			{
				method: 'GET',
				path: '/order/detail/{id}',
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
			// /order/upsert
			{
				method: 'POST',
				path: '/order/upsert',
				config: {
					handler: Handlers.Order.Upsert,
					description: 'Insert or update a new or existing order',
					notes: 'Inserts or updates an existing order',
					tags: ['api'],
					validate: {
						payload: {
							id: Joi.number().required(),
							bag_id: Joi.number().required(),
							payment_id: Joi.number().required(),
							order_status_id: Joi.number().required()
						}
					},
					plugins: {
						'hapi-swagger': {
							payloadType: 'form'
						}
					}
				}
			},
			// /order/delete/{id}
			{
				method: 'DELETE',
				path: '/order/delete/{id}',
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
		Payments: [
			// /payment/list
			{
				method: 'GET',
				path: '/payment/list',
				config: {
					handler: Handlers.Payment.List,
					description: 'Select an payment list',
					notes: 'Fetches a list of payments',
					tags: ['api']
				}
			},
			// /payment/detail/{id}
			{
				method: 'GET',
				path: '/payment/detail/{id}',
				config: {
					handler: Handlers.Payment.Detail,
					description: 'Select an payment detail',
					notes: 'Fetches an existing payment by id',
					tags: ['api'],
					validate: {
						params: {
							id: Joi.number().min(1).max(9999).required()
						}
					}
				}
			},
			// /payment/upsert
			{
				method: 'POST',
				path: '/payment/upsert',
				config: {
					handler: Handlers.Payment.Upsert,
					description: 'Insert or update a new or existing payment',
					notes: 'Inserts or updates an existing payment',
					tags: ['api'],
					validate: {
						payload: {
							id: Joi.number().required(),
							order_id: Joi.number().required(),
							pp_id: Joi.string().required(),
							intent: Joi.string().required(),
							state: Joi.string().required(),
							cart: Joi.string().required(),
							created_time: Joi.string().required(),
							payment_method: Joi.string().required(),
							status: Joi.string().required(),
							email: Joi.string().required(),
							first_name: Joi.string().required(),
							middle_name: Joi.string().required(),
							last_name: Joi.string().required(),
							payer_id: Joi.string().required(),
							country_code: Joi.string().required(),
							shipping_recipient_name: Joi.string().required(),
							shipping_line1_street: Joi.string().required(),
							shipping_line2_street: Joi.string(),
							shipping_city: Joi.string().required(),
							shipping_state: Joi.string().required(),
							shipping_postal_code: Joi.string().required(),
							shipping_country_code: Joi.string().required(),
							transaction_total: Joi.string().required(),
							transaction_currency: Joi.string().required(),
							sale_id: Joi.string().required(),
							sale_state: Joi.string().required(),
							sale_payment_mode: Joi.string().required(),
							sale_protection_eligibility: Joi.string().required()
						}
					},
					plugins: {
						'hapi-swagger': {
							payloadType: 'form'
						}
					}
				}
			},
			// /payment/delete/{id}
			{
				method: 'DELETE',
				path: '/payment/delete/{id}',
				config: {
					handler: Handlers.Payment.Delete,
					description: 'Deletes an payment',
					notes: 'Deletes an existing payment by the id parameter',
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
			// /product/list
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
			// /product/detail/{id}
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
			// /product/upsert
			{
				method: 'POST',
				path: '/product/upsert',
				config: {
					handler: Handlers.Product.Upsert,
					description: 'Insert or update a product',
					notes: 'Inserts or updates a new or existing product',
					tags: ['api'],
					validate: {
						payload: {
							id: Joi.number().required(),
							code: Joi.string().required(),
							name: Joi.string().required(),
							details: Joi.string().required(),
							price: Joi.number().required(),
							size: Joi.string().required(),
							color: Joi.string().required(),
							gender: Joi.string().required(),
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
			// /product/delete/{id}
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
		],
		Users: [
			// /user/list
			{
				method: 'GET',
				path: '/user/list',
				config: {
					handler: Handlers.User.List,
					description: 'Select a user list',
					notes: 'Fetches a list of users',
					tags: ['api']
				}
			},
			// /user/detail/{id}
			{
				method: 'GET',
				path: '/user/detail/{id}',
				config: {
					handler: Handlers.User.Detail,
					description: 'Select a user detail',
					notes: 'Fetches an existing user by id',
					tags: ['api'],
					validate: {
						params: {
							id: Joi.number().min(1).max(9999).required()
						}
					}
				}
			},
			// /user/upsert
			{
				method: 'POST',
				path: '/user/upsert',
				config: {
					handler: Handlers.User.Upsert,
					description: 'Insert or update a new or existing user',
					notes: 'Inserts or updates an existing user',
					tags: ['api'],
					validate: {
						payload: {
							id: Joi.number().required(),
							user_name: Joi.string().required(),
							password: Joi.string().required(),
							is_subscribed: Joi.boolean().required()
						}
					},
					plugins: {
						'hapi-swagger': {
							payloadType: 'form'
						}
					}
				}
			},
			// /user/delete/{id}
			{
				method: 'DELETE',
				path: '/user/delete/{id}',
				config: {
					handler: Handlers.User.Delete,
					description: 'Deletes an user',
					notes: 'Deletes an existing user by the id parameter',
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
