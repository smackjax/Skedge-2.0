import React from 'react';
import PropTypes from 'prop-types';
import './selectable-sublist-item.style.css';

const SelectableSublistItem = (props)=>{
    const className =
        "selectable-sublist-item " + 
            (props.className || "");
    return (
        <label
        className={className}>
            <input type="checkbox"
            checked={props.selected}
            value={props.item.id}
            onChange={props.handleSelect}
            />
            {props.item.name}
        </label>
    )
}

SelectableSublistItem.propTypes={
    item: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    }).isRequired,
    className: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    handleSelect: PropTypes.func.isRequired,
}

export default SelectableSublistItem;