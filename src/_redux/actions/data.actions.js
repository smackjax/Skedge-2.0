import {DATA_ACT_TYPES} from './_ACTION_TYPES';
import reduxStore from '../redux-store';
export default {
    saveData:  ()=>{
            const state = reduxStore.getState();
            const dispatch = reduxStore.dispatch;
            dispatch({
                type: DATA_ACT_TYPES.SAVING_STATE
            });
            try{
            const { 
                membersById, 
                groupsById,
                tasksById,
                daysOfWeek,
                schedsById
            } = state;
            const saveObject = {
                activeSchedId: state.ui.activeSchedId,
                membersById,
                groupsById,
                tasksById,
                daysOfWeek,
                schedsById
            };
            const saveString = JSON.stringify(saveObject);
            localStorage.setItem('react-skedge', saveString);
            dispatch({
                type: DATA_ACT_TYPES.SAVING_STATE_SUCCESS
            });
            }
            catch(e){
                dispatch({
                    type: DATA_ACT_TYPES.SAVING_STATE_FAILED,
                    msg: e.message
                });
            }
    },
    loadData: ()=>{
        const loadedData = localStorage.getItem('react-skedge');
        try{
            if(loadedData){
                const parsedData = JSON.parse(loadedData);
                return {
                    type: DATA_ACT_TYPES.LOAD,
                    data: parsedData
                }
            }
            else {
                return {
                    type: DATA_ACT_TYPES.LOADED_NO_DATA
                }
            }
        }
        catch(e) {
            return {
                type: DATA_ACT_TYPES.LOADING_DATA_FAIL,
                msg: e.message
            }
        }
    }


}