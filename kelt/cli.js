#!/usr/bin/env node
var kelt = require('./module'),
    vodevil = require('vodevil'),
    args = vodevil.sail( process.argv, '2:' );

// Prefix of parameters
kelt.command.prefix('--');

// Help command
kelt.command.action('help', function () {
    console.log('Kelt cli version 0.0.1 \n');

    vodevil.intersect( kelt.parameters.list({ prefix: true }), function ( content, id ) {
        var parameters = kelt.parameters.list({ prefix: false });
        var help = kelt.parameter.help( parameters[ id ] );

        console.log( ' %s - %s \n', content, help );
    });
});

kelt.parameter.help('help', 'helt to use this cli.');

// Clone action
kelt.command.action('clone', function ( source, destiny ) {
    kelt.template.clone( source, destiny );
});

kelt.parameter.help('clone', 'clone a template, from the source to your destiny.');

// Start action
kelt.command.action('start', function () {
    var fs = require('fs'),
        source = './keltc.json',
        options = {
            main: ''
        };

    if ( source ) {
        fs.writeFileSync(
            source,
            JSON.stringify( options )
        );

        if ( fs.existsSync( source ) ) {
            console.log(
                'Started, check the file: %s, and insert' +
                'the path of template directory!', 
                source
            );
        }
    }
});

kelt.parameter.help('start', 'Create the config file.');

// Unrecognized action
var unrecognize = function () {
    console.log('Kelt version 0.0.1 \n');
    console.log('use --help, to have more information, about this cli.');
};

// prefixed parameters
var prefixParameters = kelt.parameters.list({
    prefix: true    
});

// Main slice if cli
vodevil.intersect( prefixParameters, function ( content, id ) {
    var fs = require('fs'),
        parameters = kelt.parameters.list({ prefix: false }),
        currentParameter = parameters[ id ],
        command = kelt.command.action( currentParameter );

    if ( undefined !== command && content === args[0] ) {
        if ( 'clone' === currentParameter ) {
            if ( fs.existsSync( './keltc.json' ) ) {
                var config = JSON.parse( fs.readFileSync( './keltc.json' ) );
                
                if ( fs.existsSync( config.main ) ) {
                    config['main'] = ( config.main.search('\/$') > -1 && config.main ) || config.main + '/';
                    command.exec( config.main + args[1], args[2] );
                }
            } else {
                command.exec( args[1], args[2] ); 
            }
        } else {
            command.exec();    
        }
    } 
});

// Warning message if not have a typed parameter in the parameters list
if ( !vodevil.in( prefixParameters, args[0] ) ) {
    unrecognize();
}
