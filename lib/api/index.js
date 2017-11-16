'use strict'

const Sequelize = require('sequelize'),
	Url = require('url'),
	Utils = require('./../utils'),
	Connections = {
		MySql: Url.parse(process.env.CLEARDB_DATABASE_URL)
	},
	Orm = {
		Mysql: new Sequelize(
			Connections.MySql.pathname.substring(1),
			Connections.MySql.auth.split(':')[0],
			Connections.MySql.auth.split(':')[1],
			{
				host: Connections.MySql.hostname,
				dialect: 'mysql',
				pool: {
					max: 5,
					min: 0,
					idle: 10000
				},
				logging: false
			}
		)
	},
	Models = {
		Mysql: {
			Accounts: Orm.Mysql.define('accounts', {
				id: {
					type: Sequelize.INTEGER,
					field: 'id',
					primaryKey: true
				},
				user_name: {
					type: Sequelize.STRING,
					field: 'user_name'
				},
				password: {
					type: Sequelize.STRING,
					field: 'password'
				},
				is_subscribed: {
					type: Sequelize.INTEGER,
					field: 'is_subscribed'
				},
				created_date: {
					type: Sequelize.DATE,
					field: 'created_date'
				},
				updated_date: {
					type: Sequelize.DATE,
					field: 'updated_date'
				}
			},
			{
				timestamps: false,
				underscored: true,
				freezeTableName: true
			}),
			Addresses: Orm.Mysql.define('addresses', {
				id: {
					type: Sequelize.INTEGER,
					field: 'id',
					primaryKey: true
				},
				customer_id: {
					type: Sequelize.INTEGER,
					field: 'customer_id'
				},
				email: {
					type: Sequelize.STRING,
					field: 'email'
				},
				phone: {
					type: Sequelize.STRING,
					field: 'phone'
				},
				address1: {
					type: Sequelize.STRING,
					field: 'address1'
				},
				address2: {
					type: Sequelize.STRING,
					field: 'address2'
				},
				city: {
					type: Sequelize.STRING,
					field: 'city'
				},
				state: {
					type: Sequelize.STRING,
					field: 'state'
				},
				zip: {
					type: Sequelize.STRING,
					field: 'zip'
				},
				is_billing: {
					type: Sequelize.INTEGER,
					field: 'is_billing'
				},
				is_shipping: {
					type: Sequelize.INTEGER,
					field: 'is_shipping'
				},
				created_date: {
					type: Sequelize.DATE,
					field: 'created_date'
				},
				updated_date: {
					type: Sequelize.DATE,
					field: 'updated_date'
				}
			},
			{
				timestamps: false,
				underscored: true
			}),
			Bags: Orm.Mysql.define('bags', {
				id: {
					type: Sequelize.INTEGER,
					field: 'id',
					primaryKey: true
				},
				customer_id: {
					type: Sequelize.INTEGER,
					field: 'customer_id'
				},
				created_date: {
					type: Sequelize.DATE,
					field: 'created_date'
				},
				updated_date: {
					type: Sequelize.DATE,
					field: 'updated_date'
				}
			},
			{
				timestamps: false,
				underscored: true
			}),
			BagItems: Orm.Mysql.define('bag_items', {
				id: {
					type: Sequelize.INTEGER,
					field: 'id',
					primaryKey: true
				},
				bag_id: {
					type: Sequelize.INTEGER,
					field: 'bag_id'
				},
				inventory_id: {
					type: Sequelize.INTEGER,
					field: 'inventory_id'
				},
				quantity: {
					type: Sequelize.INTEGER,
					field: 'quantity'
				},
				type: {
					type: Sequelize.STRING,
					field: 'type'
				},
				created_date: {
					type: Sequelize.DATE,
					field: 'created_date'
				},
				updated_date: {
					type: Sequelize.DATE,
					field: 'updated_date'
				}
			},
			{
				timestamps: false,
				underscored: true
			}),
			Contacts: Orm.Mysql.define('contacts', {
				id: {
					type: Sequelize.INTEGER,
					field: 'id',
					primaryKey: true
				},
				email: {
					type: Sequelize.STRING,
					field: 'email'
				},
				reason: {
					type: Sequelize.STRING,
					field: 'reason'
				},
				comments: {
					type: Sequelize.STRING,
					field: 'comments'
				},
				created_date: {
					type: Sequelize.DATE,
					field: 'created_date'
				}
			},
			{
				timestamps: false,
				underscored: true
			}),
			Customers: Orm.Mysql.define('customers', {
				id: {
					type: Sequelize.INTEGER,
					field: 'id',
					primaryKey: true
				},
				user_id: {
					type: Sequelize.INTEGER,
					field: 'user_id'
				},
				first_name: {
					type: Sequelize.STRING,
					field: 'first_name'
				},
				last_name: {
					type: Sequelize.STRING,
					field: 'last_name'
				},
				email: {
					type: Sequelize.STRING,
					field: 'email'
				},
				phone: {
					type: Sequelize.INTEGER,
					field: 'phone'
				},
				created_date: {
					type: Sequelize.DATE,
					field: 'created_date'
				},
				updated_date: {
					type: Sequelize.DATE,
					field: 'updated_date'
				}
			},
			{
				timestamps: false,
				underscored: true
			}),
			CustomersOrders: Orm.Mysql.define('customers_orders', {
				id: {
					type: Sequelize.INTEGER,
					field: 'id',
					primaryKey: true
				},
				customer_id: {
					type: Sequelize.INTEGER,
					field: 'customer_id'
				},
				order_id: {
					type: Sequelize.INTEGER,
					field: 'order_id'
				},
				created_date: {
					type: Sequelize.DATE,
					field: 'created_date'
				},
				updated_date: {
					type: Sequelize.DATE,
					field: 'updated_date'
				}
			},
			{
				timestamps: false,
				underscored: true
			}),
			Inventory: Orm.Mysql.define('inventory', {
				id: {
					type: Sequelize.INTEGER,
					field: 'id',
					primaryKey: true
				},
				product_id: {
					type: Sequelize.INTEGER,
					field: 'product_id'
				},
				quantity: {
					type: Sequelize.INTEGER,
					field: 'quantity'
				},
				created_date: {
					type: Sequelize.DATE,
					field: 'created_date'
				},
				updated_date: {
					type: Sequelize.DATE,
					field: 'updated_date'
				}
			},
			{
				timestamps: false,
				underscored: true,
				freezeTableName: true
			}),
			OrderStatus: Orm.Mysql.define('order_status', {
				id: {
					type: Sequelize.INTEGER,
					field: 'id',
					primaryKey: true
				},
				order_id: {
					type: Sequelize.INTEGER,
					field: 'order_id'
				},
				step: {
					type: Sequelize.STRING,
					field: 'step'
				},
				status: {
					type: Sequelize.STRING,
					field: 'status'
				},
				details: {
					type: Sequelize.STRING,
					field: 'details'
				},
				created_date: {
					type: Sequelize.DATE,
					field: 'created_date'
				},
				updated_date: {
					type: Sequelize.DATE,
					field: 'updated_date'
				}
			},
			{
				timestamps: false,
				underscored: true,
				tableName: 'order_status'
			}),
			Orders: Orm.Mysql.define('orders', {
				id: {
					type: Sequelize.INTEGER,
					field: 'id',
					primaryKey: true
				},
				bag_id: {
					type: Sequelize.INTEGER,
					field: 'bag_id'
				},
				payment_id: {
					type: Sequelize.INTEGER,
					field: 'payment_id'
				},
				order_status_id: {
					type: Sequelize.INTEGER,
					field: 'order_status_id'
				},
				created_date: {
					type: Sequelize.DATE,
					field: 'created_date'
				},
				updated_date: {
					type: Sequelize.DATE,
					field: 'updated_date'
				}
			},
			{
				timestamps: false,
				underscored: true
			}),
			Payments: Orm.Mysql.define('payments', {
				id: {
					type: Sequelize.INTEGER,
					field: 'id',
					primaryKey: true
				},
				order_id: {
					type: Sequelize.INTEGER,
					field: 'order_id'
				},
				pp_id: {
					type: Sequelize.STRING,
					field: 'pp_id'
				},
				intent: {
					type: Sequelize.STRING,
					field: 'intent'
				},
				state: {
					type: Sequelize.STRING,
					field: 'state'
				},
				cart: {
					type: Sequelize.STRING,
					field: 'cart'
				},
				created_time: {
					type: Sequelize.STRING,
					field: 'created_time'
				},
				payment_method: {
					type: Sequelize.STRING,
					field: 'payment_method'
				},
				status: {
					type: Sequelize.STRING,
					field: 'status'
				},
				email: {
					type: Sequelize.STRING,
					field: 'email'
				},
				first_name: {
					type: Sequelize.STRING,
					field: 'first_name'
				},
				middle_name: {
					type: Sequelize.STRING,
					field: 'middle_name'
				},
				last_name: {
					type: Sequelize.STRING,
					field: 'last_name'
				},
				payer_id: {
					type: Sequelize.STRING,
					field: 'payer_id'
				},
				country_code: {
					type: Sequelize.STRING,
					field: 'country_code'
				},
				shipping_recipient_name: {
					type: Sequelize.STRING,
					field: 'shipping_recipient_name'
				},
				shipping_line1_street: {
					type: Sequelize.STRING,
					field: 'shipping_line1_street'
				},
				shipping_line2_street: {
					type: Sequelize.STRING,
					field: 'shipping_line2_street'
				},
				shipping_city: {
					type: Sequelize.STRING,
					field: 'shipping_city'
				},
				shipping_state: {
					type: Sequelize.STRING,
					field: 'shipping_state'
				},
				shipping_postal_code: {
					type: Sequelize.STRING,
					field: 'shipping_postal_code'
				},
				shipping_country_code: {
					type: Sequelize.STRING,
					field: 'shipping_country_code'
				},
				transaction_total: {
					type: Sequelize.STRING,
					field: 'transaction_total'
				},
				transaction_currency: {
					type: Sequelize.STRING,
					field: 'transaction_currency'
				},
				sale_id: {
					type: Sequelize.STRING,
					field: 'sale_id'
				},
				sale_state: {
					type: Sequelize.STRING,
					field: 'sale_state'
				},
				sale_payment_mode: {
					type: Sequelize.STRING,
					field: 'sale_payment_mode'
				},
				sale_protection_eligibility: {
					type: Sequelize.STRING,
					field: 'sale_protection_eligibility'
				},
				created_date: {
					type: Sequelize.DATE,
					field: 'created_date'
				}
			},
			{
				timestamps: false,
				underscored: true
			}),
			Products: Orm.Mysql.define('products', {
				id: {
					type: Sequelize.INTEGER,
					field: 'id',
					primaryKey: true
				},
				code: {
					type: Sequelize.STRING,
					field: 'code'
				},
				name: {
					type: Sequelize.STRING,
					field: 'name'
				},
				details: {
					type: Sequelize.STRING,
					field: 'details'
				},
				price: {
					type: Sequelize.INTEGER,
					field: 'price'
				},
				size: {
					type: Sequelize.STRING,
					field: 'size'
				},
				color: {
					type: Sequelize.STRING,
					field: 'color'
				},
				gender: {
					type: Sequelize.STRING,
					field: 'gender'
				},
				release: {
					type: Sequelize.INTEGER,
					field: 'release',
					defaultValue: 1
				},
				created_date: {
					type: Sequelize.DATE,
					field: 'created_date'
				},
				updated_date: {
					type: Sequelize.DATE,
					field: 'updated_date'
				}
			},
			{
				timestamps: false,
				underscored: true
			}),
			Users: Orm.Mysql.define('users', {
				id: {
					type: Sequelize.INTEGER,
					field: 'id',
					primaryKey: true
				},
				user_name: {
					type: Sequelize.STRING,
					field: 'user_name'
				},
				password: {
					type: Sequelize.STRING,
					field: 'password'
				},
				is_subscribed: {
					type: Sequelize.INTEGER,
					field: 'is_subscribed'
				},
				created_date: {
					type: Sequelize.DATE,
					field: 'created_date'
				},
				updated_date: {
					type: Sequelize.DATE,
					field: 'updated_date'
				}
			},
			{
				timestamps: false,
				underscored: true,
				freezeTableName: true
			})
		}
	}

/*
Models.Mysql.Orders.belongsToMany(Models.Mysql.OrderItems, { through: 'orders_order_items' })
Models.Mysql.OrderItems.belongsToMany(Models.Mysql.Orders, { through: 'orders_order_items' })
Models.Mysql.Orders.belongsToMany(Models.Mysql.OrderStatus, { through: 'orders_order_status' })
Models.Mysql.OrderStatus.belongsToMany(Models.Mysql.Orders, { through: 'orders_order_status' })
Models.Mysql.Orders.belongsToMany(Models.Mysql.Payments, { through: 'orders_payments' })
Models.Mysql.Payments.belongsToMany(Models.Mysql.Orders, { through: 'orders_payments' })
Models.Mysql.Bags.belongsTo(Models.Mysql.Products, { foreignKey: 'product_id' })
*/

module.exports = {
	Accounts: Models.Mysql.Accounts,
	Addresses: Models.Mysql.Addresses,
	Bags: Models.Mysql.Bags,
	BagItems: Models.Mysql.BagItems,
	Contacts: Models.Mysql.Contacts,
	Customers: Models.Mysql.Customers,
	CustomersOrders: Models.Mysql.CustomersOrders,
	Inventory: Models.Mysql.Inventory,
	OrderStatus: Models.Mysql.OrderStatus,
	Orders: Models.Mysql.Orders,
	Payments: Models.Mysql.Payments,
	Products: Models.Mysql.Products,
	Users: Models.Mysql.Users
}
