import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {WithItemArrayControls} from '../../_HOCIndex';
import {
    SelectableSublistWrapper,
    SelectableSublistHeader,
    SelectableSublistItemsWrapper,
    SelectableSublistItem
} from '../_generic-selectable-sublist-components';
import { task as taskIcon, exclamation } from '../../_icons';
import './tasks-selectable-sublist.style.css';



const TasksSelectableList = (props)=>{
    if(!props.itemArray.length) return (
        <div
        style={{
            margin: "7px auto",
            textAlign: "center",
            padding: "5px",
            borderWidth: "1px",
            borderStyle: "solid"
        }}
        className="text-danger border-danger"
        >
            {exclamation}{taskIcon} No Tasks
        </div>
    )
    return (
        <SelectableSublistWrapper>
            <SelectableSublistHeader
            handleSelectAll={props.handleSelectAll}
            className="border-task text-task">
                {taskIcon}
                <span>Tasks</span> 
                <input type="checkbox"
                className="sublist-select-all"
                onClick={props.handleSelectAll} />
            </SelectableSublistHeader>

            <SelectableSublistItemsWrapper>
                {
                    props.itemArray.map(
                        (task, gIndex)=>{
                            const selected = 
                                props.selectedIds.includes(task.id);
                            return(
                                <SelectableSublistItem
                                key={"t-" + gIndex}
                                item={task}
                                className="border-task text-task"
                                selected={selected}
                                handleSelect={props.handleSelect}
                                />
                            )
                        }
                    )
                }
            </SelectableSublistItemsWrapper>
        </SelectableSublistWrapper>
    )

}

TasksSelectableList.propTypes = {
    // From WithSelectedControls 
    itemArray: PropTypes.arrayOf(
        PropTypes.shape({
            id : PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
        })
    ).isRequired,
    selectedIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    handleSelectAll: PropTypes.func.isRequired,
    handleSelect: PropTypes.func.isRequired
}

export default connect(
    state=>({
        itemsById: state.tasks
    })
)(WithItemArrayControls(TasksSelectableList));