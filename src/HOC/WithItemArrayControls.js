import React from 'react';
import PropTypes from 'prop-types';

// IMPORTANT: // This returns a function which needs 
// another prop,({itemArray}) 
// and returns an element after the second call

const WithItemArrayControls=(WrappedComponent)=>{
    // Extract prop named 'itemArray' from props list
    return(class WithSelectedControls extends React.Component{
        
        static propTypes={
            itemsById: PropTypes.object.isRequired,
            // Passes new selectedIds to this, if present
            handleNewList: PropTypes.func
        }

        state={
                allItemObjs: [],
                allItemIds: [],
                selectedIds: [], 
                editingItem: false, 
            }

            componentWillMount(){
                const {itemsById, selectedIds} = this.props;
                this.updateItemLists(itemsById);
                const initialSelected = (selectedIds || []);
                this.setState({selectedIds: initialSelected });
            }

            componentWillReceiveProps({itemsById, selectedIds}){
                this.updateItemLists(itemsById);
            }

            // Updates everything when list changes
            updateItemLists(itemsById){
                const allItemIds = [];
                const allItemObjs = [];
                for(const itemId in itemsById){
                    allItemIds.push(itemId);
                    allItemObjs.push(itemsById[itemId]);
                }
                this.setState({allItemObjs, allItemIds});
            }

            // Sets editingItem
            // Note this could be a new item obj,
            // or an item string
            handleSetEdit(editValue){
                
                if(typeof editValue === 'object'){
                    this.setState({editingItem: editValue});
                } else {
                    const itemToEdit = this.state.allItemObjs.filter(
                        item=>item.id === editValue
                    )[0];
                    this.setState({editingItem: itemToEdit});
                }
               
            }

            // Sets editingItem to false
            handleClearEdit(){ 
                this.setState({editingItem: false});
            }

            // Adds to/removes all ids from 'selectedIds'
            handleSelectAll=(e)=>{
                const selectedIds = e.target.checked ? 
                    [...this.state.allItemIds] : [];
                this.setState({selectedIds}, ()=>{
                    if(this.props.handleNewList){
                        this.props.handleNewList(selectedIds);
                    }
                });
            }

            // Adds or removes one id to 'selecteId'
            handleSelect=(e)=>{
                const id = e.target.value;
                const checked = e.target.checked;
                const selectedIds = checked ?
                    [...this.state.selectedIds, id] :
                        this.state.selectedIds.filter(cId=>cId !== id);
                this.setState({
                    selectedIds,
                    editingItem: false
                }, ()=>{
                    // Passes new 'selectedIds' to parent,
                    // if a function was passed in
                    if(this.props.handleNewList){
                        this.props.handleNewList(selectedIds);
                    }
                });
            }

            render(){
                return (
                    <WrappedComponent
                    {...this.props}
                    itemArray={this.state.allItemObjs}
                    selectedIds={this.state.selectedIds}
                    handleSelectAll={this.handleSelectAll.bind(this)}
                    handleSelect={this.handleSelect.bind(this)}
                    
                    editingItem={this.state.editingItem}
                    handleSetEdit={this.handleSetEdit.bind(this)}
                    handleClearEdit={this.handleClearEdit.bind(this)}  
                    />
                )
            }
 
        }
    )
}

export default WithItemArrayControls;