
import React from 'react';
import './Keys.css'; 

export default function Keys(props) {
    return (<div className="key">
        <div>
            <button className="btnSize" title="up" onClick={props.up}> <i className="material-icons">arrow_upward</i></button>
        </div>
        <div className="rowalign">
            <button className="btnSize btnWidth" onClick={props.left}> <i className="material-icons">arrow_back</i></button>
            <button className="btnSize btnWidth" onClick={props.right}> <i className="material-icons">arrow_forward</i></button>
        </div>
        <div>
            <button className="btnSize" onClick={props.down}> <i className="material-icons">arrow_downward</i></button>
        </div>
        <button className="btnSize" title="reset board" onClick={props.reset}> <i className="material-icons">refresh</i></button>
        <button className="btnSize" title="undo previous move" onClick={props.undo}> <i className="material-icons">undo</i></button>
        
    </div>);
}