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

// Clone action
kelt.command.action('clone', function ( source, destiny ) {
    kelt.template.clone( source, destiny );
});

kelt.parameter.help('clone', 'clone a template, from the source to your destiny.');

// List templates
kelt.command.action('list', function ( type ) {
    var fs = require('fs'),
        keltc = './keltc.json',
        config = undefined;

    if ( fs.existsSync( keltc ) ) {
        config = require( keltc );

        var templateList = fs.readdirSync( config.main ),
            header = 'List of ' + config.main,
            hr = ( new Array( header.length + 1 ) ).join('-'),
            separator = ',\n';

        if ( undefined !== type ) {
            templateList = vodevil.intersect( templateList, function ( item ) {
                if ( item.search( type ) > -1 ) {
                    return item;    
                }    
            });    

            if ( templateList.length === 0 ) {
                header = 'Sorry but not exists file with ' + type;    

                console.log( header );
            } else {
                console.log( header );    
                console.log( hr );
                console.log( templateList.join( separator ) );
            }
        } else {
            console.log( header );    
            console.log( hr );
            console.log( templateList.join( separator ) );
        }
    }
});

kelt.parameter.help('list', 'list of existing models. By extension or not.');

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
        command = kelt.command.action( currentParameter ),
        keltc = './keltc.json';

    if ( undefined !== command && content === args[0] ) {
        if ( 'clone' === currentParameter ) {
            if ( fs.existsSync( keltc ) ) {
                var config = require( keltc );
                
                if ( fs.existsSync( config.main ) ) {
                    // find slash, if not exist fill.
                    config['main'] = ( config.main.search('\/$') > -1 && config.main ) || config.main + '/';

                    var templateFile = config.main + args[1];

                    if ( fs.existsSync( templateFile ) ) {
                        command.exec( templateFile, args[2] );
                        console.log('Done \"%s\" was copied!', args[1]);
                    } else if ( !fs.existsSync( templateFile ) ) {
                        console.log( '\"%s\" not exists!', templateFile );    
                    }
                }
            } else {
                command.exec( args[1], args[2] ); 
            }
        } else if ( 'list' === currentParameter ) {
            command.exec( args[1] );
        } else {
            command.exec();    
        }
    } 
});

// Warning message if not have a typed parameter in the parameters list
if ( !vodevil.in( prefixParameters, args[0] ) ) {
    unrecognize();
}
