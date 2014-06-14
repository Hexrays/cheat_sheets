// ********************************************
// ********************************************
// The Singleton Pattern
// ********************************************
// ********************************************

var mySingleton = (function(){

    // Instance stores a reference to the singleton
    var instance;

    function init(){

        // Singleton

        // Private methods and variables
        var privateVariable     = 'I am also private';
        var privateRandomNumber = Math.random();

        function privateMethod(){
            console.log('I am private');
        }

        return {
            // Public methods and variables
            publicProperty: 'I am also public',

            publicMethod: function(){
                console.log('The public can see me!');
            },

            getRandomNumber: function(){
                return privateRandomNumber;
            }
        };
    }

    return {

        // Get the singleton instance if one exists
        // or create one if it doesn't
        getInstance: function(){
            if (!instance) {
                instance = init();
            }
            return instance;
        }

    };
})();

var myBadSingleton = (function(){

    // Instance stores a reference to the Singleton
    var instance;

    function init(){

        // Singleton

        var privateRandomNumber = Math.random();

        return {
            getRandomNumber: function(){
                return privateRandomNumber;
            }
        };
    }

    return {

        // Always create a new Singleton instance
        getInstance: function(){
            instance = init();

            return instance;
        }
    };
})();

// Usage:
var singleA = mySingleton.getInstance();
var singleB = mySingleton.getInstance();
console.log( singleA.getRandomNumber() === singleB.getRandomNumber() );

var badSingleA = myBadSingleton.getInstance();
var badSingleB = myBadSingleton.getInstance();
console.log( badSingleA.getRandomNumber() !==badSingleB.getRandomNumber() );


// Used in context

var SingletonTester = (function(){

    // options: an object containing configuration options for the singleton
    // e.g. var options = {name: 'test', pointX: 5};
    function Singleton(options){

        // set options supplied
        // or and empty obkect if none are provided
        options = options || {};

        // set some properties
        this.name = "SingletonTester";
        this.pointX = options.pointX || 6;
        this.pointY = options.pointY || 10;
    }

    // our instance holder
    var instance;

    // an emulation of static variables and methods
    var _static = {
        name: "SingletonTester",

        // Method for getting an instance. It returns
        // a singleton instance of a singleton object
        getInstance: function(options){
            if(instance === undefined) {
                instance = new Singleton(options);
            }
            return instance;
        }
    };

    return _static;

})();

var singletonTest = SingletonTester.getInstance({
    pointX: 5
});

// Log the output of pointX just to verify it is correct
// Outputs: 5
console.log(singletonTest.pointX);