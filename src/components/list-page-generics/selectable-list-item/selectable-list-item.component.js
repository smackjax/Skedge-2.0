import React from 'react';
import PropTypes from 'prop-types';
import {ListItem, SelectItemCheckbox} from '../index';
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
            { // Only need a checkbox if there is a handler
                props.handleSelect && (
                <SelectItemCheckbox
                value={props.itemId}
                checked={props.selected}
                onChange={props.handleSelect}
                />
            )}
            
        </ListItem>
    )
}

SelectableListItem.proptypes = {
    bgColorClassName: PropTypes.string.isRequired,
    itemId: PropTypes.string.isRequired,
    handleSelect: PropTypes.func,
    selected: PropTypes.bool,
    handleEdit: PropTypes.func.isRequired
}

export default SelectableListItem;