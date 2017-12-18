import React from 'react';
import * as icons from '../data-page-components/_icons';

const initialState={
    bulkModalOpen: false,
    actionIcon: null,
    handleBulkConfirm: ()=>{}
}

const WithBulkModalControls = (WrappedComponent)=>{
    return class extends React.Component{
        state={...initialState}
        handleOpenBulkAddTo(handleBulkConfirm){

            this.setState({
                bulkModalOpen: true,
                bulkActionIcon: icons.plus,
                handleBulkConfirm
            });
        }
        handleOpenBulkRemoveFrom(handleBulkConfirm){
            this.setState({
                bulkModalOpen: true,
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
                bulkActionIcon={this.state.bulkActionIcon}
                bulkModalOpen={this.state.bulkModalOpen}
                handleOpenAddTo={this.handleOpenBulkAddTo.bind(this)}
                handleOpenRemoveFrom={this.handleOpenBulkRemoveFrom.bind(this)}
                handleBulkConfirm={this.state.handleBulkConfirm}
                handleCloseBulkModal={this.handleCloseBulkModal.bind(this)}
                />
            )
        }
    }    
}

export default WithBulkModalControls;