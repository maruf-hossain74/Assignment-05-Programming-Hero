### 1. `var`, `let`, `const`

These keywords declare variables in JavaScript.

* **var** – function-scoped, can be redeclared & updated, hoisted.
* **let** – block-scoped, can be updated but not redeclared.
* **const** – block-scoped, cannot be updated or redeclared, must be initialized.

```javascript
let x = 10;
const y = 20;
// y = 30; // ❌ Error
```

---

### 2. Spread Operator `...`

The spread operator expands arrays or objects into individual elements.
It’s useful for **copying, merging, or adding items** without mutating the original data.

```javascript
const arr1 = [1,2];
const arr2 = [...arr1,3]; // [1,2,3]

const obj1 = {a:1};
const obj2 = {...obj1, b:2}; // {a:1, b:2}
```

---

### 3. `map()`, `filter()`, `forEach()`

These are array iteration methods with different purposes.

* **map()** → transforms elements, returns a new array.
* **filter()** → filters elements based on a condition, returns a new array.
* **forEach()** → executes a function on each element, no return.

```javascript
[1,2,3].map(x=>x*2);    // [2,4,6]
[1,2,3].filter(x=>x>1); // [2,3]
[1,2,3].forEach(x=>console.log(x));
```

---

### 4. Arrow Function

Arrow functions provide a **shorter syntax** for writing functions.
They also **inherit `this`** from the surrounding scope, which is helpful in callbacks and object methods.

```javascript
const add = (a,b) => a+b;
```

---

### 5. Template Literals

Template literals are **strings enclosed in backticks** `` ` ``.
They allow **variable interpolation** and **multi-line strings** easily.

```javascript
const name = "Maruf";
console.log(`Hello ${name}!
Welcome to JavaScript.`);
```

---
