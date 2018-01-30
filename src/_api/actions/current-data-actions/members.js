import * as update from '../calculations';

import { getActiveSchedId, saveUpdatesAndPush } from './_utilityFuncs';

import {
    SAVE_MEMBER,
    DELETE_MEMBER_BY_ID,
    ADD_MEMBER_IDS_TO_GROUP_IDS,
    REMOVE_MEMBER_IDS_FROM_GROUP_IDS
} from '../action-types';

export const saveMember=( memberObj )=>{
    return (dispatch, getState)=>{
        const state = getState();
        const updates = update.saveMember(state, memberObj);

        dispatch({
            type: SAVE_MEMBER,
            payload: updates
        });

        const activeSchedId = getActiveSchedId(state);
        // Returns a promise with sync state, don't end with semi-colon
        return saveUpdatesAndPush(activeSchedId, updates, dispatch)
    }
}
export const deleteMemberById=( memberId )=>{
    return (dispatch, getState)=>{
        const state = getState();
        const updates = update.deleteMemberById(state, memberId);
        dispatch({
            type: DELETE_MEMBER_BY_ID,
            payload: updates
        })

        const activeSchedId = getActiveSchedId(state);
        // Returns a promise with sync state, don't end with semi-colon
        return saveUpdatesAndPush(activeSchedId, updates, dispatch)
    }
}
export const addMemberIdsToGroupIds=(membIds, groupIds)=>{
    return (dispatch, getState)=>{
        const state = getState();
        const updates = update.addMemberIdsToGroupIds(state, membIds, groupIds)
        dispatch({
            type: ADD_MEMBER_IDS_TO_GROUP_IDS,
            payload: updates
        })

        const activeSchedId = getActiveSchedId(state);
        // Returns a promise with sync state, don't end with semi-colon
        return saveUpdatesAndPush(activeSchedId, updates, dispatch)
    }
}

export const removeMemberIdsFromGroupIds=(membIds, groupIds)=>{
    return (dispatch, getState)=>{
        const state = getState();
        const updates = update.removeMemberIdsFromGroupIds(state, membIds, groupIds);
        dispatch({
            type: REMOVE_MEMBER_IDS_FROM_GROUP_IDS,
            payload: updates
        })

        const activeSchedId = getActiveSchedId(state);
        // Returns a promise with sync state, don't end with semi-colon
        return saveUpdatesAndPush(activeSchedId, updates, dispatch)
    }
}