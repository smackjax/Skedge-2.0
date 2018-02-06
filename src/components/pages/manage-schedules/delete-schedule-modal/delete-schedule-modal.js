import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalContent, ModalFooterBtns } from '../../modal-generics';
import { icons } from '../../generic-components';

const DeleteScheduleModal = (props)=>{
    const deleteSchedule = ()=>{
        props.handleDelete(props.idToDelete);
    }
    return (
        <Modal
        open={props.open}
        >
            <ModalBody>
                <ModalHeader
                className="bg-danger text-light"
                >
                    {icons.trash} Delete?
                </ModalHeader>

                <ModalContent>

                    <h3
                    className="text-danger"
                    style={{
                        textAlign: "center",
                        margin: "15px 0"
                        
                    }}
                    >
                        Cannot be undone
                    </h3>

                    <p>
                        You are about to delete:
                    </p>

                    <p
                    style={{
                        textAlign: "center",
                        margin: "20px 0"
                    }}
                    >
                        <b>{props.scheduleName}</b>
                    </p>

                    <p
                    style={{
                        textAlign: "center",
                        margin: "10px 0"
                    }}
                    > 
                        This schedule will be gone for good. Continue?
                    </p>
                </ModalContent>

                <ModalFooterBtns 
                    bgClassName="bg-danger text-light"
                    saveText="Delete"
                    handleCancel={props.handleClose}
                    handleSave={deleteSchedule}
                />
            </ModalBody>
        </Modal>
    )
}

DeleteScheduleModal.propTypes={
    idToDelete: PropTypes.string.isRequired,
    scheduleName: PropTypes.string.isRequired,
    handleDelete: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired
}

export default DeleteScheduleModal;