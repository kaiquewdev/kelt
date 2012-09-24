var chai = require('chai'),
    expect = chai.expect,
    should = chai.should(),
    kelt = require('../module');

suite('Kelt', function () {
    suite('Command prefix', function () {
        test('null prefix', function () {
            expect( kelt.command.prefix() ).to.be.equal(null);    
        });
        
        test('set prefix', function () {
            expect( kelt.command.prefix('--') ).to.be.true;    
        });

        test('get prefix', function () {
            expect( kelt.command.prefix() ).to.be.equal('--');        
        });
    });

    suite('Command action', function () {
        test('undefined action', function () {
            expect( kelt.command.action('test') ).to.be.equal(undefined);    
        });
        
        test('set action', function () {
            expect( kelt.command.action('test', function () { return 'this is a test!' }) ).to.be.true;    
        });

        test('get and exec action', function () {
            expect( kelt.command.action('test').exec() ).to.be.equal('this is a test!');    
        });

        test('false action', function () {
            expect( kelt.command.action() ).to.be.false;    
        });
    });

    suite('Paramaters', function () {
        test('list parameters with prefix', function () {
            var input = kelt.parameters.list({prefix: true});    

            expect( input ).to.deep.equal( ['--test'] );
        });    

        test('list parameters without prefix', function () {
            var input = kelt.parameters.list({prefix: false});    

            expect( input ).to.deep.equal( ['test'] );
        });

        test('false help if not receive parameters', function () {
            expect( kelt.parameter.help() ).to.be.false;    
        });

        test('undefined help parameter', function () {
            expect( kelt.parameter.help('test') ).to.be.equal(undefined);    
        });

        test('set help parameter', function () {
            expect( kelt.parameter.help('test', 'help test') );    
        });

        test('get help parameter', function () {
            expect( kelt.parameter.help('test') ).to.be.equal('help test');    
        });
    });
    
    suite('Template', function () {
        test('copy a template project', function () {
            expect( 
                kelt.template.clone(
                    '/home/kaique/templates/hello', 
                    '/home/kaique/cases/test-case'
                ) 
            ).to.be.true;    
        });

        test('undefined template directory', function () {
            expect( kelt.template.source() ).to.be.equal(undefined);    
        });

        test('set template directory', function () {
            expect( kelt.template.source('/home/kaique/templates') ).to.be.true;    
        });

        test('set template fail', function () {
            expect( kelt.template.source('/home/kaique/template') ).to.be.false;   
        });

        test('get template directory', function () {
            expect( kelt.template.source() );    
        });
    });
});
