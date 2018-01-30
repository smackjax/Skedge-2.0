// Utility function
import * as localData from '../local-data-api';
import { CHANGE_SYNC_STATUS } from '../action-types';
export const getActiveSchedId = (state)=>(state.meta.activeSchedId);

export const saveUpdatesAndPush = (activeSchedId, updates, dispatch)=>{
    return localData.saveUpdatesToLocal(updates)
    .then(success=>{
        localData.pushUpdates(activeSchedId)
        .then(success=>{
            const updates = {
                meta: {
                    syncedWithRemote: true
                }
            }

            dispatch({
                type: CHANGE_SYNC_STATUS,
                payload: updates
            })
        })
        .catch(err=>{
            console.log(err);
            const updates = {
                meta: {
                    syncedWithRemote: false
                }
            }

            dispatch({
                type: CHANGE_SYNC_STATUS,
                payload: updates
            })
        })
    })
}