import React from "react";

const Score = ({ score, livesLeft, ringer, title, clickHandler }) => {
  return (
    <div className="scoreBoard">
      <img className="score" src="./svg/score.svg" alt="Score" />

      <div className="scoreBox">{score}</div>
      {livesLeft > 0 ? (
        <div className={"livesLeft livesLeft" + livesLeft}>
          <img src="./png/ringer.png" />
          <img src="./png/ringer.png" />
          <img src="./png/ringer.png" />
        </div>
      ) : (
        <div className="playAgainButton">
          <img src="./svg/playAgainButton.svg" onClick={clickHandler} />
        </div>
      )}
    </div>
  );
};

export default Score;
