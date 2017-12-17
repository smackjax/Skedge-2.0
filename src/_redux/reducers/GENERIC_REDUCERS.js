// Function for listening to changes in other state slices; 
// IE if a member is removed from a group, 
// then update that member sublist

// primaryStateKeys are item ids(member.id, group.id,etc...)
// propIdsSavedUnder is an array of ids on primaryStateKey obj
// Filters out savedItemId from array propIdsSavedUnder
// Then adds savedItemId back to primaryStateKeys that are on the
    // saved item's array of id's
// ...in other words(to my future self), it's magic. Roll with it.
export const updateSublist = (state, propIdsSavedUnder, savedItemId, savedItemNewIdArray)=>{
    const primaryStateKeys = Object.keys(state);
    const newState = primaryStateKeys.map(
        primaryId=>{
            // Always filters out id of saved item first
            const newGroups = state[primaryId]
                .filter(currentId=>currentId !== savedItemId);
            return savedItemNewIdArray.includes(primaryId) ? (
                { // obj to return if this is in the saved item's
                // array
                    ...state[primaryId],
                    [propIdsSavedUnder]: [...newGroups, savedItemId]
                    
                } 
            ):( 
            // If id is not in item.sublist
                { // Not on list item obj to return
                    ...state[primaryId],
                    // id already filtered out
                    [propIdsSavedUnder]: newGroups
                }
            )
        });            
    return newState;
}

const genericBulkAction=(state, selectedIds, sublistKey, bulkIds, addToSublist)=>{
    const newState = {...state};
    for(const id of selectedIds){
        let newSublist = newState[id][sublistKey].filter(
            subId=>!bulkIds.includes(subId)
        );
        if(addToSublist){ newSublist = [...newSublist, ...bulkIds]}
        newState[id][sublistKey] = newSublist;
    }
    return newState;
}

// Filters bulkIds from selected state id sublist
export const bulkRemoveFromSublist=(state, selectedIds, sublistKey, bulkIds)=>{
    return genericBulkAction(state, selectedIds, sublistKey, bulkIds, false);
}

// Sets to 'true' to add bulk ids back after filtering(removing duplicates)
export const bulkAddToSublist=(state, selectedIds, sublistKey, bulkIds)=>{
    return genericBulkAction(state, selectedIds, sublistKey, bulkIds, true);
}







// Basic CRUD actions
export const mainItems = {
    addNew: (state, newItem)=>{
        return {
            ...state, 
            [newItem.id] :{
                ...newItem
            }
        }
    },
    editName: (state, itemId, newName)=>{
        return {
            ...state, 
            [itemId]: {
                ...state[itemId], 
                name: newName
            }
        }
    },
    delete: (state, idsToDelete)=>{
        let newList = {...state};
        for(let q = 0; q < idsToDelete.length; q++){
            delete newList[idsToDelete[q]];
        }
        return newList;
    }

}