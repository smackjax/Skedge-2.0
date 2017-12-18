import moment from 'moment';

// Maintains consistent string date format
export const dehydrateDate = (date)=>date.format('YYYY-MM-DD');
    

export const hydrateDate = (date)=>{
    const newDate = moment(date, 'YYYY-MM-DD');
    return newDate;
}

export const prettyDate = (dateString)=>{
    return moment(dateString, 'YYYY-MM-DD').format('ddd, MMM DD');
}