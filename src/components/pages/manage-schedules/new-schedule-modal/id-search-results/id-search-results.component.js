import React from 'react';
import PropTypes from 'prop-types';
import { icons } from '../../../generic-components';
import './id-search-results.style.css';

const IdSearchResults = (props)=>{
    const {searching, idTaken, errorMsg} = props;

    return (
        <div
        style={{
            fontSize: "16px"
        }}
        >
            { 
                // If there's an error msg
                errorMsg ? 
                    <span
                    className="text-danger"
                    >
                        {icons.times} {errorMsg}
                    </span> 
                :
                // If searching ids
                searching ? 
                    <span
                    className="searching-schedule-ids-icon"
                    >    
                    {icons.gearSpinner }
                    </span>
                // If idTaken has a result(not null)
                : idTaken !== null ?
                        // Name is taken
                        idTaken ?
                            <span
                            className="text-danger"
                            >
                                {icons.times} ID taken
                            </span> 
                        // Name is not taken
                        :
                            <span
                            className="text-sched"
                            >
                                {icons.check} ID available
                            </span>
                // Name taken is null(haven't searched)
                :
                <span
                style={{
                    color: "#555"
                }}
                >
                    Type an id
                </span>
            }
        </div>
    )
}

IdSearchResults.propTypes={
    searching: PropTypes.bool.isRequired,
    errorMsg: PropTypes.string.isRequired
}

export default IdSearchResults;