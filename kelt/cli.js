#!/usr/bin/env node
var kelt = require('./module'),
    vodevil = require('vodevil'),
    args = vodevil.sail( process.argv, '2:' );

// Prefix of parameters
kelt.command.prefix('--');

// Help command
kelt.command.action('help', function () {
    console.log('Kelt cli version 0.0.1');    
});

vodevil.intersect( kelt.parameters.list({ prefix: true }), function ( content, id ) {
    var parameters = kelt.parameters.list({ prefix: false });

    if ( content === args[0] ) {
        var command = kelt.command.action( parameters[ id ] );

        if ( 'undefined' !== command ) {
            command.exec();    
        } 
    } else {
        console.log('Kelt version 0.0.1 \n');
        console.log('type --help, for more information.');
    }
});
