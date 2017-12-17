import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { WithItemArrayControls } from '../../_HOCIndex';
import {
    ListPage,
    ListPageHeader,
    ListItemsWrapper } from '../../list-page-generics/index';

import {
    DayItemEditModal as ItemEditModal
} from '../../_modals/';

import * as icons from '../../_icons';
import DayItem from './day-item/day-item.component';


const DaysPage = (props)=>{


    const bgColor = "bg-day";

    return (
        <ListPage className="groups">

            <ListPageHeader 
            bgColorClassName={bgColor}
            >
                {icons.day}&nbsp;
                <span>Days</span>
            </ListPageHeader>            

            <ListItemsWrapper>
                {props.itemArray.map(
                    (day, index)=>{
                    const selected=
                        props.selectedIds.includes(day.id);
                    return <DayItem 
                        key={"day"+index}
                        day={day}
                        selected={selected}
                        handleEdit={props.handleSetEdit}
                        handleSelect={props.handleSelect} 
                        />
                    }
                )}
            </ListItemsWrapper>

            <ItemEditModal
                open={(props.editingItem ? true : false)}
                bgColorClassName={bgColor}
                item={props.editingItem}
                handleClearEdit={props.handleClearEdit}
            />

        </ListPage>
    )
} 


DaysPage.propTypes = {
    // Array of objects
    itemArray: PropTypes.array.isRequired,
    // Array of strings
    selectedIds: PropTypes.array.isRequired,
    // Either an item object, or a falsey value
    editingItem: PropTypes.any,
    
    handleSelect: PropTypes.func.isRequired,
    handleSelectAll: PropTypes.func.isRequired,
    handleSetEdit: PropTypes.func.isRequired,
    handleClearEdit: PropTypes.func.isRequired
}

export default connect(
    store=>({
        itemsById: store.days
    }))( WithItemArrayControls(DaysPage));
    
