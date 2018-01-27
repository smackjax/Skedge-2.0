import { objToArr, arrToObj } from '../../_FUNCTIONS/index';
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
const addToSublist=(store, itemsKey, selectedIds, sublistKey, bulkIds)=>{
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

const deleteIdsFromStoreItems=(store, itemsStoreKey, itemIds, deleteSublistKey, idsToDelete, deleteItemsUnderDeletedIds)=>{
    const items = store[itemsStoreKey];
    const updates = {};

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
                    deleteSublistKey: newSublist
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

// Returns true if all ids are in the currentList
const checkInList=(currentIdList, idsToCheck)=>{
    let allInList = true;
    idsToCheck.forEach(
        id=>{
            if(!currentIdList.includes(id)){
                allInList = false;
            }
        }
    )
    return allInList;
}

// Returns true if none of the ids are in currentList
const checkNotInList=(currentIdList, idsToCheck)=>{
    let noneInList = true;
    idsToCheck.forEach(
        id=>{
            if(currentIdList.includes(id)){
                noneInList = false;
            }
        }
    )
    return noneInList;
}

// Returns true if first array has any items from second
const includesAny=(needles, haystack)=>{
    return needles.some(
        needle=>haystack.includes
    )
}


const saveItemAndSync=(store, membersKey, newMemberObj, groupsKey )=>{
    // These comments assume a 'member' was saved,
    // and therefore 'groups' need to be synced with the new 'member'[groups]

    // Get 'groups' part of state, 
    // turn it into a flat array
    const groups = objToArr({...store.groups});
    // Store any updates to state
    const updates = {};
    // Loop through each group object
    groups.forEach(
        group=>{
            // Get state of id arrays on 
            // both new member and current group
            const inNewSavedList = 
                newMemberObj.groups.includes(group.id);
            const inSyncedList =
                group[membersKey].includes(newMemberObj.id);

            // If new member 'groups' id array 
            // matches the group's 'members' id array
            if(inSavedList === inSyncedList){
                // return. Nothing needs to happen.
                return;
            }
            // Otherwise, arrays need to be synced.

            // New 'group' array will either add or remove 'member' id, 
            // depending on if it was there to start with
            const newSyncedList = inSyncedList ?
                inSyncedList.filter(
                    id=>id !== newMemberObj.id
                ) :
                [...inSyncedList, newMemberObj.id];
            // Create new group object, overwriting previous 
            // 'members' array with updated one.
            const newGroup = {
                ...group, 
                [membersKey]: newSyncedList
            }
            // Add group to updates object, 
            // under it's id,
            // under 'groups'
            updates[groupsKey][groupId] = newGroup;
        }
    )
    // Save new member obj under it's id, 
    // under 'members'
    updates[membersKey][newMemberObj.id] = {...newMemberObj};

    // Return object with updates
    return updates;
}

const memberIdsToGroupIds=(store, groupIds, memberIds, addTo)=>{
    const groupState = {...store.groups};
    const memberState = {...store.members}; 
    const updates = {};

    groupIds.forEach(
        gId=>{
            // Get group
            const group = {...groupState[gId]};

            // Set list update test function
            const idCheck = addTo ? 
                checkInList :
                checkNotInList

            // Check if group will be updated
            const willUpdate = 
                idCheck(
                    group.members,
                    memberIds
                );

            // If not updating, end iteration
            if(!willUpdate) return;

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
                checkNotInList

            // Check if group will be updated
            const willUpdate = 
                idCheck(
                    member.groups,
                    groupIds
                );

            // If not updating, end iteration
            if(!willUpdate) return;

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


// Exposed api functions
export const saveMember=(store, newMemberObj )=>{
    return saveItemAndSync(store, 'members', newMemberObj, 'groups');
}
export const saveGroup=(store, newGroupObj )=>{
    return saveItemAndSync(store, 'groups', newGroupObj, 'members');
}
export const saveTask=(store, newTaskObj )=>{
    return {
        tasks: {
            [newTaskObj.id]: newTaskObj
        }
    }
}
export const saveDay=(store, newDayObj)=>{
    return {
        days: {
            [newDayObj] : newDayObj
        }
    }
}
export const deleteMemberById=(store, memberId)=>{
    return deleteIdsFromStoreItems(store, 'groups', allGroupIDs,'members', [memberId], true);
}
export const deleteGroupById=(store, groupId)=>{
    const allMemberIds = Object.keys(store.members);
    const allTaskIds = Object.keys(store.tasks);
    const memberUpdates = deleteIdsFromStoreItems(store, 'members', allMemberIds,'groups', [groupId], true);
    const taskUpdates =  deleteIdsFromStoreItems(store, 'tasks', allTaskIds,'groups', [groupId], true);
    const updates = {
        ...memberUpdates,
        ...taskUpdates
    }
    return updates;
}
export const deleteTaskById=(store, taskId)=>{
    const allDayIds = Object.keys(store.days);
    return deleteIdsFromStoreItems(store, 'days', allDayIds, 'tasks', [taskId], true);
}
export const addMemberIdsToGroupIds=(store, memberIds, groupIds)=>{
    return memberIdsToGroupIds(store, groupIds, memberIds, true);
}
export const removeMemberIdsFromGroupIds=(store, memberIds, groupIds)=>{
    return memberIdsToGroupIds(store, groupIds, memberIds, false);
}
export const addGroupIdsToMemberIds=(store, groupIds, memberIds)=>{
    return memberIdsToGroupIds(store, groupIds, memberIds, true);
}
export const removeGroupIdsFromMemberIds=(store, groupIds, memberIds)=>{
    return memberIdsToGroupIds(store, groupIds, memberIds, false);
}
export const addGroupIdsToTaskIds=(store, groupIds, taskIds)=>{
    return addToSublist(store, 'tasks', taskIds, 'groups', groupIds);
}
export const removeGroupIdsFromTaskIds=(store, groupIds, taskIds)=>{
    return deleteIdsFromStoreItems( store, 'tasks', taskIds, 'groups', groupIds, false);
}
export const addTaskIdsToDayIds=(store, taskIds, dayIds)=>{
    return addToSublist(store, 'days', dayIds, 'tasks', taskIds);
}
export const removeTaskIdsFromDayIds=(store, taskIds, dayIds)=>{
    return deleteIdsFromStoreItems( store, 'days', dayIds, 'tasks', taskIds, false);
}