import { objToArr, arrToObj } from '../../../_FUNCTIONS/index';
import {
    checkInList,
    checkNotInList,
    includesAny
} from './utility-funcs';

/* Alll functions return an object with signature: 
{
    [reduxKey]: {
        [updatedItem]: {
            // Either null(for a deleted item)
            // or object fields
        }
    }
}
*/

// Adds ids to objects, 
export const addToSublist=(store, itemsKey, selectedIds, sublistKey, bulkIds)=>{
    const newState = {...store[itemsKey]};
    // Holds updated objects under their ids 
    const updates = {};

    // For each item of state in array
    for(const id of selectedIds){
        // Create a new array from the sublist Key
        let newSublist = newState[id][sublistKey].filter(
            // Filter out any ids in bulkIds
            subId=>!bulkIds.includes(subId)
        );
        newSublist = [...newSublist, ...bulkIds];

        // Assign new sublist array to item under it's original key
        updates[id] = {
            ...newState[id],
            [sublistKey]: newSublist
        }
    }
    // Return new state with updated items
    return {
        [itemsKey] : updates
    }
    
}

export const deleteIdsFromStoreItems=(store, itemsStoreKey, itemIds, deleteSublistKey, idsToDelete, deleteItemsUnderDeletedIds)=>{
    const items = store[itemsStoreKey];

    const updates = {};
    updates[itemsStoreKey]={};
    updates[deleteSublistKey]={};

    itemIds.forEach(
        itemId=>{
            const item = items[itemId];

            // Checks if array includes any values of another aray
            if(includesAny(item[deleteSublistKey], idsToDelete)){
                const newSublist = item[deleteSublistKey].filter(
                    subId=>!idsToDelete.includes(subId)
                )
                const newItem = {
                    ...item,
                    [deleteSublistKey]: newSublist
                }
                updates[itemsStoreKey][newItem.id] = newItem;
            }
        }
    )

    if(deleteItemsUnderDeletedIds){
        idsToDelete.forEach(
            id=>{
                updates[deleteSublistKey][id] = null;
            }
        )
    }
    return updates;
}

export const saveItemAndSync=(store, savedObjKey, savedObj, syncedListKey )=>{
    // These comments assume a 'member' was saved,
    // and therefore 'groups' need to be synced with the new 'member'[groups]

    // Get 'groups' part of state, 
    // turn it into a flat array
    const groups = objToArr(store[syncedListKey]);

    // Prepares to store any updates to state
    const updates = {};
    updates.members = {};
    updates.groups = {};
    
    // Loop through each group object
    groups.forEach(
        group=>{
            // Get state of id arrays on 
            // both new member and current group
            const inNewSavedList = 
                savedObj[syncedListKey].includes(group.id);
            const inSyncedList =
                group[savedObjKey].includes(savedObj.id);

            // If new member 'groups' id array 
            // matches the group's 'members' id array
            if(inNewSavedList === inSyncedList){
                // return. Nothing needs to happen.
                return;
            }
            // Otherwise, arrays need to be synced.

            // New 'group' array will either add or remove 'member' id, 
            // depending on if it was there to start with
            const newSyncedList = inSyncedList ?
                group[savedObjKey].filter(
                    id=>id !== savedObj.id
                ) :
                [...group[savedObjKey], savedObj.id];
            // Create new group object, overwriting previous 
            // 'members' array with updated one.
            const newGroup = {
                ...group, 
                [savedObjKey]: newSyncedList
            }
            // Add group to updates object, 
            // under it's id,
            // under 'groups'
            updates[syncedListKey][newGroup.id] = newGroup;
            
        }
    )

    // Save new member obj under it's id, 
    // under 'members'
    updates[savedObjKey][savedObj.id] = {...savedObj};

    // Return object with updates
    return updates;
}

// TODO this is redundant. Pair it down.
export const memberIdsToGroupIds=(store, groupIds, memberIds, addTo)=>{
    const groupState = {...store.groups};
    const memberState = {...store.members}; 

    const updates = {};
    updates["members"] = {};
    updates["groups"] =  {};

    groupIds.forEach(
        gId=>{
            // Get group
            const group = {...groupState[gId]};

            // Set list update test function
            const idCheck = addTo ? 
                checkInList :
                checkNotInList

            // Check if group will be updated
            const dontUpdate = 
                idCheck(
                    group.members,
                    memberIds
                );

            // If not updating, end iteration
            if(dontUpdate) return;

            // Always filter ids in list
            const filteredIds = group.members.filter(
                mId=>!memberIds.includes(mId)
            )
            // If adding ids, 
            const finalIds = addTo ?
                [...filteredIds, ...memberIds] : 
                [...filteredIds]

            group.members = finalIds;

            updates.groups[group.id] = group
        }
    )

    
    memberIds.forEach(
        mId=>{
            // Get group
            const member = {...memberState[mId]};

            // Set list update test function
            const idCheck = addTo ? 
                checkInList :
                checkNotInList;
            


            // Check if group will be updated
            const dontUpdate = 
                idCheck(
                    member.groups,
                    groupIds
                );

            // If not updating, end iteration
            if(dontUpdate) return;

            // Always filter ids in list
            const filteredIds = member.groups.filter(
                gId=>!groupIds.includes(gId)
            )
            // If adding ids, 
            const finalIds = addTo ?
                [...filteredIds, ...groupIds] : 
                [...filteredIds]
            member.groups = finalIds;
            updates.members[member.id] = member;
        }
    )
    

    return updates;
}   
