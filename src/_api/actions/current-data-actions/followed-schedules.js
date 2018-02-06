import {
    UPDATE_FOLLOWED_SCHEDULES
} from '../action-types';

import { 
    getFollowedSchedulesFromDatabase, 
    getFollowedScheduleData 
} from '../database';

export const updateFollowedSchedules=()=>(
    (dispatch, getState)=>{
        return new Promise((resolve, reject)=>{

            // Retrieve schedules from database
            return getFollowedSchedulesFromDatabase()
            .then(followedSchedules=>{
                // Check if there is data
            
                if(!followedSchedules){
                    resolve(
                            dispatch({
                            type: UPDATE_FOLLOWED_SCHEDULES,
                            payload: {}
                        })
                    )
                } else {
                    // Get current data for each schedule
                    const followedIds = Object.keys(followedSchedules);
                    followedIds.forEach(scheduleId=>{
                        getFollowedScheduleData(scheduleId)
                        // Note that freshScheduleData could be null
                        .then(freshScheduleData=>{
                            const updates = {
                                followedSchedules: {
                                    [scheduleId] : freshScheduleData
                                }
                            };
                            dispatch({
                                type: UPDATE_FOLLOWED_SCHEDULES,
                                payload: updates
                            })
                        })
                        .catch(err=>{
                            console.log(`Problem getting followed schedule ${scheduleId}`, err);
                        })
                    })
                    resolve(followedIds)
                }
            })
            .catch(err=>{
                console.log("Couldn't get user's followed schedules from database", err);
                reject(err)
            })
        })
        
    }
)