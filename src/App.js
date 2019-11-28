import React from 'react';
import './App.css';
import Board from './component/PlayBoard/Board';
import Keys from './component/Keys/Keys';
import Score from './component/Score/Score';
import Helper from './utils/helper';
import Constant from './utils/constant';
import Message from './component/Alert/Message'
import InputForm from './component/userInput/userInput'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dim: Constant.MATRIX_DIMENSION,
            score: 0,
            data: [],
            flatData: [],
            undo: { data: [], flatData: [], score: 0},
            active: true
        }  
        this.leftHandler = this.moveHorizontal.bind(this, 0);
        this.rightHandler = this.moveHorizontal.bind(this, 1);
        this.upHandler = this.moveVertical.bind(this, 0);
        this.downHandler = this.moveVertical.bind(this, 1);
    }
    componentDidMount() {
        this.drawInitialBoard();
        document.documentElement.style.setProperty("--matNum", this.state.dim); 
        document.addEventListener("keydown", this.keyPressHandler, true);
    }
    keyPressHandler = (e) => {
        e.preventDefault()
        switch (e.key) {
            case "ArrowLeft":
                this.leftHandler()
                break;
            case "ArrowRight":
                this.rightHandler()
                break;
            case "ArrowUp":
                this.upHandler()
                break;
            case "ArrowDown":
                this.downHandler()
                break;
            default:
                return;
        }
    }

    drawBoard = ( ary ) => {
        const cell_data = Helper.insertRandomCell( [...ary].flat(), Constant.INITIAL_VALUE )
        this.setState(prevState => ({
            ...prevState,
            undo: {
                ...prevState.undo,
                data: prevState.data,
                flatData: prevState.flatData,
                score: prevState.score
            }
        }))       
        this.setState( prevState => ({
            data: Helper.convertToMatrix(cell_data, this.state.dim),
            flatData: cell_data,
            score: parseInt(Helper.getMergedScore( prevState.flatData, cell_data )) + prevState.score
        }), () => {
                if (!Helper.isGameActive( this.state.data )) {
                    this.setState({ active: false })
                }
            });        
    }
    drawInitialBoard = () => {
        const initValue = Helper.getInitialMatrix( this.state.dim );
        this.setState( {score: 0} )
        this.drawBoard( initValue );
    }   
    moveHorizontal = (dir) => {
        const updatedCells = Helper.processMatrix(this.state.data, dir, this.state.dim );
        this.drawBoard( updatedCells );
    }
    moveVertical = (dir) => {
        const updatedCells = Helper.processMatrix(Helper.transpose( this.state.data ), dir, this.state.dim )
        this.drawBoard( Helper.transpose( updatedCells ), 0);
    }
    undoHandler = () => {
        (this.state.undo.data.length > 0) && this.setState(prevState => ({
            ...prevState,
            data: prevState.undo.data,
            flatData: prevState.undo.flatData,
            score: prevState.undo.score
        }));
    }
    
    render() { 
        return (
            <div className="App">
                <header>
                    <h1>2048 - Game</h1>
                </header>
                <InputForm />
                <div className="content">
                    <Score score={ this.state.score } />
                    <Board dimension={ this.state.dim } matrix={ this.state.flatData }/>
                    <Keys left={ this.leftHandler } right={ this.rightHandler } up={ this.upHandler } down={ this.downHandler } reset={ this.drawInitialBoard } undo={ this.undoHandler }  />
                </div>
                {(!this.state.active) && <Message msg="Game Over!" />}
            </div>
        );
    }  
}
export default App;
