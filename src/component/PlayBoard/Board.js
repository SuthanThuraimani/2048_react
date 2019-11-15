import React from 'react';
import './Board.css'

export default function Board(props) {  
       
    return (        
        <div className="container">
            <div className="inner">
                {
                    props.matrix.map(val => 
                    (<div className="item">
                        <h2>{(val === 0)? '':val}</h2></div>))
                }
            </div>
        </div>);
}

