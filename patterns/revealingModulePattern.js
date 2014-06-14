// ********************************************
// ********************************************
// The Revealing Module Pattern
// ********************************************
// ********************************************

var myRevealingModule = (function(){

    var privateVar = 'bananas',
        publicVar  = 'apples';

    function privateFunction(){
        console.log('Fruit: ' + privateVar);
    }

    function publicSetFruit(strName) {
        privateVar = strName;
    }

    function publicGetFruit(){
        privateFunction();
    }

    // Reveal public pointers to the
    // private functions and properties

    return {
        setFruit   : publicSetFruit,
        otherFruit : publicVar,
        getFruit   : publicGetFruit
    };

})();

myRevealingModule.setFruit('orange');


// with more specific naming
var myRevealingModule2 = (function(){
    var privateCounter = 0;

    function privateFunction(){
        privateCounter++;
    }

    function publicFunction(){
        publicIncrement();
    }

    function publicIncrement(){
        privateFunction();
    }

    function publicGetCount(){
        return privateCounter;
    }

    // Reveal public pointers to
    // private functions and props

    return {
        start: publicFunction,
        increment: publicIncrement,
        count: publicGetCount
    };
})();

myRevealingModule2.start();