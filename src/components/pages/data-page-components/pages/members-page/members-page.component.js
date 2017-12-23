import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
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
    MemberItemEditModal as ItemEditModal,
    MemberBulkModal as BulkSelectModal
} from '../../_modals/';

import * as icons from '../../_icons';
import ItemToList from './member-item/member-item.component';
import {MEMBER_ACTIONS} from '../../../../_redux-generics/actions';
import { MEMBER as DATATYPE } from '../../_DATATYPES';


const pageClass = 'members';
const bgColor = 'bg-member';
const primaryIcon = icons.member;
const bulkIcon = icons.group;
const bulkBgClass = 'bg-group';

const MemberPage = (props)=>{

    const BoundActs = bindActionCreators(MEMBER_ACTIONS, props.dispatch);
    
    const handleNew=()=>{
        props.handleSetEdit(DATATYPE({}));  
    }
    const handleSave=(saveItem)=>{
        const cleanedItem = DATATYPE(saveItem);
        BoundActs.saveMember(cleanedItem);
    }
    const handleDelete=(itemId)=>{
        // Todo
        // this works, but I'd like something less hacky
        BoundActs.deleteMember(itemId);
        props.handleClearEdit();
    }
    const handleAddTo=(groupIds)=>{
        BoundActs.addMembersToGroups(
            props.selectedIds,
            groupIds
        );
    }
    const handleRemoveFrom=(groupIds)=>{
        BoundActs.removeMembersFromGroups(
            props.selectedIds,
            groupIds
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
                <span>Members</span>
            </ListPageHeader>            

            <ListItemsWrapper>
                {props.itemArray.map(
                    (member, index)=>{
                    const selected=
                        props.selectedIds.includes(member.id);
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

export default connect(
    store=>({
        itemsById: store.members
    }))( WithItemArrayControls(WithBulkModalControls(MemberPage)));