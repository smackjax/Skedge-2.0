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
import { member as memberIcon } from '../../_icons';
import './members-selectable-sublist.style.css';

const MembersSelectableList = (props)=>{
    return (
        <SelectableSublistWrapper>
            <SelectableSublistHeader
            handleSelectAll={props.handleSelectAll}
            className="border-member text-member">
                {memberIcon}
                <span>Members</span> 
                <input type="checkbox"
                className="sublist-select-all"
                onClick={props.handleSelectAll} />
            </SelectableSublistHeader>

            <SelectableSublistItemsWrapper>
                {
                    props.itemArray.map(
                        (member, mIndex)=>{
                            const selected = 
                                props.selectedIds.includes(member.id);
                            return(
                                <SelectableSublistItem
                                key={"m-" + mIndex}
                                item={member}
                                className="border-member text-member"
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

MembersSelectableList.propTypes = {
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
        itemsById: state.members
    })
)(WithItemArrayControls(MembersSelectableList));