const assert = require('chai').assert;
// const sayHello = require('../script/script').sayHello;
// const addNumbers = require('../script/script').addNumbers;
const app = require('../script/script');

describe('App', function() {
    describe('sayHello()', function(){
        it('sayHello should return hello', function() {
            assert.equal(app.sayHello(), 'hello');
        });
        it('sayHello should return type string', function() {
            let result = app.sayHello();
            assert.typeOf(result, 'string');
        });
    })


    it('addNumbers should return numbers > 5', function() {
        assert.isAbove(app.addNumbers(5,5), 5)
    });
});