// Write three binary functions, add, sub, and mul, that take two numbers and return their sum, difference, and product.
// add(3, 4) --> 7
// sub(3, 4) --> -1
// mul(3, 4) --> 12

function add(num1, num2) {
  return num1 + num2;
}

function sub(num1, num2) {
  return num1 - num2;
}

function mul(num1, num2) {
  return num1 * num2;
}

//****************COUNTER OBJECT FUNCTION *********************************
// Write a counter function that returns an object containing two functions that implement an up/down counter, hiding the counter.

function counter(value) {
  return {
    up: function() {
      return value += 1;
    },
    down: function() {
      return value -= 1;
    }
  };
}


var object = counter(10),
up = object.up,
down = object.down;

console.log(up()); //11
console.log(down()); //10
console.log(down()); //9
console.log(up()); //10

//********************* REVOKE | INVOKE *****************************
// Make a revocable function that takes a binary function , & returns an object containing an invoke function that can invoke the binary function, & a revoke function that disables the invoke function.

function revocable(binary) {
  return {
    invoke: function(first, second) {
      if (binary !== undefined) {
        return binary(first, second);
      }
    },
    revoke: function() {
       binary = undefined;
    }
  };
}

var rev = revocable(add),
add_rev = rev.invoke;

console.log(add_rev(3, 4)); // 7
rev.revoke();
console.log(add_rev(5, 7)); // undefined

//***************** FUNCTION OBJECT CONSTRUCTOR **************************
// Write a function m that takes a value & an optoinal source string & returns them in an object.

function m(value, source) {
  return {
    value: value,
    source: (typeof source === 'string') ? source : String(value)
  };
}

console.log(JSON.stringify(m(1)));
// {"value": 1, "source": "1"}
console.log(JSON.stringify(m(Math.PI, "pi")));
// {"value": 3.14159..., "source": "pi"}

//******************* TAKES 2 OBJECTS & RETURN M OBJECT **************
// Write a function addm that takes two m objects & returns an m object.

function addm(a, b) {
  return m(a.value + b.value, "(" + a.source + "+" + b.source + ")");
}

console.log(JSON.stringify(addm(m(3), m(4))));
// {"value": 7, "source": "(3+4)"}
console.log(JSON.stringify(addm(m(1), m(Math.PI, "pi"))));
// {"value": 4.14159..., "source": "(1+pi)"}

//************************* MONAD - HASKEL **************************
// Write a function liftm that takes a binary function & a string & returns a function that acts on m objects.
function liftm(binary, op) {
  return function(a, b) {
    return m(binary(a.value, b.value), "(" + a.source + op + b.source + ")");
  };
}

var addm = liftm(add, "+");
console.log(JSON.stringify(addm(m(3), m(4))));
// {"value": 7, "source": "(3+4)"}
console.log(JSON.stringify(liftm(mul, "*")(m(3), m(4))));
// {"value": 12, "source": "(3*4)"}

//*******************************************************
// Modify function liftm so that the functions it produces can accept arguments that are either numbers or objects.

function liftm(binary, op) {
  return function(a, b) {
    if (typeof a === 'number') {
      a = m(a);
    }
    if (typeof b === 'number') {
      b = m(b);
    }
    return m(binary(a.value, b.value), "(" + a.source + op + b.source + ")");
  };
}

var addm = liftm(add, "+");
console.log(JSON.stringify(add(3, 4)));
// {"value": 7, "source": "(3+4)"}
