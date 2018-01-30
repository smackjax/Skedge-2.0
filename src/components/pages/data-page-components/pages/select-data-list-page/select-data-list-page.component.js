import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Navbar, icons } from '../../../generic-components';
import GenerateSchedBtn from './generate-sched-btn/generate-sched-btn.component';
import { NewDateRangeModal } from '../../_modals';
import CardBlock from './select-data-list-card-block/select-data-list-card-block.component';
import SelectDataListCard from './select-data-list-card/select-data-list-card.component';
import './select-data-list-page.style.css';

import { saveDateRange } from '../../api';

import { genNewDateRange } from '../../../../../brains/sched-api';
import { objToArr } from '../../../functions';
import { FullScreenSpinner } from '../../../generic-components';


const checkForAssigned=(stateObj, sublistKey)=>{
    // Checks if at least one value
    // is in at least one item sublist
    let atLeastOneAssigned = false;
    const stateIds = Object.keys(stateObj);
    for(let i = 0; i < stateIds.length; i++){
        const stateId = stateIds[i];
        const item = stateObj[stateId];
        if(item[sublistKey] && item[sublistKey].length){
            atLeastOneAssigned = true;
            break;
        }
    }
    return atLeastOneAssigned;
}

class SelectDataListPage extends React.Component{
    
    state={
        generateModalOpen: false,
        loading: true,
        errorMsg: "",
    }

    componentDidMount(){
        // This will run through every item, 
        // but trimming it to stop on error will only matter
        // if there are errors
        // TODO revisit if page is slow
        const membersNumb = Object.keys(this.props.members);
        const groupsNumb = Object.keys(this.props.groups);
        const tasksNumb = Object.keys(this.props.tasks);
        const membersAssigned = checkForAssigned(this.props.members, 'groups');
        const groupsAssigned = checkForAssigned(this.props.tasks, 'groups');
        const tasksAssigned = checkForAssigned(this.props.days, 'tasks');
        const errorMsg = 
            !membersNumb.length ? "No members" :
            !tasksNumb.length ? 'No tasks' :
            !groupsNumb.length ? "No groups" : 
            !membersAssigned ? "No members assigned to a group" : 
            !groupsAssigned ? "No groups assigned to a task" :
            !tasksAssigned ? "No tasks assigned to a day" :
            "";
        this.setState({
            loading: false,
            errorMsg
        })
    }

    handleGenerate = async (startDate, endDate, makeActiveRange)=>{
        const currentState = {
            members: this.props.members,
            groups: this.props.groups,
            tasks: this.props.tasks,
            days: this.props.days
        };

        this.props.handleBottomSpinner(true);
        try{
            const dateRangeData = await genNewDateRange(startDate, endDate, currentState);
            console.log("Date range gen success: ", dateRangeData)
            this.props.saveDateRange(dateRangeData);
            this.props.handleBottomSpinner(false);
            this.props.history.push('/dashboard');
            
        } catch (err){
            console.log("Error generating schedule", err);
            this.props.handleBottomSpinner(false);
        }
    }

    handleModalToggle=()=>{
        this.setState({
            generateModalOpen: !this.state.generateModalOpen
        });
    }

    setErrorMsg=(errorMsg)=>{
        this.setState({
            errorMsg
        })
    }


    render(){
        const errorMsg = this.state.errorMsg;

        return (
            <div className="data-page">
                {this.state.loading && (
                    <FullScreenSpinner />
                )}

                <Navbar />

                <GenerateSchedBtn 
                disabled={errorMsg ? true : false }
                onClick={this.handleModalToggle}/>

            
                { errorMsg && (
                    <div
                    style={{
                        width: "95%",
                        maxWidth: "400px",
                        margin: "10px auto 5px",
                        backgroundColor: "fff",
                        padding: "10px",
                        textAlign: "center"
                    }}
                    className="action-btn text-danger"
                    >
                        {errorMsg}
                    </div>
                )}
                

            <div className="select-data-cards-wrapper">
                <CardBlock>
                    <SelectDataListCard 
                    path="/members"
                    className="bg-member"
                    >
                        {icons.member}
                        <span>WORKERS</span>
                    </SelectDataListCard>

                    <SelectDataListCard 
                    path="/groups"
                    className="bg-group"
                    >
                        {icons.group}
                        <span>GROUPS</span>
                    </SelectDataListCard>
                </CardBlock>

                <CardBlock>
                    <SelectDataListCard 
                    path="/tasks"
                    className="bg-task"
                    >
                        {icons.task}
                        <span>TASKS</span>
                    </SelectDataListCard>

                    <SelectDataListCard 
                    path="/days"
                    className="bg-day"
                    >
                        {icons.day}
                        <span>DAYS</span>
                    </SelectDataListCard>
                </CardBlock>

                </div>

                <NewDateRangeModal
                open={this.state.generateModalOpen}
                handleGenerate={this.handleGenerate}
                handleCancel={this.handleModalToggle}
                />
            </div>
        )
    }
}

SelectDataListPage.propTypes={
    history: PropTypes.object.isRequired,
    handleBottomSpinner: PropTypes.func.isRequired,

    // Used to calculate errors
    members: PropTypes.object.isRequired,
    groups: PropTypes.object.isRequired,
    tasks: PropTypes.object.isRequired,
    days: PropTypes.object.isRequired
}

const mapDispatch = {
    saveDateRange
}

export default connect(store=>({
    members: store.members,
    groups: store.groups,
    tasks: store.tasks,
    days: store.days
}), mapDispatch
)( SelectDataListPage );