import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeActiveSchedule } from '../master-api';

import { 
    getSchedulesByUserId, 
    createNewSchedule, 
    getUser, 
    deleteScheduleById
} from '../api';

import { objToArr } from '../functions';

import Navbar from './manage-schedules-navbar/manage-schedules-navbar.component';
import NewScheduleBtn from './new-schedule-btn/new-schedule-btn.component';
import ScheduleItem from './schedule-item/schedule-item.component';

import NewScheduleModal from './new-schedule-modal/new-schedule-modal.component';

class ManageSchedules extends React.Component{
    state={
        loading: true,
        errorMsg: "",
        schedules: [],
        modalOpen: false
    }
    
    componentDidMount(){
        const userId = getUser().uid;
        this.setLoading(true);
        getSchedulesByUserId(userId)
        .then(schedulesObj=>{
            const scheduleArray = objToArr(schedulesObj);
            this.setSchedules(scheduleArray);
        })
        .catch(err=>{
            console.log("Error getting schedules", err);
            this.setErrorMsg("Couldn't get schedules")
        })
        .then(always=>{
            this.setLoading(false);
        })
    }

    deleteSchedule=(scheduleId)=>{
        this.setLoading(true);
        deleteScheduleById(scheduleId)
        .then(success=>{
            const schedules =
                this.state.schedules.filter(
                    schedule=>(schedule.id !== scheduleId)
                )
            return this.setSchedules(schedules)
        })
        .catch(err=>{
            console.log("Couldn't delete schedule", err);
            this.setErrorMsg("Couldn't delete schedule")
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

    createNewSchedule=(scheduleName)=>{
        this.closeModal();

        // Create new schedule with provided name
        const userId = getUser().uid;
        createNewSchedule(userId, scheduleName)
        .then(newSchedule=>{
            const schedules = [...this.state.schedules, newSchedule];
            return this.setSchedules(schedules)
            .then(success=>{
                this.changeSchedule(newSchedule.id)
            })
        })
    }

    toggleModal=()=>{
        const modalOpen = !this.state.modalOpen;
        return new Promise(resolve=>{
            this.setState({
                modalOpen
            }, 
            ()=>{ resolve() });
        })
        
    }
    closeModal=()=>{
        this.setState({
            modalOpen: false
        })
    }

    changeSchedule=(scheduleId)=>{
        const selectedSchedule = this.state.schedules.filter(
            schedule=>(schedule.id === scheduleId)
        )[0];
        this.props.changeActiveSchedule(selectedSchedule);
    }

    render(){
        return (
            <div>
                <Navbar />

                <NewScheduleBtn
                onClick={this.toggleModal}
                />

                {this.state.schedules.map(schedule=>(
                    <ScheduleItem
                    key={schedule.id} 
                    id={schedule.id}
                    isCurrent={schedule.id === this.props.scheduleId}
                    name={schedule.name}
                    handleDelete={this.deleteSchedule}
                    handleChangeSchedule={this.changeSchedule}
                    />
                ))}

                <NewScheduleModal 
                open={this.state.modalOpen}
                handleNewSched={this.createNewSchedule}
                closeModal={this.closeModal}
                />

            </div>
        )
    }
}

ManageSchedules.propTypes={
    history: PropTypes.object.isRequired,
    scheduleId: PropTypes.string.isRequired
}

const mapDispatch = {
    changeActiveSchedule
}

export default withRouter(
    connect(store=>({
        scheduleId: store.meta.activeSchedId
    }), mapDispatch)( ManageSchedules))