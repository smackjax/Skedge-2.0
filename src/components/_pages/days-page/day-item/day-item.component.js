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
    handleEdit: PropTypes.func.isRequired
}

export default DayListItem;