import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Square (props) {
  if (props.winhighlight === true) {
    const divStyle = {
      backgroundColor: "#58D68D"
    };
  
      return (
        <button 
           className="square"
           id={props.sqID}
           style={divStyle}
           onClick={()=> props.onClick()} 
          >
          {props.value}
        </button>
      );
      }
  return (
    <button 
       className="square"
       id={props.sqID}
      onClick={() => {
        props.onClick();
        document.getElementById(props.sqID).style.background = "#F5B7B1"; // Highligting click
      }}>
      {props.value}
    </button>
  );
}
  class Board extends React.Component {
    // constructor(props) {
    //   super(props);
    //   this.state = {
    //     squares: Array(9).fill(null),
    //     xIsNext: true,
    //   };
    // }
   
    renderSquare(i,doHighlight) {
      return (
      <Square 
      sqID={"square" + i}
      winhighlight={doHighlight}
        value={this.props.squares[i]}
        onClick={()=>this.props.onClick(i)}
      />
      );
    }
  
    render() {
      return (
        <div >
          <div className="board-row" >
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
   constructor(props){
    super(props)
    this.state={
      past:[{
        squares:Array(9).fill(null),
      }],
      stepNumber:0,
      count:0,
      xIsNext:true,
    };
   }
   handleClick(i) {
    const past = this.state.past.slice(0,this.state.stepNumber+1);
    const current=past[past.length-1];
    const squares=current.squares.slice();
    
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext?'X':'O';
    this.setState({
      past:past.concat([{
        squares: squares,
      }]),
      stepNumber:past.length,
      xIsNext:!this.state.xIsNext,
    });
    
  }
  jumpTo(move){
    this.setState({
      stepNumber: move,
      count:move,
      xIsNext: (move % 2) === 0,
    });
  }
    render() {
      const past=this.state.past;
      const current=past[this.state.stepNumber];
      const winner=calculateWinner(current.squares);
      // step variable refers to the current past element value, 
      // and move refers to the current past element index
      const moves=past.map((step,move)=>{
          const desc=move ?
          'Go to move #' + move: 
          'Go to game start';
          return (
            <li key={move}>
              <button  className='result' onClick={()=>this.jumpTo(move)}>
                {desc}
              </button>
            </li>
          );
      });
    
      let status;
     
       if(winner){
        status='Winner 🥳🎊 ' + winner;
      }
      else {
        status='Next player:' +(this.state.xIsNext?'X':'O');
        this.state.count+=1;
        console.log(this.state.count);
      }
      if(this.state.count===10){
        status='MATCH DRAW !!!';
      }
      return (
        <div className="game" >
          <div className="game-board" >
            <Board 
              squares={current.squares}
              onClick={(i)=>this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }

  // ========================================  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {   
        return squares[a];
        
      }
    }
    return null;
  }