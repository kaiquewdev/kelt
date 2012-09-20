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
    });
});
