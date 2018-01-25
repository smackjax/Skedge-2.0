import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { DATA_ACTIONS } from '../../_redux-generics/actions';
import { getUserSchedules, createNewSchedule, getUser, deleteSchedule } from '../api';
import { objToArr } from '../functions';

import Navbar from './manage-schedules-navbar/manage-schedules-navbar.component';
import NewScheduleBtn from './new-schedule-btn/new-schedule-btn.component';
import ScheduleItem from './schedule-item/schedule-item.component';

class ManageSchedules extends React.Component{
    state={
        loading: true,
        errorMsg: "",
        schedules: []
    }
    
    componentDidMount(){
        const userId = getUser().uid;
        this.setLoading(true);
        getUserSchedules(userId)
        .then(schedulesObj=>{
            const scheduleArray = objToArr(schedulesObj);
            this.setSchedules(scheduleArray);
        })
        .catch(err=>{
            console.log("Error getting schedules", err);
            this.setErrorMsg("Couldn't get schedules.")
        })
        .then(always=>{
            this.setLoading(false);
        })
    }

    deleteScheduleById=(scheduleId)=>{
        this.setLoading(true);
        deleteSchedule(scheduleId)
        .then(success=>{
            const schedules =
                this.state.schedules.filter(
                    schedule=>(schedule.id !== scheduleId)
                )
            return this.setSchedules(schedules)
        })
        .catch(err=>{
            console.log("Couldn't delete schedule", err);
        })
        .then(always=>{
            this.setLoading(false);
        })
    }

    setErrorMsg=(errorMsg)=>{
        this.setState({ errorMsg })
    }
    setLoading=(status)=>{
        this.setState({ loading: status })
    }

    setSchedules=(schedules)=>{
        return new Promise( resolve=>{
            this.setState(
                { schedules }, 
                ()=>{ resolve(true) }
            )
        })
    }

    createNewSchedule=()=>{
        const userId = getUser().uid;
        createNewSchedule(userId, "Test name")
        .then(newSchedule=>{
            const schedules = [...this.state.schedules, newSchedule];
            this.setSchedules(schedules);
        })
    }

    changeSchedule=(scheduleId)=>{
        const selectedSchedule = this.state.schedules.filter(
            schedule=>(schedule.id === scheduleId)
        )[0];
        console.log("run");
        this.props.dispatch(
            DATA_ACTIONS.changeActiveSchedule(selectedSchedule)
        );
    }

    render(){
        return (
            <div>

                <Navbar />

                <div>Schedule Id: {this.props.scheduleId} </div>
                <NewScheduleBtn
                onClick={this.createNewSchedule}
                />
                {this.state.schedules.map(schedule=>(
                    <ScheduleItem
                    key={schedule.id} 
                    id={schedule.id}
                    name={schedule.name}
                    handleChangeSchedule={this.changeSchedule}
                    />
                ))}
            </div>
        )
    }
}

ManageSchedules.propTypes={
    history: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
}

export default withRouter(
    connect(store=>({
        scheduleId: store.meta.activeSchedId
    }))( ManageSchedules))