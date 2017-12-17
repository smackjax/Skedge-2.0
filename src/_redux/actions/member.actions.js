import { MEMBER_ACT_TYPES as TYPE } from './_ACTION_TYPES';

import {
    addItem, 
    deleteItem,
    addBulkIds,
    removeBulkIds
} from './_GENERIC.actions';

export default {
    // Item actions
    saveMember: (newMemb)=>{
        return (dispatch)=>{
            const action = {
                type: TYPE.SAVE_MEMBER,
                payload: newMemb
            }
            addItem(dispatch, action)
        }
    },
    deleteMember: (membId)=>{
        return (dispatch)=>{
            const action = {
                type: TYPE.DELETE_MEMBER_BY_ID,
                payload: membId
            };
            deleteItem(dispatch, action);
        }
    },
    // Bulk Actions
    addMembersToGroups: (membIds, groupIds)=>{
        const primaryIds = membIds;
        const bulkIds = groupIds;
        return (dispatch)=>{
            const action = {
                type: TYPE.ADD_MEMB_IDS_TO_GROUPS,
                payload: {
                    primaryIds,
                    bulkIds
                }
            }
            addBulkIds(dispatch, action)
        }
    },
    removeMembersFromGroups: (membIds, groupIds)=>{
        const primaryIds = membIds;
        const bulkIds = groupIds;
        return (dispatch)=>{
            const action = {
                type: TYPE.REMOVE_MEMB_IDS_FROM_GROUPS,
                payload: {
                    primaryIds,
                    bulkIds
                }
            }
            removeBulkIds(dispatch, action);
        }
    }
}
