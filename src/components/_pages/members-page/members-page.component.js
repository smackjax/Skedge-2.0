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
    MemberItemEditModal as ItemEditModal,
    MemberBulkModal as BulkSelectModal
} from '../../_modals/';

import * as icons from '../../_icons';
import ItemToList from './member-item/member-item.component';

import { MEMBER as DATATYPE } from '../../_DATATYPES';

const pageClass = 'members';
const bgColor = 'bg-members';
const primaryIcon = icons.member;
const bulkIcon = icons.group;
const bulkBgClass = 'bg-group';

const MemberPage = (props)=>{
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
        <ListPage className="members">

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
                handleClearEdit={props.handleClearEdit}
            />
            
            <BulkSelectModal
                open={props.bulkModalOpen}
                actionIcon={props.bulkActionIcon}
                numOfItems={props.selectedIds.length}
                handleConfirm={props.handleConfirm}
                handleCancel={props.handleBulkModalClose}
            />

        </ListPage>
    )
} 


MemberPage.propTypes = {
    // From WithBulkModalControls
    bulkModalOpen: PropTypes.bool.isRequired,
    bulkActionIcon: PropTypes.instanceOf(React.Component),
    handleOpenAddTo: PropTypes.func,
    handleOpenRemoveFrom: PropTypes.func,
    handleBulkConfirm: PropTypes.func,
    handleBulkModalClose: PropTypes.func,

    // From WithItemArrayControls
    itemArray: PropTypes.array.isRequired,
    selectedIds: PropTypes.array.isRequired,
    editingItem: PropTypes.oneOfType([PropTypes.object, false]),
    handleSelect: PropTypes.func.isRequired,
    handleSelectAll: PropTypes.func.isRequired,
    handleSetEdit: PropTypes.func.isRequired,
    handleClearEdit: PropTypes.func.isRequired
}

export default connect(
    store=>({
        itemsById: store.members
    }))( WithItemArrayControls(MemberPage));
    
