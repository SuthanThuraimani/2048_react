import React from 'react';
import './App.css';
import Board from './component/PlayBoard/Board';
import Keys from './component/Keys/Keys';
import Score from './component/Score/Score';
import Helper from './helper';
import Constant from './constant';
import main from './main';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dim: Constant.MATRIX_DIMENSION,
            data: [],
            flatData: []
        }        
    }
    componentDidMount() {
        this.drawInitialBoard();
        document.documentElement.style.setProperty("--matNum", Constant.MATRIX_DIMENSION); 
    }

    drawBoard = (ary) => {
        const cell_data = Helper.insertRandomCell(ary.flat(), Constant.INITIAL_VALUE)
        this.setState({ flatData: cell_data });
    }
    drawInitialBoard = () => {
        this.drawBoard(Helper.getInitialMatrix(this.state.dim));
    }
   
    moveright = () => {
        //alert('started')
        Helper.moveNumbers(this.state.data, 'r')
        this.drawBoard(this.state.data)
        console.log('moved right');
    }
    moveleft = () => {
        Helper.moveNumbers(this.state.data, 'l')
        this.drawBoard(this.state.data);
        console.log('moved left');
    }
    moveup = () => {
        Helper.moveNumbers(this.state.data, 'u');
        this.drawBoard(this.state.data)
        console.log('moved up');
    }
    movedown = () => {
        Helper.moveNumbers(this.state.data, 'd');
        this.drawBoard(this.state.data)
        console.log('moved down');
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
                    <Keys left={this.moveleft.bind(this)} right={this.moveright.bind(this)} up={this.moveup.bind(this)} down={this.movedown.bind(this)} />
                </div>
            </div>
        );
    }
  
}

export default App;
