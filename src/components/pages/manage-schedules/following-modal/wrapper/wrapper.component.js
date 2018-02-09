import React from 'react';
import PropTypes from 'prop-types';
import {
    Modal
} from '../../../modal-generics';

// This is crap. TODO just restructure
import FollowingModal from '../following-modal.component';

const MountWrapper = (props)=>{
    const mountChildren = props.scheduleId ? true : false;
    return (
        <Modal
        open={props.open}
        >
        { mountChildren ? (
            <FollowingModal 
            scheduleId={props.scheduleId}
            handleConfirm={props.handleConfirm}
            handleClose={props.handleClose}
            />
        ) : ""}
        </Modal>
    )
}

MountWrapper.propTypes = {
    open: PropTypes.bool.isRequired,
    scheduleId: PropTypes.string,
    handleConfirm: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired
}

export default MountWrapper;