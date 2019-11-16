import React from 'react';
import './App.css';
import Board from './component/PlayBoard/Board';
import Keys from './component/Keys/Keys';
import Score from './component/Score/Score';
import Helper from './helper';
import Constant from './constant';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dim: Constant.MATRIX_DIMENSION,
            data: [],
            flatData: []
        }  
        this.leftHandler = this.moveHorizontal.bind(this, 0);
        this.rightHandler = this.moveHorizontal.bind(this, 1);
        this.upHandler = this.moveVertical.bind(this, 0);
        this.downHandler = this.moveVertical.bind(this, 1);
        this.resetHandler = this.drawInitialBoard.bind(this);
    }
    componentDidMount() {
        this.drawInitialBoard();
        document.documentElement.style.setProperty("--matNum", Constant.MATRIX_DIMENSION); 
    }
    arrayToMatrix(ary, size) {
        const inputAry = [...ary];
        const newArray = [];
        while (inputAry.length > 0) newArray.push(inputAry.splice(0, size));
        return newArray;
    }
    transpose = mat => mat[0].map((x, i) => mat.map(x => x[i]))

    drawBoard = (ary) => {
        const cell_data = Helper.insertRandomCell(ary.flat(), Constant.INITIAL_VALUE)
        this.setState({ data: this.arrayToMatrix(cell_data, Constant.MATRIX_DIMENSION) });
        this.setState({ flatData: cell_data });
        console.log(cell_data)
    }
    drawInitialBoard = () => {
        const initValue = Helper.getInitialMatrix(this.state.dim);
        this.setState({ data: initValue });
        this.drawBoard(initValue);
    }
   
    moveHorizontal = (dir) => {
        const updatedCells = this.state.data.map( row => Helper.moveNumbers(row, dir, Constant.MATRIX_DIMENSION));
        this.setState({ data: updatedCells });
        this.drawBoard(updatedCells);
    }
    moveVertical = (dir) => {
        const updatedCells = this.transpose(this.state.data).map(row => Helper.moveNumbers(row, dir, Constant.MATRIX_DIMENSION));
        this.setState({ data: this.transpose(updatedCells) });
        this.drawBoard(this.transpose(updatedCells));
    }
    

    render() {      
        
        return (
            <div className="App">
                <header>
                    <h1>2048</h1>
                </header>
                <div className="content">
                    <Score />
                    <Board dimension={this.state.dim} matrix={this.state.flatData}/>
                    <Keys left={this.leftHandler} right={this.rightHandler} up={this.upHandler} down={this.downHandler} reset={this.resetHandler}  />
                </div>
            </div>
        );
    }
  
}

export default App;
