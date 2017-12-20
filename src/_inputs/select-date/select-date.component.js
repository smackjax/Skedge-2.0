import React from 'react';
// Dehydrate and hydrate ensure consistent date comparison and parsing
import { dehydrateDate, hydrateDate, prettyDate } from '../../_FUNCTIONS/dateFunctions';
import moment from 'moment';

// Checks number from textbox for letter characters
function hasOnlyNumbs(number){
    const numbStr = ''+number;
    const chars = numbStr.split();
    let onlyNumbs = true;
    chars.forEach((char)=>{
      if(isNaN(char)){
          onlyNumbs = false;
      } 
    });
    return onlyNumbs;
}

export default class SelectDateComponent extends React.Component{
     // props.onChange()
     // props.name 
     // props.labelTxt
     // props.format (opt)

    constructor(props){
        super(props);
        this.props = props;
        this.dateFormat = props.format || 'YYYY-MM-DD'
        this.state = {
            dayVal: '',
            monthVal: '',
            yearVal: '',

            // Initialize current date to match inputs
            currentDate: ('' + 
                new Date().getFullYear() + '-' +
                '01' + '-' +
                '01'),
            inputsValid: true,
        };
        
        this.handleYear = this.handleYear.bind(this);
        this.handleMonth = this.handleMonth.bind(this);
        this.handleDay = this.handleDay.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        this.handleChange(true);
    }
    
    handleChange(isOnMount){
        const day = this.state.dayVal || moment().date();
        const month = this.state.monthVal || (moment().month()+1);
        const year = this.state.yearVal || new Date().getFullYear(); 
        const dateString = ''+year+'-'+month+'-'+day; 
        const newDate = moment(dateString,'YYYY-MM-DD');

        // Checks day and month text for letters
            // Checks if date is valid
        let isValid = hasOnlyNumbs(day) && 
            hasOnlyNumbs(year) && 
                newDate.isValid() ;

        // Conditions for errors
            // Check for year being a two years before
            // OR two years after this one
        const startYearCheck = (new Date().getFullYear() -1);
        const endYearCheck = (new Date().getFullYear() + 1);
        if((parseInt(year) < startYearCheck)){
            this.setState({errMsg: 'Min: ' + startYearCheck});
            isValid = false;
        } else if(parseInt(year) > endYearCheck){
            this.setState({errMsg: 'Max: ' + endYearCheck});
            isValid = false;
        }
        //else if... other conditions
        else {this.setState({errMsg: ''})}


        this.setState(
            {dateSelected: newDate, 
                inputsValid: isValid}
        );


        const returnStr = isValid ? newDate.format(this.dateFormat) : 'Invalid date';
        // Return object with values
        this.props.onChange(
            {
                name: this.props.name,
                dateStr: returnStr,
                isValid,
                isOnMount
            }
        );
    }

    handleDay(e){
        let dayVal = e.target.value;
        this.setState({dayVal},
            this.handleChange);
        e.target.style.borderColor = hasOnlyNumbs(dayVal) ? 'initial' : 'red';
    }
    handleMonth(e){
        this.setState({monthVal: e.target.value}, 
        this.handleChange);
    }
    handleYear(e){
        const yearVal = e.target.value;
        this.setState({yearVal},
            this.handleChange);
        e.target.style.borderColor = hasOnlyNumbs(yearVal) ? 'initial' : 'red';
    }

    render(){
        // If date isn't initialized or isn't valid, set color to red
            // Otherwise to #444
        const displayStyle =  
        this.state.dateSelected ?
            this.state.dateSelected.isValid() && 
                this.state.inputsValid ? {color: '#444'} : {color: 'red'}
            : {color: 'red'};
        return(
        <div className="container select-date-input">
            <div className="row">
                <div className="col-sm-6"><b>{this.props.labelTxt}</b></div>
                <div className="col-sm-6" style={displayStyle}>{
                    this.state.inputsValid ?
                    this.state.dateSelected ? 
                    this.state.dateSelected.format('ddd, MMM DD YYYY') :  
                     '' : this.state.errMsg || 'Invalid date'
                     }</div>
            </div>
            <div className="row">
                <select defaultValue={(moment().month()+1)} onChange={this.handleMonth} className="col-4 form-control">
                    <option value="1">Jan</option>
                    <option value="2">Feb</option>
                    <option value="3">Mar</option>
                    <option value="4">Apr</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">Aug</option>
                    <option value="9">Sep</option>
                    <option value="10">Oct</option>
                    <option value="11">Nov</option>
                    <option value="12">Dec</option>
                </select>

                {/* Day textbox */}
                <input type='text' 
                onChange={this.handleDay} 
                className="col-4 form-control" 
                maxLength="2"
                placeholder='01'
                defaultValue={moment().date()}/>

                {/* Year textbox */}
                <input type='text'
                onChange={this.handleYear} 
                className="col-4 form-control"
                maxLength="4"
                placeholder="2017"
                defaultValue={new Date().getFullYear()} />
            </div>
           
        </div>
        )
    }
}


