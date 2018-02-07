import React from 'react';
import { Navbar } from '../../generic-components';
import FollowedScheduleList from './followed-schedules-list/followed-schedules-list.component';

const DashMember = (props)=>{
    return (
        <div className="member-dash-page">
            <Navbar />
            <FollowedScheduleList />
        </div>
    )
}

export default DashMember;