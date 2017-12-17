import data from './data.actions';
// Multiple functions in case the logic needs to be changed
export const addItem = (dispatch, action)=>{
    dispatch(action);
    data.saveData();
}
export const deleteItem = (dispatch, action)=>{
    dispatch(action);
    data.saveData();
}
export const editItem = (dispatch, action)=>{
    dispatch(action);
    data.saveData();
}
export const updateItem = (dispatch, action)=>{
    dispatch(action);
    data.saveData();
}

export const addBulkIds = (selectedIds, addToIds)=>{

}
export const removeBulkIds = (selectedIds, removeFromIds)=>{
    
}