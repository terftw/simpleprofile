import React from 'react';
import '../basicForm.css';


const Opts = (props) => {
    return (
        <select className="ui selection dropdown" name={props.name} value={props.selectedValue} onChange={props.onChange}>
            <option value="">{ props.isYear ? "Year" : "Month" }</option>
            {props.options.map((x) => {
                return (
                    <option key={x.key} value={x.value}>{x.text}</option>
                )
            })}
        </select>        
    )
};

export default Opts;
