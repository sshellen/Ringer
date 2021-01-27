import React from "react";

const LoadResources = () => {
  const images = [
    "./png/bomb.png",
    "./png/bombSprite.png",
    "./png/pie.png",
    "./png/ringer.png",
    "./svg/background.svg",
    "./svg/bomb.svg",
    "./svg/cup.svg",
    "./svg/dropper.svg",
    "./svg/gameOver.svg",
    "./svg/pie.svg",
    "./svg/playAgainButton.svg",
    "./svg/playButton.svg",
    "./svg/ring1.svg",
    "./svg/ring2.svg",
    "./svg/ring3.svg",
    "./svg/ring4.svg",
    "./svg/ring5.svg",
    "./svg/ringerSplash.svg",
    "./svg/score.svg",
    "./svg/spinner.svg",
    "./svg/title.svg",
  ];
  return (
    <div className="hidden">
      {images.map((img, ind) => (
        <img key={"img" + ind} src={img} />
      ))}
    </div>
  );
};

export default LoadResources;
