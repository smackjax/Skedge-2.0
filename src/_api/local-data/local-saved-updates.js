// API to local storage(using localForage)
// localForage automatically stringifies/parses into JSON
// localForage returns promises
import localForage from 'localforage';
import updateSchedule from '../database/_updateSchedData';

// Which update object keys to write to local storage,
// and pushed to the database
const updateKeysToSave=["members", "groups", "tasks", "days", "meta" ];

// Save updates object
export const saveUpdatesToLocal=(updatesObj)=>{
    const updateKeys = Object.keys(updatesObj);
    // Get keys to save from this object
    const saveKeys = updateKeys.filter( 
        key=>updateKeysToSave.includes(key) 
    );
    saveKeys.forEach(
        // update/redux/firebase schedule/local key to save
        key=>{
            localForage.getItem(key)
            .then( savedObj=>{
                // If no information saved there yet, initialize
                if(!savedObj) return {}
                else return savedObj
            })
            .then( existingVals=>{
                // Spread both objects, overwriting old values with updated
                return {
                    ...existingVals,
                    ...updatesObj[key]
                }
            })
            .then(newValues=>{
                const newValueKeys = Object.keys(newValues);
                if(newValueKeys.length > 0){
                    localForage.setItem(key, newValues)
                    .catch(err=>{
                        console.log(`Couldn't save updates to ${key}`, err);
                    })
                }
            })
            .catch(err=>{
                console.log("Couldn't get data from local before update save", err);
            })
        }
    )
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
    updateKeysToSave.forEach(
        key=>{
            return localForage.getItem(key)
            .then(keyUpdates=>{
                // For example: keyUpdates would be 
                // the equivalent object found in "redux.members"
                const newUpdates = Object.keys(keyUpdates);
                // If there are updates stored under local key
                if(newUpdates.length > 0){
                    return updateSchedule(activeSchedId, key, keyUpdates)
                    .then(success=>{
                        return resetLocalKey(key)
                    })
                }
            })
        }
    )
}