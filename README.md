# VanillaStates
Implemented States in Vanilla JS for no specific reason.

```Javascript
 // Usage Example
 var [getState, setState] = useState(21);
 var [getCounter, setCounter] = useState(0);


 console.log("GetState: ", getState());
console.log("getCounter:", getCounter());

 useEffect((state) => {
     console.log("The new value is:", state);
 }, [getState, getCounter]);

setInterval(() => {
    setState((prevState) => prevState + 1);
}, 2000);

setInterval(() => {
    setCounter((prevState) => prevState + 1);
}, 10000);
```
