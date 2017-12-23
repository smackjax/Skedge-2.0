import {SCHED_ACT_TYPES as TYPES} from './_ACTION_TYPES';
import { genNewSched } from '../../brains/sched-api';
import data from './data.actions';

export default {
    schedGenSuccess: (schedData)=>{
        return {
            type: TYPES.SAVE_NEW_SCHED,
            payload: schedData
        }
    },
    changeActiveSchedId: (newSchedId)=>{
        return {
            type: TYPES.CHANGE_ACTIVE_SCHED,
            payload: newSchedId
        }
    }
}