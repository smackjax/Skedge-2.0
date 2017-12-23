import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './date-select-input.style.css';

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

export default class DateSelectInput extends React.Component{

    static propTypes={
        className: PropTypes.string,
        id: PropTypes.string,
        name: PropTypes.string,
        onChange: PropTypes.func.isRequired,

        format: PropTypes.string,
        valueOnMount: PropTypes.string,
        validateFunc: PropTypes.func
    }

    constructor(props){
        super(props);
        this.props = props;
        const dateFormat = props.format || 'YYYY-MM-DD'


        const Value = props.value ?
            moment.isMoment(props.value) ? 
                props.value :
            moment(props.value, dateFormat) : 
                null;

        const date = Value ?
            Value.date() : 
                props.valueOnMount ?
                    moment().date() : "";
        
        const month = Value ? 
            Value.month() :
                moment().month();

        const year = Value ? 
            Value.year() :
            props.valueOnMount ?
                new Date().getFullYear() : "";
        
        this.state = {
            dateVal: date,
            monthVal: month,
            yearVal: year,
            currentValue: ""
        };
        
        this.handleYear = this.handleYear.bind(this);
        this.handleMonth = this.handleMonth.bind(this);
        this.handleDay = this.handleDay.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    componentDidMount(){
        if(this.props.valueOnMount){
            this.handleChange();
        }
        
    }
    
    handleChange(){
        const day = this.state.dateVal;
        const month = this.state.monthVal;
        const year = this.state.yearVal; 
        const dateString = ''+year+'-'+month+'-'+day; 
        const dateFormat = 'YYYY-MM-DD';
        const newDate = moment(dateString, dateFormat);

        // Sets 'date' input border to invalid color,
        // if date is later than last date of month
        const dateElem = this.refs.dateSelectDay;
        const compareDate = 
            moment().year(year).month(month).endOf('month').date();
        
        dateElem.style.color =
        (   // If a char is not a number
            !hasOnlyNumbs(day) || 
            // Or if all fields set
            ((year && year.length === 4 && month && day) &&        
            // and date is later than possible
            (parseInt(day, 10) > compareDate))
        ) ? 
        // Set to invalid color
        (this.props.invalidColor || "") : 
        // Or if all conditions pass, set to blank
        "" 
            

        // Checks day and month text for letters
        // Checks if date is valid
        // Checks if outside either year boundary
        // Checks custom validate function
        const dateValid = newDate.isValid();
        const dayNumbs = hasOnlyNumbs(day);
        const yearNumbs = hasOnlyNumbs(year);
        const maxYear = (this.props.maxYear ? 
            (parseInt(year, 10) <= this.props.maxYear) : true );
        const minYear = (this.props.minYear ? 
            (parseInt(year, 10) >= this.props.minYear) : true );
        const customValidate = (this.props.validateFunc ? 
            this.props.validateFunc(newDate) : true );

        
        let isValid = (
            dateValid && 
            dayNumbs && 
            yearNumbs && 
            maxYear && 
            minYear && 
            customValidate
        ) ? true : false

        const outputFormat = 
            this.props.outputFormat || 'YYYY-MM-DD';
        const returnStr =             
            (!minYear && yearNumbs && year.length === 4) ? "Choose later year" :
            (!maxYear && yearNumbs && year.length === 4) ? "Choose earlier year" :
            (parseInt(day, 10) > compareDate) ? "Choose earlier date" :
            (parseInt(day, 10) <= 0) ? "Choose later date" :
            !isValid  ? 'Invalid date' :
            newDate.format(outputFormat);

        const inputName = this.props.name || null;

        const finalInvalidCheck =
            !(year && year.length === 4 && month && day && isValid);

        this.props.onChange(
            {
                wrapperRef: this.refs.dateSelectWrapper, 
                yearRef: this.refs.dateSelectYear,
                monthRef: this.refs.dateSelectMonth,
                dayRef: this.refs.dateSelectDay,
                name: inputName,
                invalid: finalInvalidCheck,
                value: returnStr,
                year: this.state.yearVal,
                month: this.state.monthVal,
                date: this.state.dateVal,
            }
        );
        this.setState(
            {
                currentValue: returnStr,
                invalid: !isValid
            }
        );
    }

    handleDay(e){
        const elem = e.target;
        let dateVal = elem.value;
        this.setState(
            { dateVal },
            this.handleChange
        ); 
    }

    handleMonth(e){
        const elem = e.target;
        this.setState(
            { 
                monthVal: elem.value 
            }, 
        this.handleChange);
    }

    handleYear(e){
        const elem = e.target;
        const yearVal = elem.value;
        this.setState(
            { yearVal },
            ()=>{
                elem.style.color = ( 
                    // If only numbers
                    (hasOnlyNumbs(yearVal)) &&
                    // And not too late
                    (this.props.maxYear ? 
                        (parseInt(yearVal, 10) <= this.props.maxYear): true) &&
                    // Or too early
                    (this.props.minYear ? 
                        (parseInt(yearVal, 10) >= this.props.minYear): true)  
                ) ? 
                // Border is '
                '' : 
                    // If there was an invalid condition, check for invalid color
                        this.props.invalidColor || "" ;
                this.handleChange();
            }
        );
    }

    render(){
        const wrapperClassName = 
            "date-select-wrapper" +
                (this.props.className || "");
        return(
        <div
        ref="dateSelectWrapper"
        className={wrapperClassName}>
        
            <select 
            ref="dateSelectMonth"
            id={(this.props.id || "")}
            value={this.state.monthVal} 
            onChange={this.handleMonth} 
            className="date-input month">
                <option value="01">Jan</option>
                <option value="02">Feb</option>
                <option value="03">Mar</option>
                <option value="04">Apr</option>
                <option value="05">May</option>
                <option value="06">June</option>
                <option value="07">July</option>
                <option value="08">Aug</option>
                <option value="09">Sep</option>
                <option value="10">Oct</option>
                <option value="11">Nov</option>
                <option value="12">Dec</option>
            </select>

            <input type='text' 
            ref="dateSelectDay"
            onChange={this.handleDay} 
            className="date-input date" 
            maxLength="2"
            placeholder='DD'
            value={this.state.dateVal}/>


            <input type='text'
            ref="dateSelectYear"
            onChange={this.handleYear} 
            className="date-input year"
            maxLength="4"
            placeholder={'YYYY'}
            value={this.state.yearVal} />

        <input type="text"
        value={this.state.currentValue}
        name={(this.props.name || null)}
        style={{
            width: '0px',
            height: '0px',
            display: 'none'
        }}/>
        </div>
        )
    }
}


