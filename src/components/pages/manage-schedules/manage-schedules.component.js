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
import FollowingModal from './following-modal/wrapper/wrapper.component';
import DeleteScheduleModal from './delete-schedule-modal/delete-schedule-modal';

const checkPending=(followersObj)=>{
    let hasPending = false;
    const followerIds = Object.keys(followersObj);
    
    followerIds.forEach(
        id=>{
            if(followersObj[id].confirmed) hasPending = true;
        }
    )
    
    return hasPending;
}

class ManageSchedules extends React.Component{
    state={
        loading: true,
        errorMsg: "",
        schedules: [],
        
        newModalOpen: false,

        deleteName: "",
        deleteId: "",
        deleteModalOpen: false,

        followingModalOpen: false,
        followingModalSchedId: ""
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
            newModalOpen: false,
            followingModalSchedId: false
        })
    }

    openDeleteModal=(deleteId, deleteName)=>{
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

    openFollowingModal=(scheduleId)=>{
        this.setState({
            followingModalOpen: true,
            followingModalSchedId: scheduleId
        })
    }

    closeFollowingModal=()=>{
        this.setState({
            followingModalOpen: false
        })
    }

    confirmFollowingChanges=(authorizedIds, deletedPendingIds, deletedConfirmedIds)=>{
        console.log("Confirmed ids: ", authorizedIds);
        console.log("Deleted pending: ", deletedPendingIds);
        console.log("Deleted confirmed: ", deletedConfirmedIds);

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

                {this.state.schedules.map(schedule=>{
                    const hasPending = 
                        (schedule.followers) ?
                        checkPending(schedule.followers) :
                            false;
                        
                    return (
                        <ScheduleItem
                        key={schedule.id} 
                        id={schedule.id}
                        isCurrent={schedule.id === this.props.scheduleId}
                        hasPending={hasPending}
                        name={schedule.name}
                        handleOpenDelete={this.openDeleteModal}
                        handleOpenFollowers={this.openFollowingModal}
                        handleChangeSchedule={this.changeSchedule}
                        />
                    )
                })}



                <NewScheduleModal 
                open={this.state.newModalOpen}
                handleNewSched={this.createNewSchedule}
                closeNewModal={this.closeNewModal}
                />

                <FollowingModal 
                open={this.state.followingModalOpen}
                scheduleId={this.state.followingModalSchedId}
                handleConfirm={this.confirmFollowingChanges}
                handleClose={this.closeFollowingModal}
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