import React from 'react';
import PropTypes from 'prop-types';

import { 
    listenToAllFollowers,
    stopListeningToFollowers,
    authorizeFollower,
    deleteFollower
} from '../../api';

import {
    ModalBody,
    ModalHeader,
    ModalContent,
    ModalFooterBtns
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
                    console.log(followersFromSched);
                    const followersObj = followersFromSched || {};
                    const followerIds = Object.keys(followersObj);
                    const confirmedFollowers = [];
                    const pendingFollowers = [];

                    followerIds.forEach(
                        id=>{
                            const follower = followersObj[id];
                            if(follower.confirmed){
                                confirmedFollowers.push(follower);
                            } else {
                                pendingFollowers.push(follower);
                            }
                        }
                    );

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

    handleAuthorize=(followerId)=>{
        authorizeFollower(this.props.scheduleId, followerId)
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
                        <div>
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

                <ModalFooterBtns 
                    bgClassName="bg-sched text-light"
                    saveText={"SAVE"}
                    handleSave={this.saveUsers}
                    handleCancel={this.props.handleClose}
                />
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