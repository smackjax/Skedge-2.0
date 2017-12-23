import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from '../../dropdown/dropdown.component';
import ListItemHeader from '../view-list-item-header/view-list-item-header.component.js';
import * as icons from '../../icons';
import './expandable-view-list-item.style.css';


class ExpandableViewListItem extends React.Component{
    state={ open: false }

    componentWillReceiveProps(newProps){
        if(newProps.open){
            this.setState({
                open: newProps.open
            });
        }
    }
    handleToggle=()=>{
        this.setState({ 
            open :!this.state.open
        });
    }

    render(){
        const className =
            "expandable-view-list-item " + 
                (this.props.className || "");
        return(
            <div className={className}>

                <ListItemHeader 
                className={"expandable " + (this.props.headerClassName || "")}
                >  
                    <span>{this.props.itemIcon}{this.props.itemText}</span>
                    <button
                    onClick={this.handleToggle} 
                    >
                        {this.state.open ? icons.chevUp : icons.chevDown}
                    </button>
                </ListItemHeader>

                <Dropdown 
                open={this.state.open}
                className="view-list-item-content">
                    {this.props.children}
                </Dropdown>
            </div>
        )
    }
}

ExpandableViewListItem.propTypes={
    className: PropTypes.string.isRequired,
    headerClassName: PropTypes.string.isRequired,
    itemText: PropTypes.string.isRequired,
    open: PropTypes.bool,

}

export default ExpandableViewListItem;