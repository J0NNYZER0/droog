'use strict';
const Handlers = require('../handlers').Handlers

const Routes = {
  Inventory: [
    {
      method: 'GET',
      path: '/inventory/list',
      handler: Handlers.Inventory.List
    }
  ]
}

module.exports = {
  Routes: Routes
}

