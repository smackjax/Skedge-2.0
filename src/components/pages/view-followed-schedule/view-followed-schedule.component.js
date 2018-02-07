import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { FullScreenSpinner } from './generic-components';
import ViewDateRangeData from '../_view-sched-data/view-sched-data.component';

// This acts as a wrapper for the schedule data view
class SchedViewSwitch extends React.Component{
    state={
        loading: true,
        followedSchedule: null
    }

    componentDidMount(){
        const followedSchedId = 
            this.props.match.params.followedSchedId;

        if(followedSchedId){
            const followedSchedule= 
                this.props.followedSchedules[followedSchedId];
            
            return this.setState({
                followedSchedule
            }, ()=>{ 
                this.handleLoading(false) 
            })
        }
        return this.handleLoading(false);   
    }

    handleLoading=(loading)=>{
        this.setState({
            loading
        })
    }

    render(){
        if(this.state.loading){
            return (
                <FullScreenSpinner />
            )
        }

        if( !this.state.followedSchedule ){
            return <Redirect to="/dashboard" />
        }

        return (
            <ViewDateRangeData
            scheduleName={ this.state.followedSchedule.name }
            data={ this.state.followedSchedule.data}
            />
        )
    }
}

SchedViewSwitch.propTypes = {
    match: PropTypes.object.isRequired
}

export default connect(
    store=>({
        followedSchedules: store.followedSchedules,
    })
)(
withRouter(SchedViewSwitch));