import { DAYS_ACT_TYPES } from './_ACTION_TYPES';
import {addItem} from './_GENERIC.actions';

export default {
    saveDay: (dayObj)=>{
        return (dispatch)=>{
            const action = {
                type: DAYS_ACT_TYPES.SAVE_DAY,
                payload: dayObj
            }
            addItem(dispatch, action);
        }
    },



}