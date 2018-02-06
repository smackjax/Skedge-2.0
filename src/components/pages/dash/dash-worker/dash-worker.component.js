import React from 'react';
import { Navbar } from '../../generic-components';
import FollowedScheduleList from './followed-schedules-list/followed-schedules-list.component';

const DashWorker = (props)=>{
    return (
        <div className="worker-dash-page">
            <Navbar />
            <FollowedScheduleList />
        </div>
    )
}


export default DashWorker;