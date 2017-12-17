import {GROUP_ACT_TYPES as TYPES, 
    MEMBER_ACT_TYPES as MEMB_TYPES,
    TASK_ACT_TYPES as TASK_TYPES,
    DATA_ACT_TYPES} from '../actions/_ACTION_TYPES';
import { updateSublist, mainItems} from './GENERIC_REDUCERS';

export default function(state={
    groupId1: {
        id: 'groupId1',
        name: 'Cannoneers',
        members: ['membId1', 'membId3', 'membId2'],      
    },
    groupId2: {
        id: 'groupId2',
        name: 'Crewmen',
        members: ['membId1']  
    },
    groupId3: {
        id: 'groupId3',
        name: 'Captains',
        members: ['membId2']  
    },
}, action){
    const payload = action.payload;

    switch(action.type){
        case DATA_ACT_TYPES.LOAD: {
            return {
                ...action.data.groupsById
            }
        }

        // payload = {...group}
        case TYPES.ADD_GROUP: 
            return mainItems.addNew(state, action.newGroup);

        // payload = "groupId"
        case TYPES.DELETE_GROUPS:
            return mainItems.delete(state, action.groupIdList);


        
        case TYPES.UPDATE_MEMBERS_IN_GROUPS: {
            const newState = {...state};
            // If group id in list
            // overwrite it's members with new
            for(let gId of action.groupIds){
                newState[gId].members = [...action.membIds];
            }
            return {...newState};
        }


        //action.membIds,
        // action.groupIds,
        case TYPES.ADD_MEMBERS_TO_GROUPS: 
        return updateSublist.addIds(state, action.groupIds, 'members', action.membIds);


            // ** LISTENERS
        // Listens for group sublist updates on members and tasks
        
        // action.membIds
        // action.groupIds
        case MEMB_TYPES.UPDATE_GROUP_SUBLIST:{
            // Compare group list to total,
            // Remove ids that aren't on groupIds list 
            // Add ids to groups that are on the list
            const newState = {...state};
            const allGroupIds =  Object.keys(state);
            for(let gId of allGroupIds){
                // If the member belongs to groupId(is checked in list)
                if(action.groupIds.includes(gId)){ 
                    const noDupeIds = action.membIds.filter( 
                        mId=>!newState[gId].members.includes(mId)
                    );
                    newState[gId].members = [...newState[gId].members, ...noDupeIds];
                }
                else {
                    const newMembers = newState[gId].members.filter(
                        mId=>!action.membIds.includes(mId) 
                    );
                    newState[gId].members = newMembers;
                }
            }
            return {...newState};
        }
        
        // action.membIds,
        // action.groupIds,
        case TYPES.DELETE_MEMBERS_FROM_GROUPS: 
            return updateSublist.deleteIds(state, action.groupIds, 'members', action.membIds);

        case MEMB_TYPES.DELETE_MEMBERS: {
            const allIds = Object.keys(state);
            return updateSublist.deleteIds(state, allIds, 'members', action.membIdList);
        }

        default: return state
    }//end switch
}