import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import { 
    WithBulkModalControls,
    WithItemArrayControls
} from '../../_HOCIndex';
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
import {TASK_ACTIONS} from '../../../../_redux-generics/actions';
import ItemToList from './task-item/task-item.component';
import { TASK as DATATYPE } from '../../_DATATYPES';

const pageClass = 'tasks';
const bgColor = 'bg-task';
const primaryIcon = icons.task;
const bulkIcon = icons.day;
const bulkBgClass = 'bg-day';

const TasksPage = (props)=>{
    const BoundActs = bindActionCreators(TASK_ACTIONS, props.dispatch);
    
    const handleNew=()=>{
        props.handleSetEdit(DATATYPE({}));  
    }
    const handleSave=(saveItem)=>{
        saveItem.name = saveItem.name || "(No name)";
        const cleanedItem = DATATYPE(saveItem);
        BoundActs.saveTask(cleanedItem);
    }
    const handleDelete=(itemId)=>{
        BoundActs.deleteTask(itemId);
        props.handleClearEdit();
    }
    const handleAddTo=(dayIds)=>{
        BoundActs.addTasksToDays(
            props.selectedIds,
            dayIds
        );
    }
    const handleRemoveFrom=(dayIds)=>{
        BoundActs.removeTasksFromDays(
            props.selectedIds,
            dayIds
        )
    }

    const handleOpenAddTo=()=>{ 
        props.handleOpenAddTo(handleAddTo);   
    }

    const handleOpenRemoveFrom=()=>{
        props.handleOpenRemoveFrom(handleRemoveFrom);
    }

    return (
        <ListPage className={pageClass}>

            <ListPageHeader 
            bgColorClassName={bgColor}
            >
                {primaryIcon}&nbsp;
                <span>Tasks</span>
            </ListPageHeader>            

            <ListItemsWrapper>
                {props.itemArray.map(
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
                onClick={handleOpenRemoveFrom}
                >   
                    {icons.minus}
                    {bulkIcon}
                </BulkRemoveFromBtn>

                <BulkAddToBtn
                className={bulkBgClass}
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
    handleClearEdit: PropTypes.func.isRequired
}

export default connect(
    store=>({
        itemsById: store.tasks
    }))( WithItemArrayControls(WithBulkModalControls(TasksPage)));