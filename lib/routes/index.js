'use strict'

const Joi = require('joi'),
	Handlers = require('../handlers').Handlers,
	Routes = {
		Accounts: [
			// /account/list
			{
				method: 'GET',
				path: '/account/list',
				config: {
					auth: {
						scope: [ 'god','admin' ]
					},
					handler: Handlers.Account.List,
					description: 'Select an account list',
					notes: 'Fetches a list of accounts',
					tags: ['api', 'account']
				}
			},
			// /account/detail/{id}'
			{
				method: 'GET',
				path: '/account/detail/{id}',
				config: {
					auth: false,
					handler: Handlers.Account.Detail,
					description: 'Select an account detail',
					notes: 'Fetches an existing account detail',
					tags: ['api', 'account'],
					validate: {
						params: {
							id: Joi.number().min(1).max(9999).required()
						}
					}
				}
			},
			// /account/insert
			{
				method: 'POST',
				path: '/account/insert',
				config: {
					auth: false,
					handler: Handlers.Account.Insert,
					description: 'Insert a new account',
					notes: 'Insert a new account',
					tags: ['api', 'account'],
					validate: {
						payload: {
							username: Joi.string().required(),
							email: Joi.string().required(),
							password: Joi.string().required(),
							is_valid: Joi.boolean().required()
						}
					},
					plugins: {
						'hapi-swagger': {
							payloadType: 'form'
						}
					}
				}
			},
			// /account/update
			{
				method: 'POST',
				path: '/account/update',
				config: {
					auth: false,
					handler: Handlers.Account.Update,
					description: 'Update an account user',
					notes: 'Update an account user',
					tags: ['api', 'account'],
					validate: {
						payload: {
							id: Joi.number().required(),
							username: Joi.string(),
							email: Joi.string(),
							password: Joi.string(),
							is_subscribed: Joi.number()
						}
					},
					plugins: {
						'hapi-swagger': {
							payloadType: 'form'
						}
					}
				}
			},
			// /password/update
			{
				method: 'POST',
				path: '/password/update',
				config: {
					auth: false,
					handler: Handlers.Account.UpdatePassword,
					description: 'Update an account user',
					notes: 'Update an account user',
					tags: ['api', 'account'],
					validate: {
						payload: {
							id: Joi.number().required(),
							password: Joi.string().required(),
							new_password: Joi.string().required()
						}
					},
					plugins: {
						'hapi-swagger': {
							payloadType: 'form'
						}
					}
				}
			},
			// /account/delete/{id}
			{
				method: 'DELETE',
				path: '/account/delete/{id}',
				config: {
					auth: {
						scope: [ 'god','admin' ]
					},
					handler: Handlers.Account.Delete,
					description: 'Deletes an account',
					notes: 'Deletes an existing account by the id parameter',
					tags: ['api', 'account'],
					validate: {
						params: {
							id: Joi.number().min(1).max(9999).required()
						}
					}
				}
			},
			// /account/confirm
			{
				method: 'POST',
				path: '/account/confirm',
				config: {
					handler: Handlers.Account.Confirm,
					description: 'Confirms a user email after account creation',
					notes: 'Confirms a user email',
					tags: ['api', 'account'],
					auth: {
						mode: 'try'
					},
					validate: {
						payload: {
							token: Joi.string().required()
						}
					},
					plugins: {
						'hapi-auth-cookie': {
							redirectTo: false
						},
						'hapi-swagger': {
							payloadType: 'form'
						}
					}
				}
			},
			// /login
			{
				method: 'POST',
				path: '/login',
				config: {
					handler: Handlers.Account.Login,
					description: 'Logs a user into their account',
					notes: 'Logs a user into their account',
					tags: ['api', 'account'],
					auth: {
						mode: 'try'
					},
					validate: {
						payload: {
							email: Joi.string().required(),
							password: Joi.string().required()
						}
					},
					plugins: {
						'hapi-auth-cookie': {
							redirectTo: false
						},
						'hapi-swagger': {
							payloadType: 'form'
						}
					}
				}
			},
			// /account/logout
			{
				method: 'POST',
				path: '/account/logout',
				config: {
					auth: false,
					handler: Handlers.Account.Logout,
					description: 'Logs a user out of their account',
					notes: 'Logs a user out of their account',
					tags: ['api', 'account']
				}
			}
		],
		Addresses: [
			// /address/list
			{
				method: 'GET',
				path: '/address/list',
				config: {
					auth: false,
					handler: Handlers.Address.List,
					description: 'Select an address list',
					notes: 'Fetches a list of addresses',
					tags: ['api', 'address']
				}
			},
			// /address/detail/{id}'
			{
				method: 'GET',
				path: '/address/detail/{id}',
				config: {
					auth: {
						scope: [ 'god','admin', 'user' ]
					},
					handler: Handlers.Address.Detail,
					description: 'Select an address detail',
					notes: 'Fetches an existing address detail',
					tags: ['api', 'address'],
					validate: {
						params: {
							id: Joi.number().min(1).max(9999).required()
						}
					}
				}
			},
			// /address/insert
			{
				method: 'POST',
				path: '/address/insert',
				config: {
					auth: false,
					handler: Handlers.Address.Insert,
					description: 'Insert a new address',
					notes: 'Insert a new address',
					tags: ['api', 'address'],
					validate: {
						payload: {
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
			// /address/update
			{
				method: 'PUT',
				path: '/address/update',
				config: {
					auth: false,
					handler: Handlers.Address.Update,
					description: 'Update an existing address',
					notes: 'Update an existing address',
					tags: ['api', 'address'],
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
					auth: {
						scope: [ 'god','admin', 'user' ]
					},
					handler: Handlers.Address.Delete,
					description: 'Delete an address',
					notes: 'Deletes an existing address by the id parameter',
					tags: ['api', 'address'],
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
					auth: {
						scope: [ 'god','admin' ]
					},
					handler: Handlers.Bag.List,
					description: 'Select a bag list',
					notes: 'Fetches a list of bags',
					tags: ['api', 'bag']
				}
			},
			// /bag/detail/{id}
			{
				method: 'GET',
				path: '/bag/detail/{id}',
				config: {
					auth: {
						scope: [ 'god','admin', 'cust' ]
					},
					handler: Handlers.Bag.Detail,
					description: 'Select a bag detail',
					notes: 'Fetches an existing bag by the id parameter',
					tags: ['api', 'bag'],
					validate: {
						params: {
							id: Joi.number().min(1).max(9999).required()
						}
					}
				}
			},
			// /bag/insert
			{
				method: 'POST',
				path: '/bag/insert',
				config: {
					auth: false,
					handler: Handlers.Bag.Insert,
					description: 'Insert a new bag',
					notes: 'Insert a new bag',
					tags: ['api', 'bag'],
					validate: {
						payload: {
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
			// /bag/update
			{
				method: 'PUT',
				path: '/bag/update',
				config: {
					auth: false,
					handler: Handlers.Bag.Update,
					description: 'Update an existing bag',
					notes: 'Update an existing bag',
					tags: ['api', 'bag'],
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
					auth: false,
					handler: Handlers.Bag.Delete,
					description: 'Delete a bag',
					notes: 'Deletes an existing bag by the id parameter',
					tags: ['api', 'bag'],
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
					auth: false,
					handler: Handlers.BagItem.List,
					description: 'Select a bag item list',
					notes: 'Fetches a list of bag items',
					tags: ['api', 'bag item']
				}
			},
			// /bag/item/detail/{id}
			{
				method: 'GET',
				path: '/bag/item/detail/{id}',
				config: {
					auth: false,
					handler: Handlers.BagItem.Detail,
					description: 'Select a bag item detail',
					notes: 'Fetches an existing bag item by the id parameter',
					tags: ['api', 'bag item'],
					validate: {
						params: {
							id: Joi.number().min(1).max(9999).required()
						}
					}
				}
			},
			// /bag/item/insert
			{
				method: 'POST',
				path: '/bag/item/insert',
				config: {
					auth: false,
					handler: Handlers.BagItem.Insert,
					description: 'Insert a new bag item',
					notes: 'Insert a new bag item',
					tags: ['api', 'bag item'],
					validate: {
						payload: {
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
			// /bag/item/update
			{
				method: 'PUT',
				path: '/bag/item/update',
				config: {
					auth: false,
					handler: Handlers.BagItem.Update,
					description: 'Update an existing bag item',
					notes: 'Update an existing bag item',
					tags: ['api', 'bag item'],
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
					auth: false,
					handler: Handlers.BagItem.Delete,
					description: 'Delete a bag item',
					notes: 'Deletes an existing bag item by the id parameter',
					tags: ['api', 'bag item'],
					validate: {
						params: {
							id: Joi.number().min(1).max(9999).required()
						}
					}
				}
			}
		],
		Cache: [
			// /cache/detail/{id}
			{
				method: 'GET',
				path: '/cache/detail/{id}',
				config: {
					auth: false,
					handler: Handlers.Cache.Detail,
					description: 'Select a cache detail',
					notes: 'Fetches a detail of the cache',
					tags: ['api', 'cache']
				}
			}
		],
		Contacts: [
			// /contact/list
			{
				method: 'GET',
				path: '/contact/list',
				config: {
					auth: {
						scope: [ 'god','admin' ]
					},
					handler: Handlers.Contact.List,
					description: 'Select a contact list',
					notes: 'Fetches a list of contacts',
					tags: ['api', 'contact']
				}
			},
			// /contact/detail/{id}
			{
				method: 'GET',
				path: '/contact/detail/{id}',
				config: {
					auth: {
						scope: [ 'god','admin' ]
					},
					handler: Handlers.Contact.Detail,
					description: 'Select an contact detail',
					notes: 'Fetches an existing contact detail',
					tags: ['api', 'contact'],
					validate: {
						params: {
							id: Joi.number().min(1).max(9999).required()
						}
					}
				}
			},
			// /contact/insert
			{
				method: 'POST',
				path: '/contact/insert',
				config: {
					auth: false,
					handler: Handlers.Contact.Insert,
					description: 'Insert a new contact',
					notes: 'Insert a new contact',
					tags: ['api', 'contact'],
					validate: {
						payload: {
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
					auth: {
						scope: [ 'god','admin' ]
					},
					handler: Handlers.Contact.Delete,
					description: 'Delete a contact',
					notes: 'Deletes an existing contact by the id parameter',
					tags: ['api', 'contact'],
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
					auth: {
						scope: [ 'god','admin' ]
					},
					handler: Handlers.Customer.List,
					description: 'Select a customer list',
					notes: 'Fetches a list of customers',
					tags: ['api', 'customer']
				}
			},
			// /customer/detail/{id}
			{
				method: 'GET',
				path: '/customer/detail/{id}',
				config: {
					auth: false,
					handler: Handlers.Customer.Detail,
					description: 'Select an customer detail',
					notes: 'Fetches an existing customer detail',
					tags: ['api', 'customer'],
					validate: {
						params: {
							id: Joi.number().min(1).max(9999).required()
						}
					}
				}
			},
			// /customer/insert
			{
				method: 'POST',
				path: '/customer/insert',
				config: {
					auth: false,
					handler: Handlers.Customer.Insert,
					description: 'Insert a new customer',
					notes: 'Insert a new customer',
					tags: ['api', 'customer'],
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
			// /customer/update
			{
				method: 'PUT',
				path: '/customer/update',
				config: {
					auth: false,
					handler: Handlers.Customer.Update,
					description: 'Update an existing customer',
					notes: 'Update an existing customer',
					tags: ['api', 'customer'],
					validate: {
						payload: {
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
					auth: {
						scope: [ 'god','admin' ]
					},
					handler: Handlers.Customer.Delete,
					description: 'Delete a customer',
					notes: 'Deletes an existing customer by the id parameter',
					tags: ['api', 'customer'],
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
					auth: {
						scope: [ 'god','admin' ]
					},
					handler: Handlers.CustomerOrder.List,
					description: 'Select a customer list',
					notes: 'Fetches a list of customers',
					tags: ['api', 'customer order']
				}
			},
			// /customer/order/detail/{id}
			{
				method: 'GET',
				path: '/customer/order/detail/{id}',
				config: {
					auth: {
						scope: [ 'god','admin', 'cust' ]
					},
					handler: Handlers.CustomerOrder.Detail,
					description: 'Select an customer detail',
					notes: 'Fetches an existing customer detail',
					tags: ['api', 'customer order'],
					validate: {
						params: {
							id: Joi.number().min(1).max(9999).required()
						}
					}
				}
			},
			// /customer/order/insert
			{
				method: 'POST',
				path: '/customer/order/insert',
				config: {
					auth: {
						scope: [ 'god','admin', 'cust' ]
					},
					handler: Handlers.CustomerOrder.Insert,
					description: 'Insert a new customer',
					notes: 'Insert a new customer',
					tags: ['api', 'customer order'],
					validate: {
						payload: {
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
			// /customer/order/update
			{
				method: 'PUT',
				path: '/customer/order/update',
				config: {
					auth: {
						scope: [ 'god','admin' ]
					},
					handler: Handlers.CustomerOrder.Update,
					description: 'Update an existing customer',
					notes: 'Update an existing customer',
					tags: ['api', 'customer order'],
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
					auth: {
						scope: [ 'god','admin' ]
					},
					handler: Handlers.CustomerOrder.Delete,
					description: 'Delete a customer',
					notes: 'Deletes an existing customer by the id parameter',
					tags: ['api', 'customer order'],
					validate: {
						params: {
							id: Joi.number().min(1).max(9999).required()
						}
					}
				}
			}
		],
		Droog: [
			// /droog/login
			{
				method: 'POST',
				path: '/droog/login',
				config: {
					handler: Handlers.Droog.Login,
					description: 'Logs a user into their account',
					notes: 'Logs a user into their account',
					tags: ['api', 'account'],
					auth: {
						mode: 'try'
					},
					validate: {
						payload: {
							username: Joi.string().required(),
							password: Joi.string().required()
						}
					},
					plugins: {
						'hapi-auth-cookie': {
							redirectTo: false
						},
						'hapi-swagger': {
							payloadType: 'form'
						}
					}
				}
			},
			// /account/logout
			{
				method: 'POST',
				path: '/droog/logout',
				config: {
					auth: false,
					handler: Handlers.Droog.Logout,
					description: 'Logs a user out of their account',
					notes: 'Logs a user out of their account',
					tags: ['api', 'account']
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
				},
				config: {
					auth: false
				}
			}
		],
		Inventory: [
			// /inventory/list
			{
				method: 'GET',
				path: '/inventory/list',
				config: {
					auth: false,
					handler: Handlers.Inventory.List,
					description: 'Select an inventory item list',
					notes: 'Fetches a list of inventory',
					tags: ['api', 'inventory']
				}
			},
			// /inventory/detail/{id}
			{
				method: 'GET',
				path: '/inventory/detail/{id}',
				config: {
					auth: {
						scope: [ 'god','admin', 'merch', 'merch_admin' ]
					},
					handler: Handlers.Inventory.Detail,
					description: 'Select an inventory item detail',
					notes: 'Fetches an existing inventory item detail by id',
					tags: ['api', 'inventory'],
					validate: {
						params: {
							id: Joi.number().min(1).max(9999).required()
						}
					}
				}
			},
			// /inventory/insert
			{
				method: 'POST',
				path: '/inventory/insert',
				config: {
					auth: {
						scope: [ 'god','admin', 'merch', 'merch_admin' ]
					},
					handler: Handlers.Inventory.Insert,
					description: 'Insert a new inventory item',
					notes: 'Insert a new inventory item',
					tags: ['api', 'inventory'],
					validate: {
						payload: {
							product_code: Joi.string().required(),
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
			// /inventory/update
			{
				method: 'PUT',
				path: '/inventory/update',
				config: {
					auth: {
						scope: [ 'god','admin', 'merch', 'merch_admin' ]
					},
					handler: Handlers.Inventory.Update,
					description: 'Update an existing inventory item',
					notes: 'Update an existing inventory item',
					tags: ['api', 'inventory'],
					validate: {
						payload: {
							id: Joi.number().required(),
							product_code: Joi.string().required(),
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
					auth: {
						scope: [ 'god','admin', 'merch', 'merch_admin' ]
					},
					handler: Handlers.Inventory.Delete,
					description: 'Deletes an inventory item',
					notes: 'Deletes an existing inventory item by the id parameter',
					tags: ['api', 'inventory'],
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
					auth: {
						scope: [ 'god','admin' ]
					},
					handler: Handlers.OrderStatus.List,
					description: 'Select an order list',
					notes: 'Fetches a list of orders',
					tags: ['api', 'order status']
				}
			},
			// /order/status/detail/{id}
			{
				method: 'GET',
				path: '/order/status/detail/{id}',
				config: {
					auth: {
						scope: [ 'god','admin' ]
					},
					handler: Handlers.OrderStatus.Detail,
					description: 'Select an order detail',
					notes: 'Fetches an existing order by id',
					tags: ['api', 'order status'],
					validate: {
						params: {
							id: Joi.number().min(1).max(9999).required()
						}
					}
				}
			},
			// /order/status/insert
			{
				method: 'POST',
				path: '/order/status/insert',
				config: {
					auth: {
						scope: [ 'god','admin' ]
					},
					handler: Handlers.OrderStatus.Insert,
					description: 'Insert a new order',
					notes: 'Insert a new order',
					tags: ['api', 'order status'],
					validate: {
						payload: {
							id: Joi.number().required(),
							code: Joi.number().required(),
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
			// /order/status/update
			{
				method: 'PUT',
				path: '/order/status/update',
				config: {
					auth: {
						scope: [ 'god','admin' ]
					},
					handler: Handlers.OrderStatus.Update,
					description: 'Update an existing order',
					notes: 'Update an existing order',
					tags: ['api', 'order status'],
					validate: {
						payload: {
							id: Joi.number().required(),
							code: Joi.number().required(),
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
					auth: {
						scope: [ 'god','admin' ]
					},
					handler: Handlers.OrderStatus.Delete,
					description: 'Deletes an order',
					notes: 'Deletes an existing order by the id parameter',
					tags: ['api', 'order status'],
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
					auth: {
						scope: [ 'god','admin', 'merch', 'merch_admin' ]
					},
					handler: Handlers.Order.List,
					description: 'Select an order list',
					notes: 'Fetches a list of orders',
					tags: ['api', 'order']
				}
			},
			// /order/detail/{id}
			{
				method: 'GET',
				path: '/order/detail/{id}',
				config: {
					auth: false,
					handler: Handlers.Order.Detail,
					description: 'Select an order detail',
					notes: 'Fetches an existing order by id',
					tags: ['api', 'order'],
					validate: {
						params: {
							id: Joi.number().min(1).max(9999).required()
						}
					}
				}
			},
			// /order/insert
			{
				method: 'POST',
				path: '/order/insert',
				config: {
					auth: false,
					handler: Handlers.Order.Insert,
					description: 'Insert a new order',
					notes: 'Insert a new order',
					tags: ['api', 'order'],
					validate: {
						payload: {
							bag_id: Joi.number().required(),
							order_type_id: Joi.number().required(),
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
			// /order/update
			{
				method: 'PUT',
				path: '/order/update',
				config: {
					auth: {
						scope: [ 'god','admin', 'merch', 'merch_admin' ]
					},
					handler: Handlers.Order.Update,
					description: 'Update an existing order',
					notes: 'Update an existing order',
					tags: ['api', 'order'],
					validate: {
						payload: {
							id: Joi.number().required(),
							bag_id: Joi.number().required(),
							order_type_id: Joi.number().required(),
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
					auth: {
						scope: [ 'god','admin', 'merch', 'merch_admin' ]
					},
					handler: Handlers.Order.Delete,
					description: 'Deletes an order',
					notes: 'Deletes an existing order by the id parameter',
					tags: ['api', 'order'],
					validate: {
						params: {
							id: Joi.number().min(1).max(9999).required()
						}
					}
				}
			},
			// /order/history/list/{id}
			{
				method: 'GET',
				path: '/order/history/list/{id}',
				config: {
					auth: {
						scope: [ 'god','admin', 'merch', 'merch_admin', 'cust' ]
					},
					handler: Handlers.Order.History.List,
					description: 'Select a historical list of orders by customer id',
					notes: 'Fetches a historical list of orders by customer id',
					tags: ['api', 'order history'],
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
					auth: {
						scope: [ 'god','admin', 'merch', 'merch_admin' ]
					},
					handler: Handlers.Payment.List,
					description: 'Select an payment list',
					notes: 'Fetches a list of payments',
					tags: ['api', 'payment']
				}
			},
			// /payment/detail/{id}
			{
				method: 'GET',
				path: '/payment/detail/{id}',
				config: {
					auth: {
						scope: [ 'god','admin', 'merch', 'merch_admin' ]
					},
					handler: Handlers.Payment.Detail,
					description: 'Select an payment detail',
					notes: 'Fetches an existing payment by id',
					tags: ['api', 'payment'],
					validate: {
						params: {
							id: Joi.number().min(1).max(9999).required()
						}
					}
				}
			},
			// /payment/insert
			{
				method: 'POST',
				path: '/payment/insert',
				config: {
					auth: false,
					handler: Handlers.Payment.Insert,
					description: 'Insert a new payment',
					notes: 'Insert a new payment',
					tags: ['api', 'payment'],
					validate: {
						payload: {
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
			// /payment/update
			{
				method: 'PUT',
				path: '/payment/update',
				config: {
					auth: false,
					handler: Handlers.Payment.Update,
					description: 'Update an existing payment',
					notes: 'Update an existing payment',
					tags: ['api', 'payment'],
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
					auth: {
						scope: [ 'god','admin', 'merch', 'merch_admin' ]
					},
					handler: Handlers.Payment.Delete,
					description: 'Deletes an payment',
					notes: 'Deletes an existing payment by the id parameter',
					tags: ['api', 'payment'],
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
					auth: false,
					handler: Handlers.Product.List,
					description: 'Select a product list',
					notes: 'Fetches a list of products',
					tags: ['api', 'product']
				}
			},
			// /product/detail/{id}
			{
				method: 'GET',
				path: '/product/detail/{id}',
				config: {
					auth: false,
					handler: Handlers.Product.Detail,
					description: 'Select an order detail',
					notes: 'Fetches an existing order',
					tags: ['api', 'product'],
					validate: {
						params: {
							id: Joi.number().min(1).max(9999).required()
						}
					}
				}
			},
			// /product/insert
			{
				method: 'POST',
				path: '/product/insert',
				config: {
					auth: {
						scope: [ 'god','admin', 'merch', 'merch_admin' ]
					},
					handler: Handlers.Product.Insert,
					description: 'Insert a new product',
					notes: 'Insert a new product',
					tags: ['api', 'product'],
					validate: {
						payload: {
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
			// /product/update
			{
				method: 'PUT',
				path: '/product/update',
				config: {
					auth: {
						scope: [ 'god','admin', 'merch', 'merch_admin' ]
					},
					handler: Handlers.Product.Update,
					description: 'Update an existing product',
					notes: 'Update an existing product',
					tags: ['api', 'product'],
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
					auth: {
						scope: [ 'god','admin', 'merch', 'merch_admin' ]
					},
					handler: Handlers.Product.Delete,
					description: 'Deletes a product',
					notes: 'Deletes an existing product by the id parameter',
					tags: ['api', 'product'],
					validate: {
						params: {
							id: Joi.number().min(1).max(9999).required()
						}
					}
				}
			}
		],
		Views: [
			// /
			{
				method: 'GET',
				path: '/',
				config: {
					auth: {
						strategy: 'session'
					},
					handler: Handlers.Views.Home,
					description: 'Get Droog API home page',
					notes: 'Fetches Droog API home page with logo and link to documentation',
					tags: ['api', 'views']
				}
			},
			// /login
			{
				method: 'GET',
				path: '/login',
				config: {
					auth: {
						strategy: 'session'
					},
					handler: Handlers.Views.Login,
					description: 'Get Droog API home page',
					notes: 'Fetches Droog API home page with logo and link to documentation',
					tags: ['api', 'views'],
					auth: {
						mode: 'try'
					},
					plugins: {
						'hapi-auth-cookie': {
							redirectTo: false
						}
					}
				}
			},
			// /documentation
			{
				method: 'GET',
				path: '/documentation',
				config: {
					auth: {
						strategy: 'session',
						scope: [ 'god','admin' ]
					},
					handler: Handlers.Views.Documentation,
					description: 'Get Droog API documenation page',
					notes: 'Fetches Droog API documenation page',
					tags: ['api', 'views']
				}
			},
		]
	}

module.exports = {
	Routes
}
