import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
    findAndRequestToFollow
} from '../../../api';

import { isValidDatabasePath } from '../../../regex-path-types';
 
import {icons, SpinnerBottomScreen} from '../../../generic-components';
import './search-for-schedule.style.css';

class SearchForSchedule extends React.Component{
    state={
        searching: false,
        successMsg: "",
        errorMsg: "",

        validSearch: false,
    }

    requestToFollow=(e)=>{
        this.setSearching(true);
        e.preventDefault();
        const scheduleId = e.target.scheduleId.value;
        e.target.reset();
        
        this.props.findAndRequestToFollow(scheduleId)
        .then(success=>{
            if(success){
                this.setSuccessMsg("Requested to follow");
            } else {
                this.setErrorMsg("Schedule not found");
            }
        })
        .catch(err=>{
            console.log("Problem searching for schedule to follow: ", err);
            this.setErrorMsg("Failed. Please try again.");
        })
        .then(always=>{
            this.setSearching(false);
        })        
    }


    handleSearchInput=(e)=>{
        const searchId = e.target.value;
        const isValidPath = isValidDatabasePath(searchId);

        const errorMsg = (isValidPath || !searchId) ? "" :
            "Only A-z 1-9 - _ allowed";
        const isValid = (searchId.length && isValidPath);

        this.setSearching(false);
        this.setSuccessMsg("");
        this.setValid(isValid);
        this.setErrorMsg(errorMsg);
    }
    setSearching=(searching)=>{
        this.setState({ searching })
    }
    setErrorMsg=(errorMsg)=>{
        this.setState({ errorMsg })
    }

    setSuccessMsg=(successMsg)=>{
        this.setState({ successMsg })
    }
    setValid=(validSearch)=>{
        this.setState({ validSearch })
    }


    render(){
        const {
            searching,
            errorMsg,
            successMsg,
            validSearch
        } = this.state;

        return this.props.connected ?  (
            <div 
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "95%",
                maxWidth: "300px",
                margin: "10px auto 5px",
            }}
            >

                <form 
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent:"center",
                    textAlign: "center",
                    width: "100%"
                }}
                className="border-sched action-btn"
                onSubmit={this.requestToFollow}>
                
                    <input 
                    type="text"
                    name="scheduleId"
                    placeholder="Search schedule id"
                    autoComplete={"off"}
                    onChange={this.handleSearchInput}
                    style={{ 
                        width: "100%",
                        color: "#111"
                    }}
                    className="search-for-schedule-input"
                    />
                    
                    <button 
                    type="submit"
                    disabled={searching || !validSearch}
                    className="bg-sched text-light submit-schedule-search-btn"
                    >
                        {icons.search}
                    </button>
                </form>
    


                <div 
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    padding: "10px",
                    width: "100%",
                    textAlign: "center",
                    color: "#999",
                    fontSize: "16px"
                }}
                className="schedule-search-info-wrapper"
                >
                    { // Sets message
                    searching ? (
                        <span className="schedule-search-spinner">
                            { icons.gearSpinner } Searching...
                        </span>
                    ):
                    errorMsg ? (
                        <span className="text-danger">
                            { icons.times } {this.state.errorMsg}
                        </span> 
                    ):
                    successMsg ? (
                        <span className="text-sched">
                            {icons.check} {this.state.successMsg}
                        </span> 
                    ): "(case sensitive)" 
                    }
                </div>

                
            </div>
        ) : (
        <div
        style={{
            textAlign: "center",
            maxWidth: "250px",
            margin: "auto",
            padding: "10px",
            fontSize: "16px"
        }}
        className="text-danger"
        >
            {icons.times} No connection
        </div>
        )
    }
}

SearchForSchedule.propTypes = {
    findAndRequestToFollow: PropTypes.func.isRequired
}

export default connect(store=>({
    connected: store.meta.connectedToInternet
}),{
    findAndRequestToFollow
})(SearchForSchedule);