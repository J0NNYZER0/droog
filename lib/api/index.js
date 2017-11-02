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
			Addresses: Orm.Mysql.define('addresses', {
				id: {
					type: Sequelize.STRING,
					field: 'id',
					primaryKey: true
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
					type: Sequelize.STRING,
					field: 'id',
					primaryKey: true
				},
				product_id: {
					type: Sequelize.INTEGER,
					field: 'product_id'
				},
				email: {
					type: Sequelize.STRING,
					field: 'email'
				},
				gender: {
					type: Sequelize.STRING,
					field: 'gender'
				},
				size: {
					type: Sequelize.STRING,
					field: 'size'
				},
				quantity: {
					type: Sequelize.STRING,
					field: 'quantity'
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
			Contacts: Orm.Mysql.define('contacts', {
				id: {
					type: Sequelize.STRING,
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
			Inventory: Orm.Mysql.define('inventory', {
				id: {
					type: Sequelize.STRING,
					field: 'id',
					primaryKey: true
				},
				product_id: {
					type: Sequelize.STRING,
					field: 'product_id'
				},
				size: {
					type: Sequelize.STRING,
					field: 'size'
				},
				color: {
					type: Sequelize.STRING,
					field: 'color'
				},
				sex: {
					type: Sequelize.STRING,
					field: 'sex'
				},
				quantity: {
					type: Sequelize.INTEGER,
					field: 'quantity'
				},
				release: {
					type: Sequelize.INTEGER,
					field: 'release'
				},
				created_date: {
					type: Sequelize.DATE,
					field: 'created_date'
				}
			},
			{
				timestamps: false,
				underscored: true,
				freezeTableName: true
			}),
			OrderItems: Orm.Mysql.define('order_items', {
				id: {
					type: Sequelize.INTEGER,
					field: 'id',
					primaryKey: true
				},
				order_id: {
					type: Sequelize.INTEGER,
					field: 'order_id'
				},
				product_id: {
					type: Sequelize.STRING,
					field: 'product_id',
					primaryKey: true
				},
				gender: {
					type: Sequelize.STRING,
					field: 'gender'
				},
				size: {
					type: Sequelize.STRING,
					field: 'size'
				},
				quantity: {
					type: Sequelize.INTEGER,
					field: 'quantity'
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
			Orders: Orm.Mysql.define('orders', {
				id: {
					type: Sequelize.INTEGER,
					field: 'id',
					primaryKey: true
				},
				email: {
					type: Sequelize.STRING,
					field: 'email'
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
			OrderStatus: Orm.Mysql.define('order_status', {
				id: {
					type: Sequelize.INTEGER,
					field: 'id',
					primaryKey: true
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
				underscored: true
			}),
			Payments: Orm.Mysql.define('payments', {
				id: {
					type: Sequelize.INTEGER,
					field: 'id',
					primaryKey: true
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
			Preorders: Orm.Mysql.define('preorders', {
				id: {
					type: Sequelize.STRING,
					field: 'id',
					primaryKey: true
				},
				email: {
					type: Sequelize.STRING,
					field: 'email'
				},
				preorder: {
					type: Sequelize.STRING,
					field: 'preorder'
				},
				size: {
					type: Sequelize.STRING,
					field: 'size'
				},
				reason: {
					type: Sequelize.STRING,
					field: 'reason'
				},
				release: {
					type: Sequelize.INTEGER,
					field: 'release',
					defaultValue: 1
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
					type: Sequelize.STRING,
					field: 'id',
					primaryKey: true
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
			})
		}
	}

Models.Mysql.Orders.belongsToMany(Models.Mysql.OrderItems, { through: 'orders_order_items' })
Models.Mysql.OrderItems.belongsToMany(Models.Mysql.Orders, { through: 'orders_order_items' })
Models.Mysql.Orders.belongsToMany(Models.Mysql.OrderStatus, { through: 'orders_order_status' })
Models.Mysql.OrderStatus.belongsToMany(Models.Mysql.Orders, { through: 'orders_order_status' })
Models.Mysql.Orders.belongsToMany(Models.Mysql.Payments, { through: 'orders_payments' })
Models.Mysql.Payments.belongsToMany(Models.Mysql.Orders, { through: 'orders_payments' })
Models.Mysql.Bags.belongsTo(Models.Mysql.Products, { foreignKey: 'product_id' })

module.exports = {
	Addresses: Models.Mysql.Addresses,
	Bags: Models.Mysql.Bags,
	Contacts: Models.Mysql.Contacts,
	Inventory: Models.Mysql.Inventory,
	Orders: Models.Mysql.Orders,
	Preorders: Models.Mysql.Preorders,
	Products: Models.Mysql.Products
}
