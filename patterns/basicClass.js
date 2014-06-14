// ********************************************
// ********************************************
// The Basic Classes
// ********************************************
// ********************************************


// A car "class"
function Car(model) {
    this.model = model;
    this.color = 'silver';
    this.year  = '1982';

    this.getInfo = function() {
        return this.model + ' ' + this.year;
    };
}

var myCar = new Car('ford');
myCar.year = '2010';

console.log(myCar.getInfo());

// Object Literal
var apple = {
    type    : 'mac',
    color   : 'silver',
    getInfo : function(){
        return this.color + ' ' + this.type + ' apple';
    }
};

// Singleton
// when you really want a constructor function that you'll only use once
// and there's no sense in giving it a name.
var apple = new function(){
    this.type    = 'mac';
    this.color   = 'silver';
    this.getInfo = function(){
        return this.color + ' ' + this.type + ' apple';
    };
}


// ES6!!!

class Person {
    constructor(name, age) {
        this.name = name;
        this.age  = age;
    }
}

class Developer extends Person {
    constructor(name, age, ...languages) {
        super(name, age);
        this.languages = [...languages];
    }
    printLanguages() {
        for(let lang of this.languages) {
            console.log(lang);
        }
    }
}

let me = new Developer('Jeff', 35, 'html', 'css', 'javascript');

// grunt traceur