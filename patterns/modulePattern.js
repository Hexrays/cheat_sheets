// ********************************************
// ********************************************
// The Module Pattern
// ********************************************
// ********************************************



// Object Literal
var myModule = {
    myProperty: 'some value',

    // obj literals can contain properties and methods
    // e.g. we can define a further object for module configuration
    myConfig: {
        useCaching: true,
        language: 'en'
    },

    // a very basic method
    saySomething: function(){
        console.log('Where in the world is Paul Irish?');
    },

    // output a value based on the current configuration
    reportMyConfig: function(){
        console.log('Caching is: ' + (this.myConfig.useCaching ? 'enabled' : 'disabled'));
    },

    // override the current config
    updateMyConfig: function(newConfig) {
        if( typeof newConfig === 'object' ) {
            this.myConfig = newConfig;
            console.log(this.myConfig.language);
        }
    }
};

myModule.saySomething();
myModule.reportMyConfig();
myModule.updateMyConfig({
    language: 'fr',
    useCaching: false
});
myModule.reportMyConfig();


// ********************************************
// ********************************************
// Self contained module
// ********************************************
// ********************************************

var testModule = (function(){
    var counter = 0;

    return {
        incrementCounter: function(){
            return counter++;
        },

        resetCounter: function(){
            console.log('counter valuse prior to reset: ' + counter);
            counter = 0;
        }
    };
})();

// Usage:
testModule.incrementCounter();
testModule.incrementCounter();
testModule.incrementCounter();
testModule.incrementCounter();

testModule.resetCounter();

// ********************************************
// ********************************************
// Module Tempalate
// ********************************************
// ********************************************

var myNamespace = (function(){
    var myPrivateVar, myPrivateMethod;

    // a private counter variable
    myPrivateVar = 0;

    // a private function which logs any arguements
    myPrivateMethod = function(foo) {
        console.log(foo);
    };

    return {

        // A public variable
        myPublicVar: 'foo',

        // a public function utilizing privates
        myPublicFunction: function(bar) {

            //incriment the private counter
            myPrivateVar++;

            // vall the private method using bar
            myPrivateMethod(bar);
        }
    };
})();

// ********************************************
// ********************************************
// Module EXAMPLE
// ********************************************
// ********************************************

var basketModule = (function(){

    //privates
    var basket = [];

    function doSomethingPrivate(){
        // ...
    }

    function doSomethingElsePrivate(){
        //...
    }

    // return an exposed object
    return {

        // Add items to our basket
        addItem: function(values) {
            basket.push(values);
        },

        // Get the count of items in the basket
        getItemCount: function(){
            return basket.length;
        },

        // public alias to a private function
        doSomething: doSomethingPrivate,

        // get the total values of items in the basket
        getTotal: function(){
            var q = this.getItemCount(),
                p = 0;

            while(q--) {
                p += basket[q].price;
            }

            return p;
        }
    };
})();

basketModule.addItem({
    item  : 'bread',
    price : 0.5
});

basketModule.addItem({
    item  : 'butter',
    price : 0.3
});

console.log(basketModule.getItemCount() );
console.log(basketModule.getTotal() );

// ********************************************
// ********************************************
// Module variations
// ********************************************
// ********************************************

// Global Module
var myModule = (function(jQ, _){

    function privateMethod1(){
        jQ('.container').html('test');
    }

    function privateMethod2(){
        console.log(_.min([10, 5, 100, 2, 1000]) );
    }

    return {
        publicMethod: function(){
            privateMethod1();
        }
    };

})(jQuery, _);


// Exports
var myModule = (function(){
    // module object
    var module     = {},
        privateVar = 'hello world';

    function privateMethod(){
        // ...
    }

    module.publicProperty = 'Foobar';
    module.publicMethod   = function(){
        console.log(privateVar);
    };

    return module;
})();

// jQuery
function library(module){
    $(function(){
        if(module.init){
            module.init();
        }
    });
    return module;
}

var myLibrary = library(function(){

    return {
        init: function(){
            // module implementation
        }
    };
}());