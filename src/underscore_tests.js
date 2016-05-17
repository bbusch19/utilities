/*jshint eqnull:true, expr:true*/

var _ = { };

(function() {

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    if (n) {
      return array.slice(0, n);
    } else {
      return array[0];
    }
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if (n >= array.length) {
      return array;
    }

    else if (n) {
      return array.slice(Math.max(array.length - n, 1));
    }
    else {
      return array[array.length - 1];
    }
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  _.each = function(collection, iterator) {
    var newArray = [];
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
        newArray.push(collection[i], i, collection);
      }
    }       else {
            for (var prop in collection) {
              iterator(collection[prop], prop, collection);
              newArray.push(collection[prop], prop, collection);
            }
          }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    for (var i = 0; i < array.length; i++) {
      if (array[i] === target) {
        return i;
      }
    }
    return -1;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, iterator) {
    var newArray = [];
    for (var i = 0; i < collection.length; i ++) {
      if(iterator(collection[i])) {
        newArray.push(collection[i]);
      }
    }
    return newArray;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, iterator) {
    var newArray = [];
    for (var i = 0; i < collection.length; i++) {
      if (iterator(collection[i])) {
        continue;
      } else {
        newArray.push(collection[i]);
      }
    }
    return newArray;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var obj = {};
     for (var i = 0; i < array.length; i++) {
         obj[array[i]] = true;
     }
     array = [];
     for (var key in obj) {
         array.push(key);
     }
     return array;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(array, iterator) {
    var newArray = [];
    for (var i = 0; i < array.length; i++) {
      newArray.push(iterator(array[i]));
    }
    return newArray;
  };

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(array, propertyName) {
    var newArray = [];
    for (var i = 0; i < array.length; i++) {
      newArray.push(array[i][propertyName]);
    }
    return newArray;
  };

  // Calls the method named by methodName on each value in the list.
  _.invoke = function(list, methodName, args) {
    var result = [];
    for (var i = 0; i < list.length; i++) {
      result.push(list[i].sort());
    }
    return result;
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  _.reduce = function(collection, iterator, initialValue) {
    if (initialValue) {
      var total = initialValue;
      for (var i = 0; i < collection.length; i++) {
        total = iterator(total, collection[i]);
      }
    } else {
      var total = 0;
      for (var i = 0; i < collection.length; i++) {
        total = iterator(total, collection[i]);
      }
    }
    return total;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        if (collection[i] === target) {
          return true;
        }
      }
      return false;
    }
    else {
      for (var prop in collection){
      if (collection[prop] === target) {
        return true;
      }
    }
    return false;
   }
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    if(collection.length === 0) return true;
    if(!iterator) return true;
    for (var i = 0; i < collection.length; i++) {
      if(!iterator(collection[i])) {
        return false;
      }
    }
    return true;
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
      if(collection.length === 0) return false;
      if(iterator) {
          for (var i = 0; i < collection.length; i++) {
              if (iterator(collection[i])) return true;
          }
      }
      else if (!iterator) {
          for (var i = 0; i < collection.length; i++) {
              if (collection[i]) return true;
          }
      }
      return false;
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  _.extend = function(obj) {
      for (var i = 1; i < arguments.length; i++) {
          var extendObj = arguments[0];
          for (var prop in arguments[i]) {
              extendObj[prop] = arguments[i][prop]
          }
      }
      return extendObj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
      for (var i = 1; i < arguments.length; i++) {
          var extendObj = arguments[0];
          for (var prop in arguments[i]) {
              if (!extendObj.hasOwnProperty(prop)) {
                  extendObj[prop] = arguments[i][prop];
              }
          }
      }
      return extendObj;
  };


  /**
   * FUNCTIONS
   * =========
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
      var called = false
      var ret;
       return function() {
           if (!called) {
               ret = func();
               called = true;
               return ret;
           } else {
               return ret;
           }
      }
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // Memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
      var results = {};
      return function(args) {
          if (results.hasOwnProperty(args)) {
              return results[args];
          } else {
              results[args] = func(args);
              return results[args];
          }
      }
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
      var arg1 = arguments[2];
      var arg2 = arguments[3];
      setTimeout(function() {
          return func(arg1, arg2);
      }, wait);
  };



  // Shuffle an array.
  _.shuffle = function(array) {
      var newArray = [];
      for (var i = 0; i < array.length; i++) {
          newArray.push(array[Math.floor(Math.random() * array.length)]);
      }
      return newArray;
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(co, it) {
    if (typeof co[0] === 'object') {
        return co.sort(it);
    }
    if (typeof it === 'string') {
        return co.sort(function(a, b) {
            return a[it] > b[it];
        });
    } else {
        for (var key in co) {
            return co.sort(function(a, b) {
                return a > b;
            });
        }
    }
};

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
      var ret = [];
      var args = arguments;
      for (var i = 0; i < args[0].length; i++) {
          ret.push([args[0][i]]);
      }
      for (var j = 1; j < args.length; j++) {
          for (var k = 0; k < ret.length; k++) {
              if (k < args[j].length) {
                  ret[k].push(args[j][k]);
              } else {
                  ret[k].push(undefined);
              }
          }
      }
      return ret;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  _.flatten = function(arr) {
      var ret = [];
      var arrTest = false;
      for (var i = 0; i < arr.length; i++) {
          ret = ret.concat(arr[i]);
          if (typeof arr[i] === 'object') {
              arrTest = true;
          }
      }
      return arrTest ? _.flatten(ret) : ret;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
      var arg = arguments;
      var ret = [];
      for (var i = 0; i < arg[0].length; i++) {
          var found = false;
          for (var j = 1; j < arg.length; j++) {
              if (arg[j].indexOf(arg[0][i]) !== -1) {
                  found = true;
              }
          }
          if (found) {
              ret.push(arg[0][i]);
          }
      }
      return ret;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
      var arg = arguments;
      var ret = [];
      for (var i = 0; i < arg[0].length; i++) {
          var found = false;
          for (var j = 1; j < arg.length; j++) {
              if (arg[j].indexOf(arg[0][i]) !== -1) {
                  found = true;
              }
          }
          if (!found) {
              ret.push(arg[0][i]);
          }
      }
      return ret;
  };

}).call(this);
