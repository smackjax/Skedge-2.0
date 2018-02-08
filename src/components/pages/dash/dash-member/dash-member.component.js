import React from 'react';
import { Navbar } from '../../generic-components';
import SearchSchedules from './search-for-schedule/search-for-schedule.component';
import FollowedScheduleList from './followed-schedules-list/followed-schedules-list.component';

const DashMember = (props)=>{
    return (
        <div className="member-dash-page">
            <Navbar />
            <SearchSchedules />
            <FollowedScheduleList />
        </div>
    )
}

export default DashMember;