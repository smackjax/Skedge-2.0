import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import {
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooterBtns,
    ModalContent
} from '../../_modal';

const ConfirmActiveSchedChangeModal = (props)=>{
    const startDate = moment(props.startDate).format('MMM DD, YYYY');
    const endDate = moment(props.endDate).format('MMM DD, YYYY');
    return (
        <Modal>
            <ModalBody>
                <ModalHeader
                className="bg-sched"
                >
                Change active schedule?
                </ModalHeader>

                <ModalContent>
                    <p>Changing the active schedule will affect everyone following it.</p>
                    <p>New active schedule will be </p>
                    <hr />
                    <div 
                    className="display-sched-dates">
                    {startDate} - {endDate}
                    </div>
                </ModalContent>

                <ModalFooterBtns
                bgClassName="bg-sched"
                handleSave={props.handleConfirm}
                handleCancel={props.handleCancel}
                />
            </ModalBody>
        </Modal>
    )
}


ConfirmActiveSchedChangeModal.propTypes={
    open: PropTypes.bool.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    handleCancel: PropTypes.func.isRequired,
    handleConfirm: PropTypes.func.isRequired
}

export default ConfirmActiveSchedChangeModal;
