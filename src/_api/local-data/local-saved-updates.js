// API to local storage(using localForage)
// localForage automatically stringifies/parses into JSON
// localForage returns promises
import localForage from 'localforage';
import updateSchedule from '../database/_updateSchedData';

// Which update object keys to write to local storage,
// and push to the schedule in database
const updateKeysToSave=["members", "groups", "tasks", "days", "dateRanges", "meta" ];

// Save updates object
export const saveUpdatesToLocal=(updatesObj)=>{
    const updateKeys = Object.keys(updatesObj);
    // Get keys to save from this object
    const saveKeys = updateKeys.filter( 
        key=>updateKeysToSave.includes(key) 
    );
    return new Promise((resolve, reject)=>{        
        Promise.all(
            saveKeys.map(
                // update/redux/firebase schedule/local key to save
                key=>(
                    localForage.getItem(key)
                    .then( savedObj=>{
                        // If no information saved there yet, initialize
                        if(!savedObj || !Object.keys(savedObj).length ) return {}
                        else return savedObj
                    })
                    .then( existingVals=>{
                        // Spread both objects, overwriting old values with updated
                        const updates = updatesObj[key] || {};
                        return {
                            ...existingVals,
                            ...updates
                        }
                    })
                    .then(newValues=>{
                        const newValueKeys = Object.keys(newValues);
                        if(newValueKeys.length > 0){
                            localForage.setItem(key, newValues)
                            .catch(err=>{
                                reject(`Couldn't save updates to ${key}`, err);
                            })
                        }
                    })
                    .catch(err=>{
                        reject("Couldn't get data from local before update save", err);
                    })
                )
            )
        ).then(success=>{
            resolve(true)
        })
    })
}

// Sets local key to empty object
const resetLocalKey = (key)=>{
    return localForage.setItem(key, {})
    .catch(err=>{
        console.log(`Couldn't reset local key ${key}`, err);
    })
}

// Pushes updates to firebase, 
// clears saved local keys on success
export const pushUpdates=(activeSchedId)=>{
    if(!activeSchedId) throw Error("No active schedule id set");
    
    return new Promise((resolve, reject)=>{
            Promise.all(
            updateKeysToSave.map(
                key=>(
                    localForage.getItem(key)
                    // For example: keyUpdates would be 
                    // the equivalent object in "getState().members"
                    .then(keyUpdates=>{
                        // If there are updates stored under local key
                        
                        if(keyUpdates && Object.keys(keyUpdates).length){
                        
                            return updateSchedule(activeSchedId, key, keyUpdates)
                            .then(success=>{
                                return resetLocalKey(key)
                            })
                        }
                        return true;
                    })
                    .catch(err=>{
                        console.log("Couldn't push updates", err);
                        reject(`Couldn't push update under ${key}`)
                    })
                )
            )
        )
        .then(success=>{
            resolve(true);
        })
    })
}