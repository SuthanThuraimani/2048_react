import React from 'react';
import './Score.css';

const Score = (props) => {
        return (<div className="score">
                    score
                    <div className="score-display">{ props.score }</div>
                    </div>);
}
export default Score;