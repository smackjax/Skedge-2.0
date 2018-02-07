import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { 
    deleteDateRangeById,
    changeActiveDateRangeId
 } from './api';

import { FullScreenSpinner } from './generic-components';

import ViewDateRangeData from '../_view-sched-data/view-sched-data.component';

// This acts as a wrapper for the schedule data view
class SchedViewSwitch extends React.Component{
    state={
        loading: true,
        dateRange: null
    }

    componentDidMount(){
        const dateRangeId = 
            this.props.match.params.dateRangeId;
        
        if(dateRangeId){
            const dateRange = 
                this.props.dateRanges[dateRangeId];
            return this.setState({
                dateRange
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

    deleteDateRange=()=>{
        this.props.deleteDateRangeById(this.state.dateRange.id);
        this.props.history.push("/dashboard");
    }

    handleIdChange=()=>{
        this.props.changeActiveDateRangeId(
            this.state.dateRange.id
        )
    }

    render(){
        if(this.state.loading){
            return (
                <FullScreenSpinner />
            )
        }

        if( !this.state.dateRange ){
            return <Redirect to="/dashboard" />
        }
        
        const isActive = 
            (this.props.activeDateRangeId === this.state.dateRange.id);
        
        return (
            <ViewDateRangeData
            scheduleName={ this.props.scheduleName }
            data={ this.state.dateRange }
            handleDelete={ this.deleteDateRange }
            changeActiveId={ isActive ? null : this.handleIdChange }
            />
        )
    }
}

SchedViewSwitch.propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    activeDateRangeId: PropTypes.string.isRequired,
    deleteDateRangeById: PropTypes.func.isRequired,
    changeActiveDateRangeId: PropTypes.func.isRequired
}

const mapDispatchToProps = {
    deleteDateRangeById,
    changeActiveDateRangeId
}

export default connect(
    store=>({
        dateRanges: store.dateRanges,
        scheduleName: store.meta.activeSchedName,
        activeDateRangeId: store.meta.activeDateRangeId
    }), mapDispatchToProps
)(
withRouter(SchedViewSwitch));