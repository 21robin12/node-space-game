define(function () {
    function ArrayHelper() {}
    
    // adds @value to @array, provided it is not already there 
    // returns true if add was successful, otherwise returns false
    ArrayHelper.add = function (value, array) {
        var added = false;
        var index = array.indexOf(value);
        if (index < 0) {
            array.push(value);
            added = true;
        }

        return added;
    }
    
    // removes @vlaue from @array, provided it is there
    // returns true if remove was successful, otherwise returns false
    ArrayHelper.remove = function (value, array) {
        var removed = false;
        var index = array.indexOf(value);
        if (index > -1) {
            array.splice(index, 1);
            removed = true;
        }

        return removed;
    }
    
    // returns the first item in @array where @property is equal to @value
    ArrayHelper.getItemByValue = function (array, property, value) {
        var item = null;
        for (var i = 0; i < array.length; i++) {
            if (array[i][property] === value) {
                item = array[i];
            }
        }
        
        return item;
    }
    
    // returns all the values of @property of the items in @array
    ArrayHelper.getValues = function (array, property) {
        var values = [];
        for (var i = 0; i < array.length; i++) {
            values.push(array[i][property]);
        }

        return values;
    }
    
    return ArrayHelper;
});