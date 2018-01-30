import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalBody, ModalHeader, ModalFooterBtns} from '../../../_generic-components/modal';
import { icons } from '../../generic-components';

class NewScheduleModal extends React.Component {
    state={
        newName: "",
        disabled: true
    }
    
    handleSave = (e)=>{
        e.preventDefault()
        const scheduleName = this.state.newName;
        this.setState({
            newName: "",
            disabled: true
        }, 
        ()=>{
            this.props.handleNewSched(scheduleName);
        })
    }

    handleName=(e)=>{
        const newStr = e.target.value;
        const newName = 
            (newStr.trim() === "") ? 
                "" :
            newStr.length > 15 ?
                newStr.substring(0, 15) :
            newStr;
        const disabled = (newName === "");
        this.setState({ newName, disabled });
    }


    
    render(){

        return (
            <Modal open={this.props.open}>
                <ModalBody>
                    <ModalHeader
                    className="bg-sched"
                    >
                        {icons.plus} Create Schedule
                    </ModalHeader>

                    <form onSubmit={this.handleSave}>
                        <input 
                        type="text"
                        style={{
                            display: "block",
                            border: "0",
                            padding: "5px 7px",
                            margin: "15px auto",

                        
                        }}
                        placeholder="Schedule Name"
                        required
                        value={this.state.newName}
                        onChange={this.handleName}
                        className="action-btn"

                        maxLength="15"
                        />

                        <ModalFooterBtns 
                        disabled={this.state.disabled}
                        bgClassName="bg-sched"
                        saveText="Create"
                        handleCancel={this.props.closeNewModal}
                        />
                    </form>

                </ModalBody>
            </Modal>
        )
    }
}

NewScheduleModal.propTypes = {
    open: PropTypes.bool.isRequired,
    closeNewModal: PropTypes.func.isRequired,
    handleNewSched: PropTypes.func.isRequired
}

export default NewScheduleModal;