'use strict';

const Hapi = require('hapi'),
  Server = new Hapi.Server(),
  Utils = require('./utils').Utils,
  Routes = require('./routes').Routes

Server.connection({ 
    host: 'localhost', 
    port: 8000
})

// Add the route
Server.route([].concat(Routes.Inventory))

// Start the server
Server.start(err => {

    if (err) throw err;
    console.log('Server running at:', Server.info.uri, 'on ' + Utils.CreateHumanReadableDate());
})