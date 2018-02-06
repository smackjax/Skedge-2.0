import React from 'react';
import PropTypes from 'prop-types';
import ScheduleControls from './schedule-controls/schedule-controls.component';
import { icons } from '../../generic-components';


class ScheduleItem extends React.Component{
    state={
        isOpen: false,
    }

    changeSchedule=()=>{
        this.props.handleChangeSchedule(this.props.id);
    }

    openDeleteSchedule=()=>{
        return this.props.handleOpenDelete(this.props.id, this.props.name)
    }

    openManageFollowers=()=>{
        return this.props.handleOpenFollowers(this.props.id)
    }

    handleOpenControls=()=>{
        this.setState({
            isOpen: true
        })
    }

    handleCloseControls=()=>{
        this.setState({
            isOpen: false
        })
    }

    render(){
        return (
            <div
            style={{
                overflow: "hidden",
                display: "flex",
                position: "relative",
                flexDirection: "row",
                width: "95%",
                maxWidth: "400px",
                margin: "10px auto"
            }}
            className="action-btn schedule-item"
            >
                <button
                onClick={this.changeSchedule}
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    width: "100%",
                    padding: "10px",
                    borderRadius: "0"
                }}
                className="bg-sched text-light"
                >            
                    <span
                    style={{
                        marginRight: "10px"
                    }}
                    >
                        { this.props.isCurrent ? icons.star : icons.sched }
                    </span>
            
                    <span 
                    style={{
                        fontSize: "16px"
                    }}
                    >
                        {this.props.name}
                    </span>
                    
                    {this.props.hasPending ? (
                        <span
                        style={{
                            marginLeft: "auto"
                        }}>
                            { icons.exclamation}
                        </span>
                    ): "" }
                </button>

                <button
                onClick={this.handleOpenControls}
                style={{
                    width: "15%",
                    color: "rgb(100,100,100)"
                }}
                > 
                    { icons.cog }
                </button>

                <ScheduleControls
                hasPending={this.props.hasPending}
                open={this.state.isOpen} 
                id={this.props.id}
                closeControls={this.handleCloseControls}
                handleDelete={ this.openDeleteSchedule }
                handleFollowers={ this.openManageFollowers }
                />
            </div>
        )
    }
}

ScheduleItem.propTypes={
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    hasPending: PropTypes.bool.isRequired,
    isCurrent: PropTypes.bool.isRequired,
    handleChangeSchedule: PropTypes.func.isRequired,
    handleOpenDelete: PropTypes.func.isRequired,
    handleOpenFollowers: PropTypes.func.isRequired,
}

export default ScheduleItem;