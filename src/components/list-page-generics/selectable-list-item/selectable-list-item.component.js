import React from 'react';
import PropTypes from 'prop-types';
import {ListItem, EditItemBtn, SelectItemCheckbox} from '../index';
import {vDots} from '../../_icons';

import './selectable-list-item.style.css';
const SelectableListItem = (props)=>{
    const editItem=()=>{
        props.handleEdit(props.itemId);
    }
    const bgColor = props.bgColorClassName;
    return (
        <ListItem
        className="selectable-list-item"
        bgColorClassName={bgColor}>
            <label 
            className="item-info">
                <input 
                type="radio" 
                style={{display: "none"}} 
                onClick={editItem} />
                {vDots}
                {props.children}
            </label>
            <SelectItemCheckbox
            value={props.itemId}
            checked={props.selected}
            onChange={props.handleSelect}
            />
        </ListItem>
    )
}

SelectableListItem.proptypes = {
    itemId: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    bgColorClassName: PropTypes.string.isRequired,
    handleSelect: PropTypes.func.isRequired,
    handleEdit: PropTypes.func.isRequired
}

export default SelectableListItem;