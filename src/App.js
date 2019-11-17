import React from 'react';
import './App.css';
import Board from './component/PlayBoard/Board';
import Keys from './component/Keys/Keys';
import Score from './component/Score/Score';
import Helper from './utils/helper';
import Constant from './utils/constant';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dim: Constant.MATRIX_DIMENSION,
            data: [],
            flatData: [],
            undo: { data: [], flatData: [] }
        }  
        this.leftHandler = this.moveHorizontal.bind(this, 0);
        this.rightHandler = this.moveHorizontal.bind(this, 1);
        this.upHandler = this.moveVertical.bind(this, 0);
        this.downHandler = this.moveVertical.bind(this, 1);
        this.resetHandler = this.drawInitialBoard.bind(this);
        this.undoHandler = this.undoChanges.bind(this);
    }
    componentDidMount() {
        this.drawInitialBoard();
        document.documentElement.style.setProperty("--matNum", Constant.MATRIX_DIMENSION); 
        document.addEventListener("keydown", this.keyPressHandler.bind(this) , true);
    }
    keyPressHandler = (e) => {
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
        e.preventDefault()
    }
    transpose = mat => mat[0].map((x, i) => mat.map(x => x[i]))

    drawBoard = (ary) => {
        const cell_data = Helper.insertRandomCell(ary.flat(), Constant.INITIAL_VALUE)
        this.setState(prevState => ({
            ...prevState,
            undo: {
                ...prevState.undo,
                data: prevState.data,
                flatData: prevState.flatData
            }
        }), () => console.log(this.state.undo))

        this.setState({
            data: Helper.arrayToMatrix( cell_data, Constant.MATRIX_DIMENSION )
        });
        this.setState({ flatData: cell_data });
    }
    drawInitialBoard = () => {
        const initValue = Helper.getInitialMatrix( this.state.dim );
        this.drawBoard( initValue );
    }   
    moveHorizontal = (dir) => {
        const updatedCells = this.state.data.map( row => Helper.moveNumbers(row, dir, Constant.MATRIX_DIMENSION));
        this.drawBoard(updatedCells);
    }
    moveVertical = (dir) => {
        const updatedCells = this.transpose( this.state.data ).map(row => Helper.moveNumbers(row, dir, Constant.MATRIX_DIMENSION));
        this.drawBoard( this.transpose( updatedCells ) );
    }
    undoChanges = () => {
        this.setState(prevState => ({
            ...prevState,
            data: prevState.undo.data,
            flatData: prevState.undo.flatData
        }));
    }
    render() { 
        return (
            <div className="App">
                <header>
                    <h1>2048 - GameApp</h1>
                </header>
                <div className="content">
                    <Score />
                    <Board dimension={ this.state.dim } matrix={ this.state.flatData }/>
                    <Keys left={ this.leftHandler } right={ this.rightHandler } up={ this.upHandler } down={ this.downHandler } reset={ this.resetHandler } undo={ this.undoHandler }  />
                </div>
            </div>
        );
    }  
}
export default App;
