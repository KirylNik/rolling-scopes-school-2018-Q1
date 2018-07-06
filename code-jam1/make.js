function make(...array) {
    bufferArray = array.concat();  // Буфер для хранения аргументов.
    
    function fun(...array) {  
        if (typeof array[0] == 'function') {  // Если передана функция, то применить функцию к аргументам и вернуть ответ.
            return(bufferArray.reduce(array[0])); 
        }
        bufferArray = bufferArray.concat(array); // Иначе добавить аргументы к буферу.
        return fun;
    }
    return fun;
};
