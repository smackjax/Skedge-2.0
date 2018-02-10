// Removes as much as possible from timesAssigned, equalizing
// workload
export default (dirtyMembers, amountToSubtract)=>{
    console.log("Amount to subtract from members: ", amountToSubtract);
    const members = dirtyMembers ? [...dirtyMembers] : [];

    // If the lowest is zero(which shouldn't happen), 
    // nothing can be done
    if(!amountToSubtract){
        return members;
    }

    const newMembers = [...members];
    const ids = Object.keys(newMembers);

    ids.forEach( 
        (id)=>{
            // Initialize if not there
            const currentTimesAssigned = 
                newMembers[id].totalTimesAssigned || 0;

            // Subtract as much as possible
            const newTimesAssigned = 
                (currentTimesAssigned - amountToSubtract);

            
            const finalTimes = 
                // If the result is zero, leave at least once assigned
                // for next schedule generation
                !newTimesAssigned ? 1 :
                // If member has done something many times more than others, reset to a lower range
                    // TODO this will really mess with the initial couple days
                    // of schedule assignment
                newTimesAssigned > 10 ? Math.floor(Math.random() * 10) + 5 :
                // Default to whatever is in margin
                newTimesAssigned;

            newMembers[id] = {
                ...newMembers[id],
                "totalTimesAssigned": finalTimes
            }
        }
    );

    return newMembers;
}
