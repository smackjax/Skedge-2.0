import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { changeActiveSchedule, signOut } from '../master-api';

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
import DeleteScheduleModal from './delete-schedule-modal/delete-schedule-modal';


class ManageSchedules extends React.Component{
    state={
        loading: true,
        errorMsg: "",
        schedules: [],
        
        newModalOpen: false,

        deleteName: "",
        deleteId: "",
        deleteModalOpen: false
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
        this.props.deleteScheduleById(scheduleId)
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
    
    // Used if no active schedule
    signOutAndDash=()=>{
        this.props.signOut();
        this.props.history.push('/dashboard');
    }


    createNewSchedule=(scheduleName)=>{
        this.closeNewModal();

        // Create new schedule with provided name
        const userId = getUser().uid;
        createNewSchedule(userId, scheduleName)
        .then(newSchedule=>{
            const schedules = [...this.state.schedules, newSchedule];
            return this.setSchedules(schedules)
            .then(success=>{
                return this.changeSchedule(newSchedule.id)
            })
        })
    }

    toggleNewModal=()=>{
        const newModalOpen = !this.state.newModalOpen;
        return new Promise(resolve=>{
            this.setState({
                newModalOpen
            }, 
            ()=>{ resolve() });
        })
        
    }
    closeNewModal=()=>{
        this.setState({
            newModalOpen: false
        })
    }

    openDeleteModal=(deleteName, deleteId)=>{
        this.setState({
            deleteModalOpen: true,
            deleteName,
            deleteId
        })
    }
    closeDeleteModal=()=>{
        this.setState({
            deleteModalOpen: false,
            deleteName: "",
            deleteId: ""
        })
    }


    changeSchedule=(scheduleId)=>{
        const selectedSchedule = this.state.schedules.filter(
            schedule=>(schedule.id === scheduleId)
        )[0];
        return this.props.changeActiveSchedule(selectedSchedule)
        .then(scheduleChanged=>{
            this.props.history.push("/dashboard")
        })
    }

    render(){
        const isActiveSched = this.props.scheduleId !== "";
        if(!this.props.connected){
            return (<Redirect to="/dashboard" />)
        }

        return (
            <div>
                <Navbar 
                isActiveSched={isActiveSched}
                signOut={this.signOutAndDash}
                />

                <NewScheduleBtn
                onClick={this.toggleNewModal}
                />

                {this.state.schedules.map(schedule=>(
                    <ScheduleItem
                    key={schedule.id} 
                    id={schedule.id}
                    isCurrent={schedule.id === this.props.scheduleId}
                    name={schedule.name}
                    handleDelete={this.openDeleteModal}
                    handleChangeSchedule={this.changeSchedule}
                    />
                ))}

                <NewScheduleModal 
                open={this.state.newModalOpen}
                handleNewSched={this.createNewSchedule}
                closeNewModal={this.closeNewModal}
                />

                <DeleteScheduleModal 
                    open={this.state.deleteModalOpen}
                    idToDelete={this.state.deleteId}
                    scheduleName={this.state.deleteName}
                    handleDelete={this.deleteSchedule}
                    handleClose={this.closeDeleteModal}
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
    changeActiveSchedule,
    deleteScheduleById,
    signOut
}

export default withRouter(
    connect(store=>({
        scheduleId: store.meta.activeSchedId,
        connected: store.meta.connectedToInternet
    }), 
    mapDispatch)( ManageSchedules))