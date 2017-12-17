import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { WithItemArrayControls } from '../../_HOCIndex';
import {
    ListPage,
    ListPageHeader,
    ListItemsWrapper,
    ListControlsWrapper, 
    BulkAddToBtn, 
    BulkRemoveFromBtn, 
    AddNewItemBtn } from '../../list-page-generics/index';
import {
    TaskItemEditModal as ItemEditModal
} from '../../_modals/';

import * as icons from '../../_icons';
import TaskItem from './task-item/task-item.component';
import {TASK} from '../../_DATATYPES';


const TasksPage = (props)=>{

    const handleNew=()=>{
        props.handleSetEdit(TASK({}));
    }

    const handleAddTo=()=>{
        // props.selectedIds
    }
    const handleRemoveFrom=()=>{
        // props.selectedIds
    }

    const bgColor = "bg-task";

    return (
        <ListPage className="tasks">

            <ListPageHeader 
            bgColorClassName={bgColor}
            >
                {icons.task}&nbsp;
                <span>Tasks</span>
            </ListPageHeader>            

            <ListItemsWrapper>
                {props.itemArray.map(
                    (task, index)=>{
                    const selected=
                        props.selectedIds.includes(task.id);
                    return <TaskItem 
                        key={"task"+index}
                        task={task}
                        selected={selected}
                        handleEdit={props.handleSetEdit}
                        handleSelect={props.handleSelect} 
                        />
                    }
                )}
            </ListItemsWrapper>

            <ListControlsWrapper>
                
                <BulkRemoveFromBtn
                className={"bg-day"}
                onClick={handleRemoveFrom}
                >   
                    {icons.minus}
                    {icons.task}
                </BulkRemoveFromBtn>

                <BulkAddToBtn
                className={"bg-day"}
                onClick={handleAddTo}
                >
                    {icons.plus}
                    {icons.day}
                </BulkAddToBtn>
                
                <AddNewItemBtn 
                className={bgColor}
                onClick={handleNew}
                />
            
            </ListControlsWrapper>

            <ItemEditModal
                open={(props.editingItem ? true : false)}
                bgColorClassName={bgColor}
                item={props.editingItem}
                handleClearEdit={props.handleClearEdit}
            />

        </ListPage>
        
    )
} 


TasksPage.propTypes = {
    // Array of objects
    itemArray: PropTypes.array.isRequired,
    // Array of strings
    selectedIds: PropTypes.array.isRequired,
    // Either an item object, or a falsey value
    editingItem: PropTypes.any,
    
    handleSelect: PropTypes.func.isRequired,
    handleSelectAll: PropTypes.func.isRequired,
    handleSetEdit: PropTypes.func.isRequired,
    handleClearEdit: PropTypes.func.isRequired
}

export default connect(
    store=>({
        itemsById: store.tasks
    }))( WithItemArrayControls(TasksPage));
    
