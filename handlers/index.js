'use strict';
const Utils = require('../utils').Utils

const Handlers = {
  Inventory: {
    List: (request, reply) => Utils.ReadData('../data/inventory.json', (err, data) => {
      if (err) reply (err)
      else reply(data)
    })
  }
}

module.exports = {
  Handlers: Handlers
}