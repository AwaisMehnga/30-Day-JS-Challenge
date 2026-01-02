**Day 1: The Type Enforcer**.

As your Tech Lead, I have set up your environment expectations and created your first ticket. This task is critical because in JavaScript, type coercion and loose typing are the root of 30% of all runtime bugs. We need a library we can trust.

---

### **📋 Engineering Standards & Prerequisites**

Before you write a single line of code, ensure you understand the "Tools of the Trade" and the specific theory required for this ticket.

#### **1. Theory Prerequisites (Study this first)**

Don't just read the definitions; open your browser console and type them out to see *why* they behave this way.

* **The 7 Primitives:** `string`, `number`, `bigint`, `boolean`, `undefined`, `symbol`, `null`.
* **The `typeof` Trap:** Understand why `typeof null` returns `'object'` (a historical bug) and why `typeof []` is `'object'`.
* **The `instanceof` Operator:** How it checks the prototype chain.
* **The Holy Grail of Typing:** `Object.prototype.toString.call(value)`. (Learn how this allows you to see things like `[object File]` or `[object Date]`).
* **NaN (Not a Number):** Understand that `NaN` is technically a `number` type, but it is not equal to itself (`NaN === NaN` is false).

#### **2. Industry Standards (The Definition of "Done")**

* **Strict Mode:** Every JS file must start with `'use strict';`.
* **JSDoc:** Every function must have a comment block explaining parameters and return types.
```javascript
/**
 * Checks if the value is a pure object.
 * @param {any} value - The value to check.
 * @returns {boolean} - True if object, false otherwise.
 */

```


* **Pure Functions:** Your utility functions must not have side effects (no `console.log` inside the utility, only return values).
* **Naming:** Use `camelCase` for functions and variables. Use `is[Type]` for boolean checks (e.g., `isArray`, `isNull`).

---

### **🎫 Ticket: JS-001**

**Title:** Core Type Checking Utility Library
**Priority:** High
**Assignee:** You

**Description:**
JavaScript's native type checking is inconsistent. We need a reliable, standalone utility module (`TypeUtils`) that correctly identifies values, handling edge cases that native JS misses.

**Acceptance Criteria (AC):**

1. **Basic Types:** Create checks for String, Number, Boolean, Symbol, Undefined.
2. **The "Null" Fix:** Create `isNull(value)` which strictly returns true *only* for `null`.
3. **Arrays vs Objects:**
* `isArray(value)` must return true for `[]` but false for `{}`.
* `isObject(value)` must return true *only* for plain objects `{}` (POJO), not Arrays, not Null, not Dates.


4. **Special Number Cases:**
* `isRealNumber(value)`: Returns true for numbers, but **false** for `NaN` and `Infinity`.


5. **Emptiness (The Hard Part):**
* `isEmpty(value)`: Must return true for: `""`, `[]`, `{}`, `null`, `undefined`.



---

### **🛠️ Starter Kit**

Create a folder named `day-01-type-enforcer`. Inside, create three files.

**1. `index.html**` (The workbench)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Day 1: Type Enforcer</title>
</head>
<body style="font-family: monospace; padding: 20px;">
    <h2>Open your Console (F12) to run tests</h2>
    <script src="utils.js"></script>
    <script src="tests.js"></script>
</body>
</html>

```

**2. `utils.js**` (Your workspace - Fill in the logic)

```javascript
'use strict';

const TypeUtils = {
    // 1. Basic Wrapper around typeof (safe version)
    isString: function(value) {
        // TODO: Implement logic
    },

    isNumber: function(value) {
        // TODO: Implement logic
    },

    // 2. Fix the Null bug
    isNull: function(value) {
        // TODO: Implement logic (Hint: Don't use typeof)
    },

    isUndefined: function(value) {
        // TODO: Implement logic
    },

    // 3. Complex Structures
    isArray: function(value) {
        // TODO: Implement logic (Try Array.isArray or Object.prototype.toString)
    },

    isObject: function(value) {
        // TODO: Strict check for plain objects only! 
        // Hint: Array is an 'object' in JS, so you need to exclude it.
        // Hint: null is an 'object', exclude it.
    },

    // 4. Robust Number Check
    isRealNumber: function(value) {
        // TODO: Exclude NaN and Infinity
    },

    // 5. The "Empty" Check
    isEmpty: function(value) {
        // TODO: Return true if value is null/undefined
        // TODO: Return true if array length is 0
        // TODO: Return true if object has no keys
        // TODO: Return true if string length is 0
    }
};

```

**3. `tests.js**` (Your Quality Assurance)

```javascript
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

```

### **🚀 Your Mission**

1. Setup the files.
2. Open `index.html` in your browser.
3. You will see a lot of ❌ errors in the console.
4. Write the code in `utils.js` until all tests pass with ✅.

**Report back to me when you have all Green Checks.** If you get stuck on `isObject` (it's the trickiest one because JS thinks everything is an object), let me know and we'll pair-program that specific function.

Good luck.