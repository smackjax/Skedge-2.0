import React from 'react';
import { gearSpinner } from '../../icons';

export default (props)=>{
    return (
        <div
        style={{
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            top: "0px",
            left: "0px",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(230,230,230,.3)"
        }}
        >
            <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fff",
                borderRadius: "2px",
                padding: "15px",
                margin: "50px auto"
            }}
            className="text-sched"
            >
                {gearSpinner}
            </div>
        </div>
    )
}