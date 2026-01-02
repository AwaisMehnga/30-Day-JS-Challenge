'use strict';

console.group('🧪 Running Test Suite for JS-001');

function assert(description, result, expected) {
    if (result === expected) {
        console.log(`✅ ${description}`);
    } else {
        console.error(`❌ ${description} | Expected: ${expected}, Got: ${result}`);
    }
}

// TEST CASES
console.log('--- Primitives ---');
assert('isString("hello")', TypeUtils.isString("hello"), true);
assert('isString(123)', TypeUtils.isString(123), false);

console.log('--- Null & Undefined ---');
assert('isNull(null)', TypeUtils.isNull(null), true);
assert('isNull(undefined)', TypeUtils.isNull(undefined), false);
// The famous bug check
assert('isNull({})', TypeUtils.isNull({}), false); 

console.log('--- Objects vs Arrays ---');
assert('isArray([])', TypeUtils.isArray([]), true);
assert('isArray({})', TypeUtils.isArray({}), false);
assert('isObject({})', TypeUtils.isObject({}), true);
assert('isObject([])', TypeUtils.isObject([]), false); // Strict check!
assert('isObject(null)', TypeUtils.isObject(null), false); 

console.log('--- Real Numbers ---');
assert('isRealNumber(42)', TypeUtils.isRealNumber(42), true);
assert('isRealNumber(NaN)', TypeUtils.isRealNumber(NaN), false);
assert('isRealNumber(Infinity)', TypeUtils.isRealNumber(Infinity), false);

console.log('--- Empty Checks ---');
assert('isEmpty("")', TypeUtils.isEmpty(""), true);
assert('isEmpty([])', TypeUtils.isEmpty([]), true);
assert('isEmpty({})', TypeUtils.isEmpty({}), true);
assert('isEmpty({a:1})', TypeUtils.isEmpty({a:1}), false);
assert('isEmpty([1])', TypeUtils.isEmpty([1]), false);

console.groupEnd();