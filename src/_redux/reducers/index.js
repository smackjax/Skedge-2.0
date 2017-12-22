import {combineReducers} from 'redux';
import schedules from './schedules.reducer'; 
import members from './members.reducer';
import groups from './groups.reducer';
import tasks from './tasks.reducer';
import days from './days.reducer';
import meta from './meta.reducer';

export default combineReducers({
    meta,
    schedules,
    members,
    groups,
    tasks,
    days
});