'use strict'
const Lab = require('lab'),
	Code = require('code'),
	Server = require('../index'),
	lab = exports.lab = Lab.script()

lab.experiment('Server local initialization', () => {

	lab.test('return a server instance running with specified connection configuration', done => {

		Code.expect(Server.info.protocol).to.equal('http')
		Code.expect(Server.info.host).to.equal('0.0.0.0')

		if (process.env.PORT) {
			Code.expect(Server.info.port).to.equal(process.env.PORT)
		}
		else {
			Code.expect(Server.info.port).to.equal(8000)
		}

		done()
	})

	lab.test('return a server instance running on the specified location', done => {

		Code.expect(Server.info.uri).to.equal('http://0.0.0.0:8000')
		done()
	})
})

lab.experiment('Server route requests', () => {

	lab.test('returns status code of 200 when / is requested', done => {

		Server.inject('/', (res) => {

			Code.expect(res.statusCode).to.equal(200)
			done()
		})
	})

	lab.test('returns a welcome message  when / is requested', done => {

		Server.inject('/', (res) => {

			Code.expect(res.result).to.equal('Welcome to Droog')
			done()
		})
	})

})
