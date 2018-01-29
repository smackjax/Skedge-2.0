import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import shortid from 'shortid';
import * as icons from '../icons';
import { connect } from 'react-redux';
import Navbar from '../../../_generic-components/navbar/navbar.component';
import { changeActiveScheduleId, deleteScheduleById } from '../../api';
import PastSchedControls from './past-sched-control-btns/past-sched-control-btns.component';
import {
    ExpandableViewListItem as ExpandableItem
} from '../../../_generic-components/list-generics/';



class PastSchedulesPage extends React.Component{

    state={
        stagedSched: "",
        confirmModalOpen: false
    }

    handleChangeSched=(sched)=>{
        this.setState({
            stagedSched: sched
        }, this.handleModalToggle);
    }

    handleModalToggle=()=>{
        this.setState({
            modalOpen: !this.state.modalOpen
        });
    }

    handleMakeActive=(schedId)=>{
        this.props.changeActiveScheduleId(schedId);
    }
    handleDelete=(schedId)=>{
        this.props.deleteScheduleById(schedId);
    }

    render(){
        const schedIds = Object.keys(this.props.schedules);
        return (
            <div className="page past-schedules">
                <Navbar />
                <div className="past-schedules-list">
                    {   schedIds.map(
                        (id, sIndex)=>{
                            const sched = this.props.schedules[id];
                            const start = 
                                moment(sched.startDate).format("MMM DD");
                            const end = 
                                moment(sched.endDate).format("MMM DD");
                            const headerText = 
                               `${start} - ${end}`;
                            const isActive = id === this.props.activeSchedId;
                            const bgColor = isActive ?
                                    "bg-sched" : "bg-dark-gray";
                            const borderColor = isActive ?
                                "border-sched" : "border-dark-gray";
                            return( 
                            <ExpandableItem
                            key={"s"+shortid()}
                            className={"dates-view-list border-sched " + borderColor}
                            headerClassName={"bg-sched text-light " + bgColor}
                            itemText={headerText}
                            itemIcon={icons.sched}
                            >
                                <PastSchedControls
                                id={id}
                                makeActive={this.handleMakeActive}
                                handleDelete={this.handleDelete}
                                /> 
                            </ExpandableItem>
                            )
                        }
                    )}
                </div>
                    
            
            </div>
        )
    }
}

PastSchedulesPage.propTypes={
    schedules: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
}

const mapDispatchToProps={
    changeActiveScheduleId,
    deleteScheduleById
}

export default connect(
    store=>({
        schedules: store.schedules,
        activeSchedId: store.meta.activeSchedId
    }), mapDispatchToProps
)(PastSchedulesPage);