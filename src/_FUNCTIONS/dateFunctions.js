import moment from 'moment';

// Maintains consistent string date format
export const dehydrateDate = (date)=>date.format('YYYY-MM-DD');
    

export const hydrateDate = (date)=>{
    const newDate = moment(date, 'YYYY-MM-DD').hours(0).minutes(0).seconds(0);
    return newDate;
}

export const prettyDate = (dateString)=>{
    return moment(dateString, 'YYYY-MM-DD').format('ddd, MMM DD');
}

export const genDatesArray = (startDateStr, endDateStr)=>{
    const startDate = hydrateDate(startDateStr);
    const endDate = hydrateDate(endDateStr);

    if(!moment.isMoment(startDate) || !moment.isMoment(endDate)){
        throw Error("Date string couldn't be hydrated");
    }

    const datesArray = [];
    const counterDate = startDate.clone();
    while(counterDate <= endDate){
        const dateStrToSave = dehydrateDate(counterDate.clone());
        datesArray.push(dateStrToSave);
        const newDate = (counterDate.date() + 1);
        counterDate.date(newDate);
        if(datesArray.length >= 365) return;
    }

    return datesArray;
}