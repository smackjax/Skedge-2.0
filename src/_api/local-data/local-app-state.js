import localForage from 'localforage';
const appStateKey = "appState";
// Save redux state on every change,
// enabling someone to pick up right where they left off
export const saveState = async (state)=>{
    return localForage.setItem(appStateKey, state)
    .catch(err=>{
        console.log("Error saving data", err);
        throw Error("Couldn't save state to local data");
    })
}

// Load redux state on app load
export const loadState =  ()=>{
    return localForage.getItem(appStateKey)
    .then(loadedState=>{
        if(loadedState){
            const loadedItems = Object.keys(loadedState);
            return (loadedItems.length > 0 ) ?
                loadedState : {}
        }
        return {};
    })
    .catch(err=>{
        console.log("Error loading state", err);
        throw Error("Couldn't load state from local data");
    })
}