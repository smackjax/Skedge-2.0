import {combineReducers} from 'redux';
import dateRanges from './date-ranges.reducer';
import members from './members.reducer';
import groups from './groups.reducer';
import tasks from './tasks.reducer';
import days from './days.reducer';
import meta from './meta.reducer';

export default combineReducers({
    meta,
    dateRanges,
    members,
    groups,
    tasks,
    days
});