import * as update from '../calculations';

import {
    SAVE_MEMBER,
    DELETE_MEMBER_BY_ID,
    ADD_MEMBER_IDS_TO_GROUP_IDS,
    REMOVE_MEMBER_IDS_FROM_GROUP_IDS
} from '../action-types';

export const saveMember=( memberObj )=>{
    return (dispatch, getState)=>{
        const updates = update.saveMember(getState(), memberObj);
        dispatch({
            type: SAVE_MEMBER,
            payload: updates
        });
        return Promise.resolve( true )
    }
}
export const deleteMemberById=( memberId )=>{
    return (dispatch, getState)=>{
        const updates = update.deleteMemberById(getState(), memberId);
        dispatch({
            type: DELETE_MEMBER_BY_ID,
            payload: updates
        })
        return Promise.resolve(true )
    }
}
export const addMemberIdsToGroupIds=(membIds, groupIds)=>{
    return (dispatch, getState)=>{
        const updates = update.addMemberIdsToGroupIds(getState(), membIds, groupIds)
        dispatch({
            type: ADD_MEMBER_IDS_TO_GROUP_IDS,
            payload: updates
        })
        return Promise.resolve(true)
    }
}

export const removeMemberIdsFromGroupIds=(membIds, groupIds)=>{
    return (dispatch, getState)=>{
        const updates = update.removeMemberIdsFromGroupIds(getState(), membIds, groupIds);
        dispatch({
            type: REMOVE_MEMBER_IDS_FROM_GROUP_IDS,
            payload: updates
        })
        return Promise.resolve(true)
    }
}