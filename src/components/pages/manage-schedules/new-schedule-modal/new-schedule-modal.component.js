import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalBody, ModalHeader, ModalFooterBtns} from '../../../_generic-components/modal';
import { icons } from '../../generic-components';
import IdSearchResults from './id-search-results/id-search-results.component';

class NewScheduleModal extends React.Component {
    state={
        newName: "",
        newId: "",
        searching: false,
        idTaken: null,
        searchErrorMsg: ""
    }
    
    handleSave = (e)=>{
        e.preventDefault()
        const {newName, newId} = this.state;
        this.setState({
            newName: "",
            newId: "",
        },         
        ()=>{
            this.props.handleNewSched(newName, newId);
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
        
        this.setState({ newName });
    }

    handleId=(e)=>{
        // Cancels previous search
        this.clearSearch();
        const newId = e.target.value.trim();
        if(newId){
            this.searchForId( newId );
        } 
        this.setState({  newId })
    }

    // Resets all search values, cancels search
    clearSearch=()=>{
        clearTimeout(this.searchToExecute);
        this.setState({
            errorMsg: "",
            idTaken: null,
            searching: false
        })
    }

    // Delays search until id is fully typed
    searchForId=(scheduleId)=>{
        this.setSearching(true);
        this.searchToExecute = setTimeout(()=>{
            this.props.searchScheduleIds(scheduleId)
            .then( exists=>{
                // Id not taken
                if(!exists){
                    this.setIdTaken(false)
                } else {
                    // Id taken
                    this.setIdTaken(true)
                }
            })
            .catch(err=>{
                console.log("Couldn't search for schedules ", err);
                this.setState({
                    searchErrorMsg: "Couldn't search for schedules"
                })
            })
            .then(always=>{
                // Stops loading spinner
                this.setSearching(false);
            })
        }, 1000)
    }

    setIdTaken=(idTaken)=>{
        this.setState({ idTaken })
    }
    setSearching=( searching )=>{
        this.setState({ searching })
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
                        <label
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            width: "95%",
                            maxWidth: "250px",
                            margin: "20px auto"
                        }}
                        >
                            <span
                            style={{
                                fontSize: "14px",
                                fontWeight: "bold"
                            }}
                            >
                                SCHEDULE ID (case sensitive)
                            </span>

                            <input 
                            type="text"
                            style={{
                                display: "block",
                                border: "0",
                                padding: "5px 7px",
                                margin: "5px 0",
                                backgroundColor: "#fff"
                            }}
                            placeholder="(How people find it)"
                            required
                            value={this.state.newId}
                            onChange={this.handleId}
                            className="action-btn"
                            maxLength="20"
                            />
                             
                            <IdSearchResults
                            searching={ this.state.searching }
                            idTaken={ this.state.idTaken }
                            errorMsg={ this.state.searchErrorMsg }
                            />
                            
                        </label>

                        <label
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            width: "95%",
                            maxWidth: "250px",
                            margin: "20px auto"
                        }}
                        >
                            <span
                            style={{
                                fontSize: "14px",
                                fontWeight: "bold"
                            }}
                            >
                                SCHEDULE NAME
                            </span>

                            <input 
                            type="text"
                            style={{
                                display: "block",
                                border: "0",
                                padding: "5px 7px",
                                margin: "5px 0",
                                backgroundColor: "#fff"
                            }}
                            placeholder="(Nice name people see)"
                            required
                            value={this.state.newName}
                            onChange={this.handleName}
                            className="action-btn"

                            maxLength="15"
                            />
                        </label>

                        <ModalFooterBtns 
                        disabled={(this.state.newName && this.state.newId) ? false : true}
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