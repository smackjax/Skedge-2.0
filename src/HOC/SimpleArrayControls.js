import React from 'react';

// This just takes, stores, and returns an array. That's it.
export default (WrappedComponent)=>{
    return class extends React.Component{
        state={
            currentArray: []
        }
        handleNewArray(newArray){
            this.setState({currentArray: [...newArray]})
        }
        render(){
            return (
            <WrappedComponent
            {...this.props}
            handleNewArray={this.handleNewArray}
            currentArray={this.currentArray}
            />
            )
        }
        
    }
}