import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    findAndRequestToFollow
} from '../../../api';

import {icons, SpinnerBottomScreen} from '../../../generic-components';
import './search-for-schedule.style.css';

class SearchForSchedule extends React.Component{
    state={
        searching: false,
        message: "",
        searchSuccess: true,
    }

    requestToFollow=(e)=>{
        this.setSearching(true);
        e.preventDefault();
        const scheduleId = e.target.scheduleId.value;
        e.target.reset();
        
        this.props.findAndRequestToFollow(scheduleId)
        .then(success=>{
            console.log("Success result: ", success);
            if(success){
                this.setMessage("Request successful.", true);
            } else {
                console.log("Schedule not found")
                this.setMessage("Schedule not found", false);
            }
        })
        .catch(err=>{
            console.log("Problem searching for schedule to follow: ", err);
            this.setMessage("Failed. Please try again.", false);
        })
        

        this.setSearching(false);
    }

    setSearching=(searching)=>{
        this.setState({
            searching
        })
    }

    setMessage=(message, searchSuccess)=>{
        this.setState({
            message, 
            searchSuccess
        })
    }

    handleSearchInput=()=>{
      this.setState({
          message: "",
          searching: false,
          searchSuccess: null
      })  
    }

    render(){
        const {message, searchSuccess, searching} = this.state;

        return this.props.connected ?  (
            <div 
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "95%",
                maxWidth: "300px",
                margin: "10px auto",
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
                    placeholder="Search schedule ids"
                    autoComplete={"off"}
                    onChange={this.handleSearchInput}
                    style={{ width: "100%" }}
                    className="search-for-schedule-input"
                    />
                    
                    <button 
                    type="submit"
                    disabled={searching}
                    className="bg-sched text-light submit-schedule-search-btn"
                    >
                        {icons.search}
                    </button>
                </form>
    

                { searching ? (
                    <div 
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "10px",
                        width: "100%",
                        textAlign: "center"
                    }}
                    className={"schedule-search-info-wrapper border-sched " + ( searchSuccess ? "text-sched" : "text-danger" )}
                    >
                        <div
                        className="schedule-search-spinner"
                        >   
                            { icons.gearSpinner }
                        </div>
                        Searching...
                    </div>
                ) : "" }

                { message ?( 
                    <div 
                    style={{
                        padding: "10px",
                        width: "100%",
                        textAlign: "center"
                    }}
                    className={"border-sched " + ( searchSuccess ? "text-sched" : "text-danger" )}
                    >
                    { searchSuccess ? icons.check : icons.times } { message }
                    </div>
                ) : "" }
                
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