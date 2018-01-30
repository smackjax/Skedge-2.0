import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteDateRangeById } from '../api';
import SchedViewRadios from '../view-switch-controls/view-switch-control.component';
import {
    ViewByMember,
    ViewByDate
} from '../views-by-data/';
import { FullScreenSpinner } from '../generic-components';

import Navbar from '../_navbar/view-date-range-nav.component';

class SchedViewSwitch extends React.Component{
    state={
        currentView: "collapsed",
        loading: true,
        dateRange: null
    }

    componentDidMount(){
        const dateRangeId = this.props.match.params.dateRangeId;
        if(dateRangeId){
            const dateRange = 
                this.props.dateRanges[dateRangeId];
            return this.setState({
                dateRange
            }, ()=>{ this.handleLoading(false) })
        }
        return this.handleLoading(false);
        
    }


    handleViewChange = (e)=>{
        const newView = e.target.value;
        if(this.state.currentView !== newView){
            this.setState({ currentView: newView });
        }
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

    render(){
        const view = this.state.currentView;

        if(this.state.loading){
            return (
                <FullScreenSpinner />
            )
        }

        if( !this.state.dateRange ){
            return <Redirect to="/dashboard" />
        }

        return (
            <div
            className="sched-view-switch">
                <Navbar
                scheduleName={this.props.scheduleName}
                startDate={this.state.dateRange.startDate}
                endDate={this.state.dateRange.endDate}
                deleteDateRange={this.deleteDateRange}
                history={this.props.history}
                />

                <SchedViewRadios 
                handleViewChange={ this.handleViewChange }
                currentView={this.state.currentView}
                />

                { view === "members" ? 
                <ViewByMember
                schedule={ this.state.dateRange }
                />    :
                <ViewByDate 
                schedule={ this.state.dateRange }
                />
                }
                
            </div>
        )
    }
}

SchedViewSwitch.propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    deleteDateRangeById: PropTypes.func.isRequired
}

const mapDispatchToProps = {
    deleteDateRangeById
}

export default connect(
    store=>({
        dateRanges: store.dateRanges,
        scheduleName: store.meta.activeSchedName
    }), mapDispatchToProps
)(
withRouter(SchedViewSwitch));