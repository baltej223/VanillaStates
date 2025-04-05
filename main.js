// Main Idea:
// Two global objects will be set up. Ids and changeHooks.
// When a new state will be defined, a new sequential ID will be genrated and a fresh entry will be made into id object with key being the sequential id and the value being the value of the state
// When the useEffect function is called then in global object changeHooks, a new pair, key being the id and the value being the function to be run at the time of state change is added and the function is ran immediately
// When the state is changed by state updated function, then the fn in changedHooks is executed.

global.ids = {};
global.changeHooks = {};
let idCounter = 0; // Sequential ID instead of random

export function useEffect(fn, dependencies) {
    if (typeof fn !== "function" || !Array.isArray(dependencies)) {
        throw new Error("BAD PARAMETERS: useEffect requires a function and an array.");
    }

    dependencies.forEach((getStateFn) => {
        if (typeof getStateFn !== "function") {
            throw new Error("BAD PARAMETERS: Dependencies must be numbers.");
        }
        let id = getStateFn("get-id");
        global.changeHooks[id] = fn;
    });

    // Run effect immediately after setting it
    dependencies.forEach((getStateFn) => {
        let id  = getStateFn("This is passed to get the id of the state");
        if (global.ids[id] !== undefined) {
            fn(global.ids[id]);
        }
    });

    // console.log("Updated changeHooks:", global.changeHooks);
}

export function handleChanges(id) {
    const fnToRun = global.changeHooks[id];
    if (typeof fnToRun === "function") {
        fnToRun(global.ids[id]);
    }
}

export function useState(initialValue) {
    let id = idCounter++;
    global.ids[id] = initialValue;

    // console.log("Initialized State:", global.ids);

    const setState = (updateValueFn) => {
        if (typeof updateValueFn !== "function") {
            throw new Error("State updater must be a function!");
        }

        global.ids[id] = updateValueFn(global.ids[id]);
        // console.log("Updated State:", global.ids);
        handleChanges(id);
    };
    /*
    param 1: A getter function,
     which will give the fresh value and if "get-id" [or anything else] is passed as a paaram then will return the id of the state. 
    */
   const getter = (get_id) =>{
    if (get_id == undefined){
        return global.ids[id];
    }
    else{
        return id;
    }
   }
    return [getter, setState, id]; // Return state as a getter function
}
