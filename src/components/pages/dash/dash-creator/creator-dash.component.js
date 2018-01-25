import React from 'react';
import { Navbar } from '../../generic-components';
import DateRangeList from '../date-range-list/date-range-list.component';

const CreatorDash = (props)=>{
    return(
        <div className="creator-dash-page">
            <Navbar />
            <DateRangeList />
        </div>
    )
}

export default CreatorDash;