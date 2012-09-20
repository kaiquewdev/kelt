(function () {
    var root = this;

    if ( 'undefined' !== exports ) {
        var Kelt = root.Kelt = exports;    
    }
    
    // Command prefix
    var commandPrefix = null;

    var Command = Kelt.command = {};

    Command.prefix = Kelt.command.prefix = function ( value ) {
        var output = commandPrefix;

        if ( value && 'string' === typeof( value ) ) {
            commandPrefix = value;    
            
            if ( commandPrefix ) {
                output = true;    
            }
        } else if ( 'undefined' === typeof( value ) ) {    
            output = commandPrefix;
        }

        return output;
    };

    // Command Action
    var commandActions = {};

    Command.action = Kelt.command.action = function ( action, value ) {
        var output = false;

        if ( action && 'undefined' === typeof( value ) ) {
            if ( action in commandActions ) {
                output = {
                    exec: commandActions[ action ]    
                };
            } else {
                output = undefined;    
            }
        } else if ( action && value ) {
            commandActions[ action ] = value;    

            if ( action in commandActions ) {
                output = true;    
            }
        } else if ( 'undefined' === typeof( action ) && 'undefined' === typeof( value ) ) {
            output = false;
        } 

        return output;
    };

    var Parameters = Kelt.parameters = {};

    Parameters.list = Kelt.parameters.list = function ( options ) {
        var vodevil = require('vodevil'),
            output = [];

        if ( options && 'prefix' in options ) {
            var actions = Object.keys( commandActions );

            output = vodevil.intersect( actions, function ( action ) {
                if ( options['prefix'] ) {        
                    action = Command.prefix() + action;
                }

                return action;
            });
        }

        return output;
    };

    var commandActionHelpers = {};

    var Parameter = Kelt.parameter = {};

    Parameter.help = Kelt.parameter.help = function ( action, value ) {
        var vodevil = require('vodevil'),
            actions = Object.keys( commandActions ),
            output = false;    

        if ( action && 'undefined' === typeof( value ) ) {
            if ( vodevil.in( actions, action ) ) {
               output = commandActionHelpers[ action ];    
            } else if ( !vodevil.in( actions, action ) ) {
                output = undefined;    
            } 
        } else if ( action && value ) {
            if ( vodevil.in( actions, action ) ) {
                commandActionHelpers[ action ] = value;    

                if ( commandActionHelpers[ action ] ) {
                    output = true;    
                }
            }     
        }

        return output;
    };
}).call(this);
