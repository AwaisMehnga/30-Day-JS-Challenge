# **JS 30-Day Challenge — Day 1 Notes: The Type Enforcer**

---

## **1️ The 7 Primitives**

JavaScript has **7 primitive types**:

| Primitive   | Description                        | typeof Example                        |
| ----------- | ---------------------------------- | ------------------------------------- |
| `string`    | Textual data                       | `"hi"` → `"string"`                   |
| `number`    | All numbers (integers & floats)    | `123` → `"number"`                    |
| `bigint`    | Arbitrary large integers           | `10n` → `"bigint"`                    |
| `boolean`   | True or false values               | `true` → `"boolean"`                  |
| `undefined` | Variable declared but not assigned | `let x; x` → `"undefined"`            |
| `symbol`    | Unique, immutable identifier       | `Symbol("id")` → `"symbol"`           |
| `null`      | Explicit “no value”                | `null` → `"object"` (historical bug!) |

**Special notes:**

* `null` is a primitive but `typeof null === "object"` (bug preserved for backward compatibility)
* Primitives are immutable (cannot change their values).

---

## **2️ The `typeof` Trap**

`typeof` is coarse and has historical quirks.

| Expression     | typeof Result | Notes / Trap                                         |
| -------------- | ------------- | ---------------------------------------------------- |
| `null`         | `"object"`    | Bug — null is not an object                          |
| `[]`           | `"object"`    | Arrays are objects but can’t distinguish with typeof |
| `function(){}` | `"function"`  | Special callable type                                |
| `123`          | `"number"`    | Regular                                              |
| `"abc"`        | `"string"`    | Regular                                              |

**Pitfalls of `typeof`:**

```js
if (typeof value === "object") {
  // includes null and arrays
}
```

**Safe check for objects only:**

```js
if (value !== null && typeof value === "object" && !Array.isArray(value)) {
  // plain object
}
```

---

## **3️ `instanceof` Operator**

Checks **prototype chain**, not names or types.

```js
obj instanceof Constructor
```

### How it works:

* Checks whether `Constructor.prototype` exists **anywhere in `obj`’s prototype chain**.
* Does NOT check variable names, constructor names, or type labels.

### Example:

```js
function User() {}
const u = new User();

u instanceof User;   // true
u instanceof Object; // true
```

### When it fails:

1. **Cross-realm objects** (arrays from another iframe)
2. **Prototype reassignment**:

```js
User.prototype = {};
u instanceof User; // false
```

3. **Objects without prototypes**:

```js
const obj = Object.create(null);
obj instanceof Object; // false
```

**Rule:** Use `instanceof` for **class instances you control**, not for primitives or built-in types like arrays.

---

## **4️ Prototype & Prototype Chain (backup object system)**

**Definition:**

> Prototype = an object that acts as a **fallback** for missing properties.

When JS can’t find a property in the object itself, it looks **up the prototype chain** until it finds it or reaches `null`.

### Real example:

```js
const human = { eat() { console.log("eating"); } };
const student = { study() { console.log("studying"); } };

Object.setPrototypeOf(student, human);

student.study(); // "studying" — own property
student.eat();   // "eating" — inherited from prototype
```

### Array example:

```js
const arr = [];
arr.push(1); // works even though arr has no push method
```

* `push` lives on `Array.prototype`, not `arr` itself
* All arrays **share the same prototype** methods → memory-efficient

---

## **5️ The Holy Grail — `Object.prototype.toString.call(value)`**

**Purpose:** Reliable type detection for **all values**, including primitives, arrays, null, functions, and exotic objects.

```js
Object.prototype.toString.call(value); // "[object Type]"
```

### Examples:

| Value          | Output               |
| -------------- | -------------------- |
| `null`         | `[object Null]`      |
| `undefined`    | `[object Undefined]` |
| `"abc"`        | `[object String]`    |
| `123`          | `[object Number]`    |
| `true`         | `[object Boolean]`   |
| `[]`           | `[object Array]`     |
| `{}`           | `[object Object]`    |
| `new Date()`   | `[object Date]`      |
| `/regex/`      | `[object RegExp]`    |
| `function(){}` | `[object Function]`  |
| `new Map()`    | `[object Map]`       |
| `new Set()`    | `[object Set]`       |

**Helper function:**

```js
function getType(value) {
  return Object.prototype.toString.call(value).slice(8, -1);
}

getType([]);       // "Array"
getType(null);     // "Null"
getType(new Date());// "Date"
```

**Key Rule:**

> This method **never lies**. Always use it for exact type detection.

---

## **6️ `NaN` (Not a Number)**

* Represents **invalid numeric results**
* `typeof NaN === "number"` ✅
* `NaN !== NaN` ❌ (unique quirk of IEEE 754 floating point)

### Common sources:

```js
0 / 0;            // NaN
Math.sqrt(-1);    // NaN
parseInt("abc");  // NaN
```

### Correct detection:

```js
Number.isNaN(NaN); // true
Number.isNaN("abc"); // false
```

**Rule:** Never use `x === NaN` to detect it. Always use `Number.isNaN()`.

---

## **7️ Cheat sheet for Day 1**

| Concept                                                                | How to check safely                     | Notes / Pitfalls                        |
| ---------------------------------------------------------------------- | --------------------------------------- | --------------------------------------- |
| `string`, `number`, `bigint`, `boolean`, `undefined`, `symbol`, `null` | `typeof` (except null)                  | null returns `"object"`                 |
| `null`                                                                 | `value === null`                        | Must check explicitly                   |
| `array`                                                                | `Array.isArray(value)`                  | `typeof [] === "object"`                |
| `instance of class`                                                    | `obj instanceof Constructor`            | Prototype chain only; fails cross-realm |
| All objects / built-ins                                                | `Object.prototype.toString.call(value)` | Accurate type detection                 |
| `NaN`                                                                  | `Number.isNaN(value)`                   | Cannot use `===`                        |

---