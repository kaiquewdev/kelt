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
            expect( kelt.action('test') ).to.be.equal(undefined);    
        });
        
        test('set action', function () {
            
        });
    });
});
