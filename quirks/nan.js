// Double check to make sure a number is not a number
function isThisActuallyANumber(data){
    return ( typeof data === 'number' && !isNaN(data) );
}