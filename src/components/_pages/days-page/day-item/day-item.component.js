import React from 'react';
import PropTypes from 'prop-types';

import { 
    SelectableListItem 
} from '../../../list-page-generics/index';

const DayListItem = (props)=>{
    const bgColor = "bg-day";
    const day = props.day;
    return (
        <SelectableListItem 
        selected={props.selected}
        handleSelect={props.handleSelect}
        itemId={day.id}
        handleEdit={props.handleEdit}
        bgColorClassName={bgColor}
        >
            <span>{day.name}</span>
        </SelectableListItem>
    )
}

DayListItem.propTypes={
    day: PropTypes.object.isRequired,
    selected: PropTypes.bool.isRequired,
    handleSelect: PropTypes.func.isRequired,
    handleEdit: PropTypes.func.isRequired
}

export default DayListItem;