import React, { useState } from "react";
import "./TicTacToe.css";

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    if(this.state.playerX !== undefined) {
    localStorage.setItem("nameX", this.state.playerX);
    }
    if(this.state.playerO !== undefined) {
    localStorage.setItem("nameO", this.state.playerO);
    }
  }

  render() {
    return (
      <div className="players">
        <form className="players" onSubmit={this.handleSubmit} >
          <input
            className="playerX"
            placeholder="Player-X"
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
            name="playerX"
            autoComplete="off"
          />
          <input
            className="playerO"
            placeholder="Player-O"
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
            name="playerO"
            autoComplete="off"
          />
          <input className="submit" type="submit" value="Enter" />
        </form>
      </div>
    );
  }
}

const TicTacToe = () => {
  let playerXName =
    localStorage.getItem("nameX") === "undefined" ||
    localStorage.getItem("nameX") === null
      ? "Player-X"
      : localStorage.getItem("nameX");

  let playerOName =
    localStorage.getItem("nameO") === "undefined" ||
    localStorage.getItem("nameO") === null
      ? "Player-O"
      : localStorage.getItem("nameO");

  const [turn, setTurn] = useState(playerXName);
  const [cells, setCells] = useState(Array(9).fill(""));
  const [winner, setWinner] = useState();
  
  const handleRestart = () => {
    setWinner(null);
    setCells(Array(9).fill(""));
    localStorage.removeItem('nameX');
    localStorage.removeItem('nameO');
    setTurn('Player-X');
  };

  const checkForWinner = (squares) => {
    let combos = {
      across: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ],
      down: [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
      ],
      diagnol: [
        [0, 4, 8],
        [2, 4, 6],
      ],
    };

    for (let combo in combos) {
      combos[combo].forEach((pattern) => {
        if (
          squares[pattern[0]] !== "" &&
          squares[pattern[0]] === squares[pattern[1]] &&
          squares[pattern[1]] === squares[pattern[2]]
        ) {          
          if (squares[pattern[0]] === "x") {
            setWinner(playerXName);
          } else if (squares[pattern[0]] === "o") {
            setWinner(playerOName);          
          }          
        }
      });
    }
  };

  const handleClick = (num) => {
    if(winner) {
      return;
    }

    if (cells[num] !== "") {
      alert("already clicked");
      return;
    }

    let squares = [...cells];

    if (turn === playerXName) {
      squares[num] = "x";
      setTurn(playerOName);
    } else {
      squares[num] = "o";
      setTurn(playerXName);
    }

    setCells(squares);
    checkForWinner(squares);
  };

  const Cell = ({ num }) => {
    return <td onClick={() => handleClick(num)}>{cells[num]}</td>;
  };

  return (
    <div className="container">
      <h3>Turn: {turn}</h3>
      <table>
        <tbody>
          <tr>
            <Cell num={0} />
            <Cell num={1} />
            <Cell num={2} />
          </tr>
          <tr>
            <Cell num={3} />
            <Cell num={4} />
            <Cell num={5} />
          </tr>
          <tr>
            <Cell num={6} />
            <Cell num={7} />
            <Cell num={8} />
          </tr>
        </tbody>
      </table>
      {winner && (
        <>
          <p>
            <strong>{winner}</strong> is the winner!
          </p>
        </>
      )}
      {!cells.includes('') && !winner && (
        <>
        <p className="draw">
          It Is Draw!
        </p>
      </>
      )}
      <button onClick={() => handleRestart()} className="newGame">
        New Game
      </button>
      <NameForm />
    </div>
  );
};

export default TicTacToe;
