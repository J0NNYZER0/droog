'use strict'
const Lab = require('lab'),
	{ describe, it, expect } = exports.lab = Lab.script()

it('It returns true when 1 + 1 equals 2', (done) => {

	expect(1 + 1).to.equal(2)
	done()
})
/*
it('returns true when 1 + 1 equals 2', (done) => {

	expect(1 + 1).to.equal(21)
	done()
})*/