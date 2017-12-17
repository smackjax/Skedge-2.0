export default (dayObj)=>{
    const {id, name, tasks } = dayObj;
    if(!id) { throw Error("'day' data object didn't have id")}
    const cleanedDayObj ={
        id: id,
        name: (name || "day" ),
        tasks: (tasks || [])
    }
    return cleanedDayObj;
} 