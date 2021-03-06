import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
    AddNewItemBtn 
} from '../../list-page-generics/index';

import { 
    MemberItemEditModal as ItemEditModal,
    MemberBulkModal as BulkSelectModal
} from '../../_modals/';

import * as icons from '../../_icons';
import ItemToList from './member-item/member-item.component';

import { MEMBER as DATATYPE } from '../../_DATATYPES';

import { 
    saveMember,
    deleteMemberById,
    addMemberIdsToGroupIds,
    removeMemberIdsFromGroupIds
} from '../master-api';

const pageClass = 'members';
const bgColor = 'bg-member';
const primaryIcon = icons.member;
const bulkIcon = icons.group;
const bulkBgClass = 'bg-group';

const MemberPage = (props)=>{    
    const handleNew=()=>{
        props.handleSetEdit(DATATYPE({}));  
    }
    const handleSave=(saveItem)=>{
        saveItem.name = saveItem.name || "(No name)";
        const cleanedItem = DATATYPE(saveItem);
        props.saveMember(cleanedItem);
    }
    const handleDelete=(itemId)=>{
        props.deleteMemberById(itemId);
        props.handleClearEdit();
    }


    const handleAddTo=(groupIds)=>{
        props.addMemberIdsToGroupIds(
            props.selectedIds,
            groupIds
        );
        // Fakes checkbox event
        props.handleSelectAll({ 
            target: { checked: false } 
        })
    }
    const handleRemoveFrom=(groupIds)=>{
        props.removeMemberIdsFromGroupIds(
            props.selectedIds,
            groupIds
        );

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
                <span>Members</span>
            </ListPageHeader>            

            <ListItemsWrapper>
                { alphabetizedItems.map(
                    (member, index)=>{
                    const selected=
                        selectedIds.includes(member.id);
                    return <ItemToList
                        key={"item"+index}
                        member={member}
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
                handleSave={handleSave}
                handleDelete={handleDelete}
                handleClearEdit={props.handleClearEdit}
            />
            
            <BulkSelectModal
                open={props.bulkModalOpen}
                actionIcon={props.bulkActionIcon}
                numOfItems={selectedIds.length}
                handleConfirm={props.handleBulkConfirm}
                handleCancel={props.handleCloseBulkModal}
            />

        </ListPage>
    )
} 


MemberPage.propTypes = {
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


// Binds api functions to dispatch
const apiActions = {
    saveMember,
    deleteMemberById,
    addMemberIdsToGroupIds,
    removeMemberIdsFromGroupIds
}

export default  connect(
    (store, ownProps)=>({
        itemsById: store.members,
        activeSchedId: store.meta.activeSchedId
    }), 
    apiActions)( 
        WithItemArrayControls(  WithBulkModalControls( MemberPage ) 
        ) 
    );