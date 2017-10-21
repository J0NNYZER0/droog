'use strict'
const Lab = require('lab'),
	Code = require('code'),
	Server = require('../index'),
	lab = exports.lab = Lab.script()

lab.experiment('Server route requests', () => {

	lab.test('returns status code of 200 / is requested', (done) => {

		Server.inject('/', (res) => {

			Code.expect(res.statusCode).to.equal(200)
			done()
		})
	})

	lab.test('returns a welcome message  when / is requested', (done) => {

		Server.inject('/', (res) => {

			Code.expect(res.result).to.equal('Welcome to Droog')
			done()
		})
	})

})
