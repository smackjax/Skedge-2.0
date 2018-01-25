import { DAYS_ACT_TYPES } from './_ACTION_TYPES';
import  * as api from '../../_firebase/api';

import { addItem } from './_GENERIC.actions';

export default {
    saveDay: (schedId, dayObj)=>{
        return (dispatch)=>{
            return api.saveDay(schedId, dayObj)
            .then(success=>{
                const action = {
                    type: DAYS_ACT_TYPES.SAVE_DAY,
                    payload: dayObj
                }
                addItem(dispatch, action);
                return true;
            })
            .catch(err=>{
                console.log('Error saving group: ', err);
                throw Error("Couldn't save group")
            })


        }
    },



}