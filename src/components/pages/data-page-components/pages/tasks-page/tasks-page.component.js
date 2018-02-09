import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { 
    WithBulkModalControls,
    WithItemArrayControls
} from '../../_HOCIndex';

import { sort } from '../../functions';

import {
    ListPage,
    ListPageHeader,
    ListItemsWrapper,
    ListControlsWrapper, 
    BulkAddToBtn, 
    BulkRemoveFromBtn, 
    AddNewItemBtn } from '../../list-page-generics/index';
import * as icons from '../../_icons';
import { 
    TaskItemEditModal as ItemEditModal,
    TaskBulkModal as BulkSelectModal
} from '../../_modals/';
import ItemToList from './task-item/task-item.component';
import { TASK as DATATYPE } from '../../_DATATYPES';

import { 
    saveTask,
    deleteTaskById,
    addTaskIdsToDays,
    removeTaskIdsFromDays
} from '../master-api';

const pageClass = 'tasks';
const bgColor = 'bg-task';
const primaryIcon = icons.task;
const bulkIcon = icons.day;
const bulkBgClass = 'bg-day';

const TasksPage = (props)=>{

    const handleNew=()=>{
        props.handleSetEdit(DATATYPE({}));  
    }
    const handleSave=(saveItem)=>{
        saveItem.name = saveItem.name || "(No name)";
        const cleanedItem = DATATYPE(saveItem);
        props.saveTask(cleanedItem);
    }
    const handleDelete=(itemId)=>{
        props.deleteTaskById(itemId);
        props.handleClearEdit();
    }
    
    const handleAddTo=(dayIds)=>{
        props.addTaskIdsToDays(
            props.selectedIds, 
            dayIds
        )

        // Fakes checkbox event
        props.handleSelectAll({ 
            target: { checked: false } 
        })
    }
    const handleRemoveFrom=(dayIds)=>{
        props.removeTaskIdsFromDays(
            props.selectedIds,
            dayIds
        )

        // Fakes checkbox event
        props.handleSelectAll({ 
            target: { checked: false } 
        })
    }

    const handleOpenAddTo=()=>{ 
        props.handleOpenAddTo(handleAddTo);   
    }

    const handleOpenRemoveFrom=()=>{
        props.handleOpenRemoveFrom(handleRemoveFrom);
    }

    const selectedIds = props.selectedIds;

    const alphabetizedItems = sort(props.itemArray, "name");

    return (
        <ListPage className={pageClass}>

            <ListPageHeader 
            bgColorClassName={bgColor}
            >
                {primaryIcon}&nbsp;
                <span>Tasks</span>
            </ListPageHeader>            

            <ListItemsWrapper>
                {alphabetizedItems.map(
                    (task, index)=>{
                    const selected=
                        props.selectedIds.includes(task.id);
                    return <ItemToList
                        key={"item"+index}
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
                className={bulkBgClass}
                disabled={selectedIds.length ? false : true}
                onClick={handleOpenRemoveFrom}
                >   
                    {icons.minus}
                    {bulkIcon}
                </BulkRemoveFromBtn>

                <BulkAddToBtn
                className={bulkBgClass}
                disabled={selectedIds.length ? false : true}
                onClick={handleOpenAddTo}
                >
                    {icons.plus}
                    {bulkIcon}
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
                handleDelete={handleDelete}
                handleSave={handleSave}
            />
            
            <BulkSelectModal
                open={props.bulkModalOpen}
                actionIcon={props.bulkActionIcon}
                numOfItems={props.selectedIds.length}
                handleConfirm={props.handleBulkConfirm}
                handleCancel={props.handleCloseBulkModal}
            />

        </ListPage>
    )
} 


TasksPage.propTypes = {
    // From WithBulkModalControls
    bulkModalOpen: PropTypes.bool.isRequired,
    bulkActionIcon: PropTypes.object,
    handleOpenAddTo: PropTypes.func,
    handleOpenRemoveFrom: PropTypes.func,
    handleBulkConfirm: PropTypes.func,
    handleCloseBulkModal: PropTypes.func,

    // From WithItemArrayControls
    itemArray: PropTypes.array.isRequired,
    selectedIds: PropTypes.array.isRequired,
    editingItem: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    handleSelect: PropTypes.func.isRequired,
    handleSelectAll: PropTypes.func.isRequired,
    handleSetEdit: PropTypes.func.isRequired,
    handleClearEdit: PropTypes.func.isRequired,

    // From connect
    itemsById: PropTypes.object.isRequired,
    activeSchedId: PropTypes.string.isRequired
}

// Binds api functions to dispatch
const apiActions={
    saveTask,
    deleteTaskById,
    addTaskIdsToDays,
    removeTaskIdsFromDays
}

export default connect(
    store=>({
        itemsById: store.tasks,
        activeSchedId: store.meta.activeSchedId
    }), apiActions)( WithItemArrayControls(WithBulkModalControls(TasksPage)));