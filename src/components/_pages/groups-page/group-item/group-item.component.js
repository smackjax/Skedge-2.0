import React from 'react';
import PropTypes from 'prop-types';
import { SelectableListItem } from '../../../list-page-generics/index';
import * as icons from '../../../_icons';

const GroupListItem = (props)=>{
    const bgColor = "bg-group";
    const group = props.group;
    return (
        <SelectableListItem 
        selected={props.selected}
        handleSelect={props.handleSelect}
        itemId={group.id}
        handleEdit={props.handleEdit}
        bgColorClassName={bgColor}
        >
            <span>{group.name}</span>
        </SelectableListItem>
    )
}

GroupListItem.propTypes={
    group: PropTypes.object.isRequired,
    selected: PropTypes.bool.isRequired,
    handleSelect: PropTypes.func.isRequired,
    handleEdit: PropTypes.func.isRequired
}

export default GroupListItem;