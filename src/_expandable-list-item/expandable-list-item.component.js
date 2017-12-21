import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from '../_dropdown/dropdown.component';

const ExpandableListItem = (props)=>{
    <div>
        <ExpandableItemHeader
        className=""
        handleItemOpen={props.handleItemOpen}
        />
        <Dropdown>
            {
                member.tasks
            }
        </Dropdown>
    </div>
}

ExpandableListItem.propTypes={
    handleItemOpen: PropTypes.func.isRequired
}


export default ExpandableListItem;