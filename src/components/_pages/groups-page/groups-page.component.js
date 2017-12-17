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
    GroupItemEditModal as ItemEditModal
} from '../../_modals/';
import * as icons from '../../_icons';
import GroupItem from './group-item/group-item.component';
import {GROUP} from '../../_DATATYPES';


const GroupPage = (props)=>{

    const handleNew=()=>{
        props.handleSetEdit(GROUP({}));
    }

    const handleAddTo=()=>{
        // props.selectedIds
    }
    const handleRemoveFrom=()=>{
        // props.selectedIds
    }

    const bgColor = "bg-group";

    return (
        <ListPage className="groups">

            <ListPageHeader 
            bgColorClassName={bgColor}
            >
                {icons.group}&nbsp;
                <span>Groups</span>
            </ListPageHeader>            

            <ListItemsWrapper>
                {props.itemArray.map(
                    (group, index)=>{
                    const selected=
                        props.selectedIds.includes(group.id);
                    return <GroupItem 
                        key={"group"+index}
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
                className={"bg-task"}
                onClick={handleRemoveFrom}
                >   
                    {icons.minus}
                    {icons.task}
                </BulkRemoveFromBtn>

                <BulkAddToBtn
                className={"bg-task"}
                onClick={handleAddTo}
                >
                    {icons.plus}
                    {icons.task}
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


GroupPage.propTypes = {
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
        itemsById: store.groups
    }))( WithItemArrayControls(GroupPage));
    
