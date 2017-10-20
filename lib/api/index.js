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
					type: Sequelize.STRING,
					field: 'created_date',
					defaultValue: Utils.CreateDate
				},
				updated_date: {
					type: Sequelize.STRING,
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
					type: Sequelize.STRING,
					field: 'created_date',
					defaultValue: Utils.CreateDate
				}
			},
			{
				timestamps: false,
				underscored: true
			}),
			Contact: Orm.Mysql.define('contacts', {
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
					type: Sequelize.STRING,
					field: 'created_date',
					defaultValue: Utils.CreateDate
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
					type: Sequelize.STRING,
					field: 'created_date',
					defaultValue: Utils.CreateDate
				}
			},
			{
				timestamps: false,
				underscored: true
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
					type: Sequelize.STRING,
					field: 'created_date',
					defaultValue: Utils.CreateDate
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
					type: Sequelize.STRING,
					field: 'created_date',
					defaultValue: Utils.CreateDate
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
				}
			},
			{
				timestamps: false,
				underscored: true,
				freezeTableName: true
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
				price: {
					type: Sequelize.STRING,
					field: 'price'
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
					type: Sequelize.STRING,
					field: 'created_date',
					defaultValue: Utils.CreateDate
				}
			},
			{
				timestamps: false,
				underscored: true
			})
		}
	},
	Rels = {
		ProductsOrders: Models.Mysql.Orders.belongsTo(Models.Mysql.Products),
		ProductBags: Models.Mysql.Bags.belongsTo(Models.Mysql.Products, { foreignKey: 'product_id' })
	}

module.exports = {
	Bags: Models.Mysql.Bags,
	Inventory: Models.Mysql.Inventory,
	Orders: Models.Mysql.Orders,
	Products: Models.Mysql.Products
}
