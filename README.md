#  VanillaStates

A small state management implementation inspired by React's `useState` and `useEffect`.
Built from scratch — without React, without VDOM, just raw logic using global objects and function references — which makes it perfect to use in **Vanilla JavaScript**.

---

## Installation

```bash
npm i vanillastates
```

Then:

```js
import { useState, useEffect } from "vanillastates";
```

## `useState(initialValue)`

### Usage:

```js
const [count, setCount] = useState(0);

console.log(count()); // → 0

setCount((prev) => prev + 1);
console.log(count()); // → 1
```

### Returns:

* `getter()` → Returns the current state value.
  If passed a truthy param (e.g. `"get-id"`), returns internal ID (used for tracking).
* `setState(fn)` → Function-based setter. Pass a function that receives the current value and returns the next one.

---

##  `useEffect(fn, dependencies)`

### Usage:

```js
useEffect(() => {
  console.log("count changed:", count());
}, [count]);
```

### Behavior:

* Accepts a function and an array of *getter functions* from `useState`.
* Internally maps each dependency’s ID to the given function.
* Runs the effect immediately after setup.
* Re-runs only when the respective state changes.

---

## 🔧 Internal Flow

* `global.ids`: `{ [id]: stateValue }`
* `global.changeHooks`: `{ [id]: callbackFn }`

1. `useState` assigns a unique sequential ID to every state.
2. `useEffect` maps that ID to a callback, and calls it once immediately.
3. `setState` updates the value and calls the corresponding effect (via `handleChanges`).

---

## 🔨 `handleChanges(id)`

Internal function.
You don’t need to call this manually unless you're triggering effect execution outside the usual flow.

---

## Example

```js
const [count, setCount] = useState(0);
const [name, setName] = useState("Bavi");

useEffect(() => {
  console.log("Count is:", count());
}, [count]);

useEffect(() => {
  console.log("Hello", name());
}, [name]);

setCount((c) => c + 1);      // Logs: "Count is: 1"
setName((n) => "Baltej");    // Logs: "Hello Baltej"
```

---

## Notes

* This is **not a replacement** for React. It’s a lightweight concept showing how hooks can be mimicked.
* `getter("get-id")` returns the internal ID used by `useEffect` to track dependencies.
* Clear error messages are thrown if you pass invalid parameters to `useState` or `useEffect`.