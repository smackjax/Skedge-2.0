import React from 'react';
import PropTypes from 'prop-types';
import { objToArr } from '../../functions';

import { 
    listenToAllFollowers,
    stopListeningToFollowers,
    authorizeFollower,
    deleteFollower
} from '../../api';

import {
    ModalBody,
    ModalHeader,
    ModalContent
} from '../../modal-generics';
import { icons } from '../../generic-components';

import PendingUserList from './pending-followers-list/pending-followers-list.component';
import ConfirmedUserList from './confirmed-followers-list/confirmed-followers-list.component';

class FollowingModal extends React.Component {
    state={
        errorMsg: "",
        pendingFollowers: [], 
        confirmedFollowers: [],
    }

    componentDidMount(){
        const scheduleId = this.props.scheduleId;       
        if(scheduleId && scheduleId.length){
            // updates on each 'followers' change
            listenToAllFollowers(scheduleId, 
                followersFromSched=>{
                    console.log("Followers from callback", followersFromSched);
                    
                    const followersObj = followersFromSched || {};
                    const confirmedFollowers = objToArr(followersObj.confirmed);
                    const pendingFollowers = objToArr(followersObj.pending);

                    this.setState({
                        pendingFollowers,
                        confirmedFollowers
                    })
                }
            )
        }
    }

    componentWillUnmount(){
        const scheduleId = this.props.scheduleId;
        stopListeningToFollowers(scheduleId)
    }

    handleAuthorize=(follower)=>{
        authorizeFollower(this.props.scheduleId, follower)
    }

    handleDelete=(followerId)=>{
        deleteFollower(this.props.scheduleId, followerId)
    }

    render(){
        const arePending = 
            this.state.pendingFollowers.length;
        const areConfirmed = 
            this.state.confirmedFollowers.length;

        return (
            <ModalBody>
                <ModalHeader
                className="bg-sched"
                >
                  {icons.member} Followers
                </ModalHeader>

                <ModalContent>
                    {(!arePending && !areConfirmed) && (
                        <div
                        style={{
                            margin: "20px auto",
                            textAlign: "center"
                        }}
                        >
                            No followers to manage
                        </div>
                    )}

                    { arePending ? (
                        <PendingUserList
                        users={this.state.pendingFollowers}
                        handleAuthorize={this.handleAuthorize}
                        /> 
                    ) : ""}

                    { areConfirmed ? (
                        <ConfirmedUserList 
                        users={this.state.confirmedFollowers}
                        handleDelete={this.handleDelete}
                        />
                    ): ""}
                </ModalContent>


                <button 
                onClick={this.props.handleClose}
                style={{
                    width: "95%",
                    maxWidth: "200px",
                    margin: "10px auto",
                    padding: "5px",
                    textAlign: "center",
                }}
                className="action-btn bg-member text-light"
                >
                   {icons.check} CLOSE
                </button>
            </ModalBody>
        )
    }
}

FollowingModal.propTypes = {
    scheduleId: PropTypes.string,
    handleConfirm: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired
}

export default FollowingModal