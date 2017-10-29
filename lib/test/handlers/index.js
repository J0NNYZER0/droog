'use strict'
const Lab = require('lab'),
	Code = require('code'),
	Server = require('../../index'),
	lab = exports.lab = Lab.script(),
	Bags = require('../../api').Bags,
	Inventory = require('../../api').Inventory,
	Orders = require('../../api').Orders,
	Products = require('../../api').Products

lab.experiment('TDD in handlers', () => {

	lab.test('initialization works!', done => {

		Code.expect(1 + 1).to.equal(2)
		done()
	})
})
