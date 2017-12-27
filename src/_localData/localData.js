import localForage from 'localforage';
export const saveState = async (state)=>{
    try{
        
        const stringState = JSON.stringify(state);
        await localForage.setItem('state', stringState);
        console.log("Saved meta: ", state.meta);
    } catch(err){
        console.log("Data save failed")
        // Oh nooooooo!!!
    }
}

export const loadState =  ()=>{
    return localForage.getItem('state');
}