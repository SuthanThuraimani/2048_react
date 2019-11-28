import React, { useState } from 'react';

const InputForm = props => {
    const [userinput, setUserInput] = useState('');
    const changeHandler = (event) => {
        setUserInput(event.target.value)
    }
    const clickHandler = () => {
          console.log(userinput);
    }
    return (<React.Fragment>
        <label htmlFor="num">Game board size: </label>
        <input type="text" placeholder="enter matrix size" onChange={ changeHandler } value={ userinput } />
        <button onClick={ clickHandler } > Launch </button>
    </React.Fragment>)
} 

export default InputForm;