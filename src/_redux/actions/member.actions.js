import { MEMBER_ACT_TYPES as TYPE } from './_ACTION_TYPES';

import {addItem, deleteItem, editItem, updateItem} from './_GENERIC.actions';

// Functions use redux-thunk for dispatch()
export default {
    saveMember: (newMemb)=>{
        return (dispatch)=>{
            const action = {
                type: TYPE.SAVE_MEMBER,
                item: newMemb
            }
            addItem(dispatch, action)
        }
    },

    deleteMember: (membId)=>{
        return (dispatch)=>{
            const action = {
                type: TYPE.DELETE_MEMBER_BY_ID,
                membIdList
            };
            deleteItem(dispatch, action);
        }
    }
}
