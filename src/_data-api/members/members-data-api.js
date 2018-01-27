import { objToArr, arrToObj } from '../../_FUNCTIONS/index';

export const saveMembers=(store, membersUpdateArray)=>{
    // Load members state
    const membersStateArray = objToArr(store.members);
    // Load groups state
    const groupsStateArray = objToArr(store.groups);
    // Find groups affected by changes

    const groupsUpdateArray = groupsStateArray.filter(
        // Filter out groups that aren't updated
        group=>{
            let isUpdated = false;
            let newMembers;

            membersUpdateArray.forEach(
                member=>{
                    // Check if id is in sub item updated list
                    const includesId = member.groups.includes(group.id);
                    // If a change will be made in main item
                    if(includesId !== group.members.includes(member.id)){
                        // Set flag
                        isUpdated = true;
                    }
                    
                    
                    // Always filter to get rid of duplicates
                    const filteredList = group.members.filter(
                        mId=>mId !== member.id
                    );

                    // Set new main item id array as appropriate
                    newMembers = includesId ?
                        [...filteredList, member.id] :
                        filteredList
                }
            );
               
            // If id list was updated
            if(isUpdated){
                group.members = newMembers;
            }
            
            return isUpdated;
        }
    )
   

    const updates = {
        members: arrToObj(membersUpdateArray),
        groups: arrToObj(groupsUpdateArray)
    }

    return updates;
}


