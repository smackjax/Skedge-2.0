import React from 'react';
import PropTypes from 'prop-types';
import * as icons from '../components/_icons';

const initialState={
    bulkModalOpen: false,
    actionIcon: null,
    handleBulkConfirm: null
}

const WithBulkModalControls = (WrappedComponent)=>{
    return class extends React.Component{
        state={...initialState}
        handleOpenBulkAddTo(handleBulkConfirm){
            this.setState({
                bulkActionIcon: icons.plus,
                handleBulkConfirm
            });
        }
        handleOpenBulkRemoveFrom(handleBulkConfirm){
            this.setState({
                bulkActionIcon: icons.minus,
                handleBulkConfirm
            });
        }
        handleCloseBulkModal(){
            this.setState({...initialState})
        }
        render(){
            return (
                <WrappedComponent
                {...this.props}
                bulkActionIcon={this.actionIcon}
                bulkModalOpen={this.state.bulkModalOpen}
                handleOpenAddTo={this.handleOpenBulkAddTo.bind(this)}
                handleOpenRemoveFrom={this.handleOpenBulkRemoveFrom.bind(this)}
                handleBulkConfirm={this.state.handleBulkConfirm.bind(this)}
                handleCloseBulkModal={this.handleCloseBulkModal.bind(this)}
                />
            )
        }
    }    
}

export default WithBulkModalControls;