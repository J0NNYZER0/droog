'use strict'
const Lab = require('lab')
const { describe, it, expect } = exports.lab = Lab.script()

it('returns true when 1 + 1 equals 2', (done) => {

    expect(1 + 1).to.equal(2);
    done();
});