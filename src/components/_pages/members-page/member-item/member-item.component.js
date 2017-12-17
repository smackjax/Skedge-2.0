import React from 'react';
import PropTypes from 'prop-types';
import { SelectableListItem } from '../../../list-page-generics/index';

const MemberListItem = (props)=>{
    const bgColor = "bg-member";
    const member = props.member;
    return (
        <SelectableListItem 
        selected={props.selected}
        handleSelect={props.handleSelect}
        itemId={member.id}
        handleEdit={props.handleEdit}
        bgColorClassName={bgColor}
        >
            <span>{member.name}</span>
        </SelectableListItem>
    )
}

MemberListItem.propTypes={
    member: PropTypes.object.isRequired,
    selected: PropTypes.bool.isRequired,
    handleSelect: PropTypes.func.isRequired,
    handleEdit: PropTypes.func.isRequired
}

export default MemberListItem;