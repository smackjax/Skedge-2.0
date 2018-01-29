import * as update from '../calculations';
import {
    SAVE_DAY
} from '../action-types';

export const saveDay=( dayObj )=>{
    return (dispatch, getState)=>{
        const updates = update.saveDay(getState(), dayObj);
        dispatch({
            type: SAVE_DAY,
            payload: updates
        })
        return Promise.resolve(true)
    }
}
