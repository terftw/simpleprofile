import React from 'react';

const Opts = (props) => {
    return (
        <select name={props.name} onChange={props.onChange}>
            <option value="" selected>{ props.isYear ? "Year" : "Month" }</option>
            {props.options.map((x) => {
                return (
                    <option key={x.value} value={x.value}>{x.text}</option>
                )
            })}
        </select>
    )
};

export default Opts;
