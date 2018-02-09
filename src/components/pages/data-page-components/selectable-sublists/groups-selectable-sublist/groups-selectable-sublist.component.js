import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {WithItemArrayControls} from '../../_HOCIndex';
import {
    SelectableSublistWrapper,
    SelectableSublistHeader,
    SelectableSublistItemsWrapper,
    SelectableSublistItem
} from '../_generic-selectable-sublist-components';
import { group as groupIcon, exclamation } from '../../_icons';
import './groups-selectable-sublist.style.css';



const GroupsSelectableList = (props)=>{
    
    if(!props.itemArray.length) return(
        <div
        style={{
            margin: "7px auto",
            textAlign: "center",
            padding: "5px",
            borderWidth: "1px",
            borderStyle: "solid"
        }}
        className="text-danger border-danger"
        >
            {exclamation}{groupIcon} No Groups
        </div>
    )

    return (
        <SelectableSublistWrapper>
            <SelectableSublistHeader
            handleSelectAll={props.handleSelectAll}
            className="border-group text-group">
                {groupIcon}
                <span>Groups</span> 
                <input type="checkbox"
                className="sublist-select-all"
                onClick={props.handleSelectAll} />
            </SelectableSublistHeader>

            <SelectableSublistItemsWrapper>
                {
                    props.itemArray.map(
                        (group, gIndex)=>{
                            const selected = 
                                props.selectedIds.includes(group.id);
                            return(
                                <SelectableSublistItem
                                key={"g-" + gIndex}
                                item={group}
                                className="border-group text-group"
                                selected={selected}
                                handleSelect={props.handleSelect}
                                />
                            )
                        }
                    )
                }
            </SelectableSublistItemsWrapper>
        </SelectableSublistWrapper>
    )

}

GroupsSelectableList.propTypes = {
    // From WithSelectedControls 
    itemArray: PropTypes.arrayOf(
        PropTypes.shape({
            id : PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
        })
    ).isRequired,
    selectedIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    handleSelectAll: PropTypes.func.isRequired,
    handleSelect: PropTypes.func.isRequired
}

export default connect(
    state=>({
        itemsById: state.groups
    })
)(WithItemArrayControls(GroupsSelectableList));