import makeSublist from './makeSublist';

/* IMPORTANT:
    dropdown list group key (like 'groups' inside a 'member' object),
    MUST MATCH key to subgroup creation function in 'makeSublist'
*/
export default (listObject)=>{
    // Will be array of objects
    let masterList = [];
    // References each main item id
    const itemIds = Object.keys(listObject);
    for(let id = 0; id< itemIds.length; id++){
        let sublists = [];
        let currentItem = listObject[itemIds[id]];
        const itemKeys = Object.keys(currentItem);
        for(let q = 0; q < itemKeys.length; q++){
            // Checks if object key is a sublist key
            const sublistFunc = makeSublist[itemKeys[q]];
            if(sublistFunc){
                sublists.push(sublistFunc(currentItem[itemKeys[q]]));
            }    
        }
        const newItem = {
            name: currentItem.name,
            id: currentItem.id,
            sublists: sublists
        }
        masterList.push(newItem);
    }
    
    return masterList;
};