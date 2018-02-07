import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import SchedViewRadios from '../view-switch-controls/view-switch-control.component';
import {
    ViewByMember,
    ViewByDate
} from '../views-by-data/';
import Navbar from '../_navbar/view-date-range-nav.component';

class SchedViewSwitch extends React.Component{
    state={
        currentView: "collapsed",
    }

    handleViewChange = (e)=>{
        const newView = e.target.value;
        if(this.state.currentView !== newView){
            this.setState({ currentView: newView });
        }
    }

    render(){
        const view = this.state.currentView;

        if( !this.props.data){
            return <Redirect to="/dashboard" />
        }

        return (
            <div
            className="sched-view-switch">
                <Navbar
                scheduleName={this.props.scheduleName}
                startDate={this.props.data.startDate}
                endDate={this.props.data.endDate}
                handleDelete={this.props.handleDelete}
                />

                { this.props.changeActiveId ? (
                    <button
                    onClick={this.props.changeActiveId}
                    style={{
                        display: "block",
                        width: "250px",
                        margin: "20px auto",
                        borderWidth: "1px",
                        borderStyle: "solid"
                    }}
                    className="action-btn text-day border-day"
                    >
                        Make active
                    </button>
                ) : "" }

                <SchedViewRadios 
                handleViewChange={ this.handleViewChange }
                currentView={this.state.currentView}
                />

                { view === "members" ? ( 
                    <ViewByMember
                    schedule={ this.props.data }
                    />
                ) : (
                    <ViewByDate 
                    schedule={ this.props.data }
                    />
                )}
                
            </div>
        )
    }
}

SchedViewSwitch.propTypes = {
    scheduleName: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    handleDelete: PropTypes.func,
    changeActiveId: PropTypes.func
}

export default SchedViewSwitch;