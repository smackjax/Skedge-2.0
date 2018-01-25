import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Navbar, icons } from '../../../generic-components';
import GenerateSchedBtn from './generate-sched-btn/generate-sched-btn.component';
import { NewSchedModal } from '../../_modals';
import CardBlock from './select-data-list-card-block/select-data-list-card-block.component';
import SelectDataListCard from './select-data-list-card/select-data-list-card.component';
import './select-data-list-page.style.css';

import { DATE_RANGE_ACTIONS } from '../../../../_redux-generics/actions';

import { genNewDateRange } from '../../../../../brains/sched-api';



class SelectDataListPage extends React.Component{
    
    state={
        generateModalOpen: false,
        errorMsg: "",
    }

    componentDidMount(){
        /* TODO Calculate empty items, give error message */
    }

    handleGenerate = async (startDate, endDate)=>{
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
            this.props.handleBottomSpinner(false);
            this.props.dispatch(
                DATE_RANGE_ACTIONS.dateRangeGenSuccess(dateRangeData)
            );
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

    render(){
        const errorMsg = this.state.errorMsg;

        return (
            <div className="data-page">
                <Navbar />

                { errorMsg && (
                    <div>
                        {errorMsg}
                    </div>
                )}
                

            <GenerateSchedBtn 
            onClick={this.handleModalToggle}/>

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

                <NewSchedModal
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
    dispatch: PropTypes.func.isRequired,
    handleBottomSpinner: PropTypes.func.isRequired,

    // Used to calculate errors
    members: PropTypes.object.isRequired,
    groups: PropTypes.object.isRequired,
    tasks: PropTypes.object.isRequired,
    days: PropTypes.object.isRequired
}


export default connect(store=>({
    members: store.members,
    groups: store.groups,
    tasks: store.tasks,
    days: store.days
}))( SelectDataListPage );