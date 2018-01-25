import { MEMBER_ACT_TYPES as TYPE } from './_ACTION_TYPES';
import * as api from '../../_firebase/api';
import {
    addItem, 
    deleteItem,
    addBulkIds,
    removeBulkIds
} from './_GENERIC.actions';

export default {
    // Item actions
    saveMember: (schedId, newMemb)=>{
        return (dispatch)=>{

            return api.saveMember(schedId, newMemb)
            .then(success=>{
                const action = {
                    type: TYPE.SAVE_MEMBER,
                    payload: newMemb
                }
                addItem(dispatch, action);
                return true;
            })
            .catch(err=>{
                console.log('Error saving member: ', err);
                throw Error("Couldn't save member")
            })
        }
    },

    deleteMember: (schedId, membId)=>{
        return (dispatch)=>{
            return api.deleteMember(schedId, membId)
            .then( success=> {
                const action = {
                    type: TYPE.DELETE_MEMBER_BY_ID,
                    payload: membId
                };
                deleteItem(dispatch, action);
                return true;
            })
            .catch(err=>{
                console.log("Error deleting member ", err);
                throw Error("Couldn't delete member");
            })
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
