import {
    SAVE_NEW_DATE_RANGE,
    DELETE_DATE_RANGE
} from '../action-types';

export const saveDateRange=(dateRangeObj)=>(
    (dispatch)=>{
        const updateObj = {
            dateRanges: {
                [dateRangeObj.id]: dateRangeObj
            }
        };
        dispatch({
            type: SAVE_NEW_DATE_RANGE,
            payload: updateObj
        })
    }
)
    

export const deleteDateRangeById=(dateRangeId)=>(
    (dispatch, getStore)=>{
        const updateObj = { 
            dateRanges: {
                [dateRangeId]: null
            }
        };
        
        dispatch({
            type: DELETE_DATE_RANGE,
            payload: updateObj
        })
    }
)
    
