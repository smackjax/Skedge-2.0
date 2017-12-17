import { GROUP_ACT_TYPES as TYPE} from './_ACTION_TYPES';
import {addItem, deleteItem, editItem, updateItem} from './_GENERIC.actions';

export default {
    saveGroup: (newGroup)=>{
        return (dispatch)=>{
            const action = {
                type: TYPE.SAVE_GROUP,
                item: newGroup
            }
            addItem(dispatch, action);
        }
    },
    deleteGroup: (groupId)=>{
        return (dispatch)=>{
            const action = {
                type: TYPE.DELETE_GROUP_BY_ID,
                item: groupId
            }
            deleteItem(dispatch, action);
        }
    }

}