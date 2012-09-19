(function () {
    var root = this;

    if ( 'undefined' !== exports ) {
        var Kelt = root.Kelt = exports;    
    }
    
    // Command CLI
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
}).call(this);
