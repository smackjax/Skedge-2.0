import React from 'react';
import PropTypes from 'prop-types';
import { SelectableListItem } from '../../../list-page-generics/index';

const TaskListItem = (props)=>{
    const bgColor = "bg-task";
    const task = props.task;
    return (
        <SelectableListItem 
        selected={props.selected}
        handleSelect={props.handleSelect}
        itemId={task.id}
        handleEdit={props.handleEdit}
        bgColorClassName={bgColor}
        >
            <span>{task.name}</span>
        </SelectableListItem>
    )
}

TaskListItem.propTypes={
    task: PropTypes.object.isRequired,
    selected: PropTypes.bool.isRequired,
    handleSelect: PropTypes.func.isRequired,
    handleEdit: PropTypes.func.isRequired
}

export default TaskListItem;