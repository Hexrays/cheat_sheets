// Object Creation

// each creates a new Object
var newObject  = {};
var newObject2 = Object.create(Object.prototype);
var newObject3 = new Object();


// es3 complatible

// 1. Dot syntax
// set
newObject.someKey = 'Hello World';

// get
var value = newObject.someKey;

// 2. Square breckets
// set
newObject['someKey'] = 'Hello World';

// get
var value = newObject.someKey;

// ES5
// 3. Object.defineProperty
// set
Object.defineProperty(newObject, 'someKey', {
    value        : 'for more control of the properties behavior',
    writable     : true,
    enumerable   : true,
    configurable : true
});

// Shorthand
var defineProp = function(obj, key, value) {
    var config = {
        value        : value,
        writable     : true,
        enumerable   : true,
        configurable : true
    };
    Object.defineProperty(obj, key, config);
};

var person = Object.create(Object.prototype);
defineProp(person, 'car',         'Delorean');
defineProp(person, 'dateOfBirth', '1981');
defineProp(person, 'hasBeard',    'true');

console.log(person);

Object.defineProperties(newObject, {

    'someKey': {
        value    : 'Hello World',
        writable : true
    },

    'anotherKey': {
        value    : 'Foo bar',
        writable : false
    }

});


// Basic Constructors
function Car( model, year, miles) {
    this.model = model;
    this.year  = year;
    this.miles = miles;

    this.toString = function() {
        return this.model + ' has done ' + this.miles + ' miles';
    };
}

var civic  = new Car('Honda Civic', 2009, 20000);
var mondeo = new Car('Ford Mondeo', 2010, 50000);

console.log(civic.toString());
console.log(mondeo.toString());

// Basic Constructors wit Prototypes
function Car( model, year, miles) {
    this.model = model;
    this.year  = year;
    this.miles = miles;
}

// we use Object.prototype.newMethod rather than Object.prototype
// to avoid redefining the prototype object
// This single instance will be shared between all Car objects.
Car.prototype.toString = function() {
        return this.model + ' has done ' + this.miles + ' miles';
    };

var civic  = new Car('Honda Civic', 2009, 20000);
var mondeo = new Car('Ford Mondeo', 2010, 50000);

console.log(civic.toString());
console.log(mondeo.toString());