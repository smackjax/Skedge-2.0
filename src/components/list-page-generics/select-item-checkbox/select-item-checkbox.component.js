import React from 'react';
import PropTypes from 'prop-types';
import './select-item-checkbox.style.css';
const SelectItemCheckbox = (props)=>{
    return (
        <label className="select-item-checkbox-label">
            <input type="checkbox"
            className="select-item-checkbox"
            checked={props.checked}
            onChange={props.onChange}
            value={props.value}
            />
        </label>
    )
}

SelectItemCheckbox.propTypes={
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired
}

export default SelectItemCheckbox;