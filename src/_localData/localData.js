import localForage from 'localforage';
export const saveState = async (state)=>{
    try{
        const stringState = JSON.stringify(state);
        await localForage.setItem('state', stringState);
    } catch(err){
        // Oh nooooooo!!!
    }
}

export const loadState =  ()=>{
    return localForage.getItem('state');
}