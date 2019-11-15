
import React from 'react';
import './Keys.css'; 

export default function Keys(props) {
    return (<div className="key border">
        <button onClick={props.left} >Left</button>
        <button onClick={props.right} >Right</button>
        <button onClick={props.up} >Up</button>
        <button onClick={props.down} >Down</button>
    </div>);
}