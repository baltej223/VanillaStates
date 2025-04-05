global.ids = {};
global.changeHooks = {};
let idCounter = 0; // Sequential ID instead of random

export function useEffect(fn, dependencies) {
    if (typeof fn !== "function" || !Array.isArray(dependencies)) {
        throw new Error("BAD PARAMETERS: useEffect requires a function and an array.");
    }

    dependencies.forEach((id) => {
        if (typeof id !== "number") {
            throw new Error("BAD PARAMETERS: Dependencies must be numbers.");
        }
        global.changeHooks[id] = fn;
    });

    // Run effect immediately after setting it
    dependencies.forEach((id) => {
        if (global.ids[id] !== undefined) {
            fn(global.ids[id]);
        }
    });

    console.log("Updated changeHooks:", global.changeHooks);
}

function handleChanges(id) {
    const fnToRun = global.changeHooks[id];
    if (typeof fnToRun === "function") {
        fnToRun(global.ids[id]);
    }
}

export function useState(initialValue) {
    let id = idCounter++;
    global.ids[id] = initialValue;

    console.log("Initialized State:", global.ids);

    const setState = (updateValueFn) => {
        if (typeof updateValueFn !== "function") {
            throw new Error("State updater must be a function!");
        }

        global.ids[id] = updateValueFn(global.ids[id]);
        console.log("Updated State:", global.ids);
        handleChanges(id);
    };

    return [() => global.ids[id], setState, id]; // Return state as a getter function
}
