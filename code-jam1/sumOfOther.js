function sumOfOther(array) {
    let result = [];
    for (let i = 0; i < array.length; i++) {
        let tempArray = array.concat();
        tempArray.splice(i, 1);
        let sumOtherElem = tempArray.reduce(function(sum, current) {
            return sum + current;
            }, 0);
        result.push(sumOtherElem);
    }
    return(result);
};
