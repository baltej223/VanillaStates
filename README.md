# VanillaStates

A small state management implementation inspired by React's `useState` and `useEffect`.
Built from scratch — without React, without VDOM, just raw logic using global objects and function references, which makes it perfect to use in Vanilla JavaScript.

## `useState(initialValue)`

### Usage:

```js
const [count, setCount] = useState(0);

console.log(count()); // → 0

setCount((prev) => prev + 1);
console.log(count()); // → 1
```

### Returns:

- `getter()` → Get the current state value. If passed a truthy param (like `"get-id"`), returns internal ID.
- `setState(fn)` → Pass a function that receives the current state and returns the next.

---

## `useEffect(fn, dependencies)`

### Usage:

```js
useEffect(() => {
  console.log("count changed:", count());
}, [count]);
```

### Behavior:

- Accepts a function and an array of _getter functions_ from `useState`.
- Automatically links the internal IDs of states to the effect.
- Runs the effect immediately after setup.
- Re-runs only when the respective state changes.

---

## Internal Flow

- `global.ids`: `{ [id]: stateValue }`
- `global.changeHooks`: `{ [id]: callbackFn }`

1. `useState` assigns a unique sequential ID to every state.
2. `useEffect` maps that ID to a callback, and calls it once immediately.
3. `setState` updates the value and calls the corresponding effect (via `handleChanges`).

---

## 🔧 `handleChanges(id)`

Internal function. You don’t need to call this unless manually triggering state-linked effects.

---

## 📦 Example

```js
const [count, setCount] = useState(0);
const [name, setName] = useState("Bavi");

useEffect(() => {
  console.log("Count is:", count());
}, [count]);

useEffect(() => {
  console.log("Hello", name());
}, [name]);

setCount((c) => c + 1); // Logs: "Count is: 1"
setName((n) => "Baltej"); // Logs: "Hello Baltej"
```

---

## ❗ Notes

- This is not a replacement for React. It’s just a lightweight concept showing how hooks can be mimicked.
- `getter("get-id")` or any param will return the ID, used internally for dependency tracking.
- If you mess up the parameters (e.g., pass non-functions), it throws clear errors.
