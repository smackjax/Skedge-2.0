import {
    DATE_RANGE_ACT_TYPES,
    META_DATA_ACT_TYPES
} from './_ACTION_TYPES';

export default {
    dateRangeGenSuccess: (dateRangeObj)=>{
        return {
            type: DATE_RANGE_ACT_TYPES.SAVE_NEW_DATE_RANGE,
            payload: dateRangeObj
        }
    },

    deleteDateRangeById: (deleteId)=>{
        return {
            type: DATE_RANGE_ACT_TYPES.DELETE_DATE_RANGE,
            payload: deleteId
        }
    },

    changeActiveDateRangeId: (dateRangeId)=>{
        return {
            type: META_DATA_ACT_TYPES.CHANGE_ACTIVE_DATE_RANGE_ID,
            payload: dateRangeId
        }
    },
}