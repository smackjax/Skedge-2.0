import {SCHED_ACT_TYPES as TYPES} from './_ACTION_TYPES';
import {genNewSched} from '../../sched-engine/sched-api';
import data from './data.actions';


export default {
    genNew:(startDateStr, endDateStr)=>{
        return (dispatch, getState)=>{
            dispatch({ type: TYPES.START_GEN_NEW  });
            // Make async to show loading spinner
            
            setTimeout(()=>{
                try{
                    const schedGenResults = genNewSched(startDateStr, endDateStr);
                    dispatch({
                        type: TYPES.SCHED_GEN_SUCCESS,
                        newMembVals: schedGenResults.newMembVals,
                        newTaskVals: schedGenResults.newTaskVals,
                        newSched: schedGenResults.newSched
                    });
                    dispatch({
                        type: TYPES.CHANGE_ACTIVE_SCHED,
                        newSchedId: schedGenResults.newSched.id
                    })
                    data.saveData();
                }
                catch(err){
                    dispatch({
                        type: TYPES.SCHED_GEN_FAIL,
                        errMsg: err.message                   
                    })
                }
            },1);

        }
    },
    changeActiveSchedId: (newSchedId)=>{
        return {
            type: TYPES.CHANGE_ACTIVE_SCHED,
            newSchedId
        }
    }
}