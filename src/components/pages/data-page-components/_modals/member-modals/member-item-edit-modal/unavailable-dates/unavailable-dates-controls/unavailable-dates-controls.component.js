import React from 'react';
import PropTypes from 'prop-types';
import { FromToDatesWithLabel } from '../../../../../inputs';
import { plus} from '../../../../../_icons';
class UnavailableDateControls extends React.Component{

    state={
        startValid: false,
        startDate: "",
        endValid: false,
        endDate: ""
    }

    handleStart=(results)=>{
        const {invalid, value} = results;
        this.setState({
            startDate: value,
            startValid: !invalid
        })
    }

    handleEnd=(results)=>{
        const {invalid, value} = results;
        this.setState({
            endDate: value,
            endValid: !invalid
        })
    }

    handleConfirm=()=>{
        const {startValid, endValid, startDate, endDate} =
            this.state;
            if(startValid, endValid){
                this.props.handleConfirm(startDate, endDate);
            }
    }

    render(){
        const { startValid, endValid } = this.state;

        return(
            <div>
            <FromToDatesWithLabel
            handleStartChange={this.handleStart}
            handleEndChange={this.handleEnd}
            />
            
            <button 
            onClick={this.handleConfirm}
            disabled={(startValid && endValid)}
            className="add-unavailable-dates-btn btn">
                {plus} Add dates
            </button>

            </div>
        ) 
    }
}

UnavailableDateControls.propTypes={
    handleConfirm: PropTypes.func.isRequired
}

export default UnavailableDateControls;