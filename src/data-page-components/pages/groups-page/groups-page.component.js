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

// Page unique vars
import { 
    GroupItemEditModal as ItemEditModal,
    GroupBulkModal as BulkSelectModal
} from '../../_modals/';
import GROUP_ACTIONS from '../../../_redux/actions/group.actions';
import ItemToList from './group-item/group-item.component';
import { GROUP as DATATYPE } from '../../_DATATYPES';

const pageClass = 'groups';
const bgColor = 'bg-group';
const primaryIcon = icons.group;
const bulkIcon = icons.task;
const bulkBgClass = 'bg-task';

const GroupsPage = (props)=>{
    const BoundActs = bindActionCreators(GROUP_ACTIONS, props.dispatch);
    
    const handleNew=()=>{
        props.handleSetEdit(DATATYPE({}));  
    }
    const handleSave=(saveItem)=>{
        const cleanedItem = DATATYPE(saveItem);
        BoundActs.saveGroup(cleanedItem);
    }
    const handleDelete=(itemId)=>{
        BoundActs.deleteGroup(itemId);
        props.handleClearEdit();
    }
    const handleAddTo=(taskIds)=>{
        BoundActs.addGroupsToTasks(
            props.selectedIds,
            taskIds
        );
    }
    const handleRemoveFrom=(taskIds)=>{
        BoundActs.removeGroupsFromTasks(
            props.selectedIds,
            taskIds
        );
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
                <span>Groups</span>
            </ListPageHeader>            

            <ListItemsWrapper>
                {props.itemArray.map(
                    (group, index)=>{
                    const selected=
                        props.selectedIds.includes(group.id);
                    return <ItemToList
                        key={"item"+index}
                        group={group}
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
                handleSave={handleSave}
                handleDelete={handleDelete}
                handleClearEdit={props.handleClearEdit}
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


GroupsPage.propTypes = {
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
        itemsById: store.groups
    }))( WithItemArrayControls(WithBulkModalControls(GroupsPage)));