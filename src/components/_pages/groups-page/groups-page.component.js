import React from 'react';
import PropTypes from 'prop-types';
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

import { 
    GroupItemEditModal as ItemEditModal,
    GroupBulkModal as BulkSelectModal
} from '../../_modals/';

import * as icons from '../../_icons';
import ItemToList from './group-item/group-item.component';

import { GROUP as DATATYPE } from '../../_DATATYPES';

const pageClass = 'groups';
const bgColor = 'bg-group';
const primaryIcon = icons.group;
const bulkIcon = icons.task;
const bulkBgClass = 'bg-task';

const GroupPage = (props)=>{
    const handleNew=()=>{
        props.handleSetEdit(DATATYPE({}));
    }
    const handleAddTo=(idsToAdd)=>{
        console.log("Ids to add from modal: ")
        console.log(idsToAdd);
    }
    const handleRemoveFrom=(idsToRemove)=>{
        console.log("Ids to remove from modal: ")
        console.log(idsToRemove);
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


GroupPage.propTypes = {
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
    }))( WithItemArrayControls(WithBulkModalControls(GroupPage)));