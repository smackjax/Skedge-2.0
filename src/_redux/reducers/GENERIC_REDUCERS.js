// Filters out duplicate values from arrays before combining
const noDupes=(primaryArray, arrayToAdd)=>{
    const noDupeArray = primaryArray.filter(
        arrayVal=>!arrayToAdd.includes(arrayVal)
    )
    return [...noDupeArray, ...arrayToAdd]
}


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

// Bulk (addTo, removeFrom) actions
const genericBulkAction=(state, selectedIds, sublistKey, bulkIds, addToSublist)=>{
    const newState = {...state};
    // For each item of state in array
    for(const id of selectedIds){
        // Create a new array from the sublist Key
        let newSublist = newState[id][sublistKey].filter(
            // Filter out any ids in bulkIds
            subId=>!bulkIds.includes(subId)
        );
        // If this is an addition, add all bulkIds to filtered,
        // removing duplicates
        if(addToSublist){ newSublist = [...newSublist, ...bulkIds]}
        // Assign new sublist array to item under it's original key
        newState[id][sublistKey] = newSublist;
    }
    // Return new state with updated items
    return newState;
}

// Filters bulkIds from selected state id sublist
export const bulkRemoveFromSublist=(state, selectedIds, sublistKey, bulkIds)=>{
    return genericBulkAction(state, selectedIds, sublistKey, bulkIds, false);
}

// Adds all bulk ids back after filtering(removing duplicates)
export const bulkAddToSublist=(state, selectedIds, sublistKey, bulkIds)=>{
    return genericBulkAction(state, selectedIds, sublistKey, bulkIds, true);
}

export const removeIdsFromAllSublists=(state, idsToRemove, sublistKey)=>{
    const newState = {...state};
    const stateIds = Object.keys(newState);

    for(const id of stateIds){
        const newSublist = newState[id][sublistKey].filter(
            listId=>!idsToRemove.includes(listId)
        );
        newState[id][sublistKey] = newSublist;
    }
    return newState;
}

export const syncStateWithNewSave= (state, savedItemId, sublistKey, savedSublist)=>{
    const newState = {...state};
    const stateIds = Object.keys(newState);

    for(const id of stateIds){

        const newSublist = savedSublist.includes(id) ?

                // If item id is on saved sublist
            noDupes(state[id][sublistKey], [savedItemId]) : 
                
                // Item is not on new list
            state[id][sublistKey].filter(
                currentId=>currentId !== savedItemId
            );

        newState[id][sublistKey] = newSublist;
    }
    return newState;
}

// Save and delete actions
export const mainItems = {
    saveItem: (state, newItem)=>{
        return {
            ...state, 
            [newItem.id] :{
                ...newItem
            }
        }
    },
    deleteById: (state, idToDelete)=>{
        let newState = {...state};
        delete newState[idToDelete];
        return newState;
    }
}



export const deleteIdsByObject = (state, updatesObj, updateKey)=>{
    // If object for this state
    if(updatesObj[updateKey]){
        const idsToDelete = Object.keys(updatesObj[updateKey]);
        // and keys to update
        if(idsToDelete.length > 0){
            const newState = {...state};
            idsToDelete.forEach(
                id=>{
                    delete newState[id];
                }
            )
            return newState;
        }
    } 

    // Default to returning state(don't update)
    return state;    
}

export const updateByObject = (state, updatesObj, updateKey, cleanSlate)=>{
    
    const updates =  updatesObj[updateKey];
    // If there is an object for this slice of state
    if(updates){
        const ids = Object.keys(updates);
        // and there are ids to update
        if(ids.length > 0){
            const newState = {...state};
            // Check if item was deleted
            ids.forEach(
                id=>{
                    // If yes, delete item from state and updates
                    if(updates[id] === null){
                        delete newState[id];
                        delete updates[id];
                    }
                }
            )

            // Update any items not deleted
            return {
                ...newState,
                ...updates
            }
        }
    } 

    // If there is no corresponding object key to this state
    return cleanSlate ? 
        // Clear everything (if flag is set)
        {} : 
        // or just return state(don't update)
        state
}

// Always updates
export const overwriteByObject = (state, updatesObj, updateKey, baseState)=>{
    const newVals = updatesObj[updateKey];
            // Check for new values
            
    return  (newVals && Object.keys(newVals).length > 0) ?  
                { 
                    ...baseState,
                    ...newVals 
                } : 
            // If no new data, check for base state
            baseState ? 
                // If base state, return that
                {...baseState} :
                // Default to empty state
                {};
}