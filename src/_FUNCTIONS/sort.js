export default (arrayToSort, bySubKey, reverse)=>{
      
    return arrayToSort.sort(
        (item1, item2)=>{
            let compareValOne = 
                bySubKey ? item1[bySubKey] : item1;
            let compareValTwo = 
                bySubKey ? item2[bySubKey] : item2;

            // If value is a string, compare both as lowercase
            compareValOne = (typeof compareValOne === "string") ?
                compareValOne.toLowerCase() : compareValOne
            compareValTwo = (typeof compareValTwo === "string") ?
                compareValTwo.toLowerCase() : compareValTwo

            return reverse ? 
                compareValOne < compareValTwo : 
                compareValOne > compareValTwo 
        }
    );
}