import {
    deleteIdsFromStoreItems,
    saveItemAndSync,
    memberIdsToGroupIds
} from './_base-funcs';

export const saveMember=(store, newMemberObj )=>{
    return saveItemAndSync(store, 'members', newMemberObj, 'groups');
}
export const deleteMemberById=(store, memberId)=>{
    const allGroupIDs = Object.keys(store.groups);
    return deleteIdsFromStoreItems(store, 'groups', allGroupIDs,'members', [memberId], true);
}
export const addMemberIdsToGroupIds=(store, memberIds, groupIds)=>{
    return memberIdsToGroupIds(store, groupIds, memberIds, true);
}
export const removeMemberIdsFromGroupIds=(store, memberIds, groupIds)=>{
    return memberIdsToGroupIds(store, groupIds, memberIds, false);
}