import React from "react";
import axios from "Axios";
import HammerJS from "HammerJS";
import GameBoard from "./GameBoard";
import Cup from "./Cup";
import Score from "./Score";
import Rules from "./Rules";
import LoadResources from "./loadResources";

let frameReq;
let leftMC;
let rightMC;
let topMC;
let bottomMC;
let switchMC;
let dropMC;
let rightPaddleFunction;
let leftPaddleFunction;
let topPaddleFunction;
let bottomPaddleFunction;
let switchFunction;
let dropFunction;
let images = {};
let bombThrowInterval;
let halfWidth;
let halfHeight;

const wiggleRoom = 35;
const size = 25;
const bombThrowRate = 5000;

const requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;

const cancelAnimationFrame =
  window.cancelAnimationFrame || window.mozCancelAnimationFrame;

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      r1c1: "empty",
      r1c2: "empty",
      r1c3: "empty",
      r1c4: "empty",
      r2c1: "empty",
      r2c2: "empty",
      r2c3: "empty",
      r2c4: "empty",
      r3c1: "empty",
      r3c2: "empty",
      r3c3: "empty",
      r3c4: "empty",
      r4c1: "empty",
      r4c2: "empty",
      r4c3: "empty",
      r4c4: "empty",
      r5c1: "empty",
      r5c2: "empty",
      r5c3: "empty",
      r5c4: "empty",
      score: 0,
      livesLeft: 3,
      showScreen: "rules",
    };
    this.sounds = {};
    this.ring1 = React.createRef();
  }

  checkForCollisions = () => {
    setInterval(() => {
      for (let i = 0; i < this.cups.length; i++) {
        let cup = this.cups[i];

        let x = +cup.getBoundingClientRect().x;
        let y = +cup.getBoundingClientRect().y;
        let collidedItem = this.hitTest(x, y, cup.id);
        if (collidedItem !== null && collidedItem[1] !== "empty") {
          let cup1 = cup.getElementsByTagName("img")[0].className;
          let el = document.getElementById(collidedItem[0]);
          let cup2 = el.getElementsByTagName("img")[0].className;
          // Bomb explodes regardless with what it comes into contact
          if (cup1 === "bomb" && (cup2 === "pie" || cup2 === "bomb")) {
            this.setState({ [cup.id]: "empty", [el.id]: "empty" });
          }
          if (cup1 === "bomb" && cup2 === "ringer") {
            this.setState({ [cup.id]: "empty", [el.id]: "empty" });
            this.decrementLivesLeft();
          }
          // Ringer gets blown up
          if (cup1 === "ringer" && cup2 === "bomb") {
            this.setState({ [cup.id]: "empty", [el.id]: "empty" });
            this.decrementLivesLeft();
          }
          // Pie gets eaten by Ringer
          if (cup1 === "pie" && cup2 === "ringer") {
            this.setState({ [cup.id]: "empty" });
            this.setState({ [el.id]: "ringer", score: +this.state.score + 1 });
          }
          // Pie gets blown up by bomb
          if (cup1 === "pie" && cup2 === "bomb") {
            this.setState({ [cup.id]: "empty", [el.id]: "empty" });
          }
          // Score a point for Ringer for eating the pie
          if (cup1 === "ringer" && cup2 === "pie") {
            this.setState({ [el.id]: "empty", score: +this.state.score + 1 });
          }
        }
      }
    }, 50);
  };

  hitTest = (left, top, item) => {
    for (let i = 1; i < 6; i++) {
      for (let j = 1; j < 5; j++) {
        let cup = `r${i}c${j}`;
        let el = document.getElementById(cup);
        let type = el.getElementsByTagName("img")[0].className;
        let x = +el.getBoundingClientRect().x;
        let y = +el.getBoundingClientRect().y;
        if (
          cup !== item &&
          x <= +(left + wiggleRoom) &&
          x >= +(left - wiggleRoom) &&
          y <= +(top + wiggleRoom) &&
          y >= +(top - wiggleRoom)
        ) {
          return [cup, type];
        }
      }
    }
    return null;
  };

  pieOrBomb = () => {
    if (Math.random() * 10 < 6) {
      return "bomb";
    }
    return "pie";
  };

  disperseItem = (args) => {
    let left = args.left;
    let leftVel = args.leftVel;
    let top = args.top;
    let topVel = args.topVel;
    let type = args.type;
    let src =
      type === "bomb"
        ? images.bomb
        : type === "pie"
        ? images.pie
        : images.ringer;
    let itemRemovedOrAttached = false;
    let item = document.createElement("img");

    item.setAttribute("src", src);
    item.classList.add(type);
    item.classList.add("dispersed");
    item.style.left = left + "px";
    item.style.top = top + "px";
    this.gameBoard.appendChild(item);
    let moveItem = () => {
      left -= leftVel;
      if (left < 455) {
        top += topVel;
      }
      if ((left < 90 || top > 600) && !itemRemovedOrAttached) {
        item.remove();
        itemRemovedOrAttached = true;
        cancelAnimationFrame(frameReq);
        if (type === "bomb" || type === "pie") {
          bombThrowInterval = setTimeout(() => {
            let itemType = this.pieOrBomb();
            args = { ...args, type: itemType };
            this.disperseItem(args);
          }, bombThrowRate);
        }
        if (type === "ringer") {
          this.decrementLivesLeft();
        }
      }
      item.style.left = left + "px";
      item.style.top = top + "px";
      let x = +item.getBoundingClientRect().x;
      let y = +item.getBoundingClientRect().y;
      let cup = this.hitTest(x, y);
      if (cup !== null) {
        let el = document.getElementById(cup[0]);
        let cupType = cup[1];

        if (type === "bomb" && (cupType === "ringer" || cupType === "pie")) {
          this.setState({ [cup[0]]: "empty" });
          this.currentCup = null;
          this.decrementLivesLeft();
        } else if (type === "bomb" && cupType === "empty") {
          this.setState({ [cup[0]]: type });
        } else if (type === "ringer" && cupType === "pie") {
          this.setState({ [cup[0]]: type }, () => {
            this.currentCup = cup[0];
            this.setState({ score: +this.state.score + 1 });
          });
        } else if (type === "ringer" && cupType === "empty") {
          this.setState({ [cup[0]]: type }, () => {
            this.currentCup = cup[0];
          });
        } else if (type === "ringer" && cupType === "bomb") {
          this.setState({ [cup[0]]: "empty" }, () => {
            this.currentCup = null;
            this.decrementLivesLeft();
          });
        } else if (type === "pie" && cupType === "ringer") {
          this.currentCup = cup[0];
          this.setState({ [cup[0]]: "ringer", score: +this.state.score + 1 });
        } else if (type === "pie" && cupType === "empty") {
          this.setState({ [cup[0]]: type });
        } else if (type === "pie" && cupType === "bomb") {
          this.setState({ [cup[0]]: "empty" });
        }

        item.remove();
        itemRemovedOrAttached = true;
        if (type === "bomb" || type === "pie") {
          bombThrowInterval = setTimeout(() => {
            let itemType = this.pieOrBomb();
            args = { ...args, type: itemType };
            this.disperseItem(args);
          }, bombThrowRate);
        }
      }
      if (!itemRemovedOrAttached) {
        frameReq = requestAnimationFrame(moveItem);
      }
    };
    moveItem();
  };

  setUpRinger = () => {
    this.arrow = document.getElementById("arrow");
    this.arrow.classList.remove("unLoaded");
    this.arrow.classList.add("loaded");
    this.newRingerLoaded = document.createElement("img");
    this.newRingerLoaded.setAttribute("src", images.ringer);
    this.newRingerLoaded.style.left = "262px";
    this.newRingerLoaded.style.top = "62px";
    this.newRingerLoaded.classList.add("ringer");
    this.gameBoard.appendChild(this.newRingerLoaded);
    this.setUp = true;
  };

  score = (side) => {
    let ringer = document.getElementsByClassName(side)[0];
    let transition = side === "leftScoreRinger" ? "slideRight" : "slideLeft";

    ringer.style.display = "block";
    ringer.classList.add(transition);
    setTimeout(() => {
      ringer.classList.remove(transition);
      ringer.style.display = "none";
      this.setUpRinger();
      this.setState({ score: +this.state.score + 1 });
    }, 1000);
  };

  dropRinger = () => {
    if (this.setUp) {
      this.disperseItem({
        type: "ringer",
        left: 262,
        top: 62,
        leftVel: 0,
        topVel: 2,
      });
    }
    this.arrow.classList.remove("loaded");
    this.arrow.classList.add("unLoaded");
    this.newRingerLoaded.remove();
    this.setUp = false;
  };

  getRingNum = (x, y, ringNum, move) => {
    let GBWidth = +this.gameBoard.getBoundingClientRect().x + halfWidth;
    let GBHeight = +this.gameBoard.getBoundingClientRect().y + halfHeight;
    let xQuad = x < GBWidth ? "left" : "right";
    let yQuad = y < GBHeight ? "Top" : "Bottom";
    let quad = xQuad + yQuad;

    // Detect jumping to an inner ring
    if (
      (move === "right" && quad === "leftTop") ||
      (move === "right" && quad === "leftBottom") ||
      (move === "left" && quad === "rightTop") ||
      (move === "left" && quad === "rightBottom") ||
      (move === "top" && quad === "leftBottom") ||
      (move === "top" && quad === "rightBottom") ||
      (move === "bottom" && quad === "leftTop") ||
      (move === "bottom" && quad === "rightTop")
    ) {
      return +ringNum + 1;
      //Detect jumping to an outer ring
    } else if (
      (move === "left" && quad === "leftTop") ||
      (move === "left" && quad === "leftBottom") ||
      (move === "right" && quad === "rightTop") ||
      (move === "right" && quad === "rightBottom") ||
      (move === "top" && quad === "leftTop") ||
      (move === "top" && quad === "rightTop") ||
      (move === "bottom" && quad === "leftBottom") ||
      (move === "bottom" && quad === "rightBottom")
    ) {
      return +ringNum - 1;
    }
    return false;
  };

  checkRings = (move) => {
    let fn =
      move === "right"
        ? this.checkRight
        : move === "top"
        ? this.checkTop
        : move === "bottom"
        ? this.checkBottom
        : this.checkLeft;
    let currCup = document.getElementById(this.currentCup);
    let ringNum = this.currentCup.match(/\d/);
    let x = +currCup.getBoundingClientRect().x;
    let y = +currCup.getBoundingClientRect().y;
    for (let i = 1; i < 5; i++) {
      let ringToCheck = this.getRingNum(x, y, ringNum, move);
      let cup = `r${ringToCheck}c${i}`;
      if (ringToCheck === 6 && i > 2) return;
      let el = document.getElementById(cup);

      let _x = +el.getBoundingClientRect().x;
      let _y = +el.getBoundingClientRect().y;
      if (fn(x, y, _x, _y) === true) {
        if (ringToCheck === 6) {
          this.setState({ [this.currentCup]: "empty" });
          this.currentCup = null;
          if (i === 1) {
            this.score("leftScoreRinger");
          } else {
            this.score("rightScoreRinger");
          }
        } else {
          let cupContents = el.querySelector("img").classList.contains("pie")
            ? "pie"
            : "empty";
          this.setState({ [this.currentCup]: "empty" });
          this.setState({ [cup]: "ringer" });
          this.currentCup = cup;
        }
      }
    }
  };

  checkTop = (x, y, _x, _y) => {
    if (
      x >= +(_x - wiggleRoom) &&
      x <= +(_x + wiggleRoom) &&
      y >= _y &&
      y <= +(_y + wiggleRoom + size)
    ) {
      return true;
    }
    return false;
  };
  checkRight = (x, y, _x, _y) => {
    if (
      +(x + size) >= +(_x - wiggleRoom) &&
      x <= _x &&
      y <= +(_y + wiggleRoom) &&
      y >= +(_y - wiggleRoom)
    ) {
      return true;
    }
    return false;
  };

  checkBottom = (x, y, _x, _y) => {
    if (
      x >= +(_x - wiggleRoom) &&
      x <= +(_x + wiggleRoom) &&
      y <= +_y &&
      y >= +(_y - size - wiggleRoom)
    ) {
      return true;
    }
    return false;
  };
  checkLeft = (x, y, _x, _y) => {
    if (
      x <= +(_x + wiggleRoom + size) &&
      x >= _x &&
      y <= +(_y + wiggleRoom) &&
      y >= +(_y - wiggleRoom)
    ) {
      return true;
    }
    return false;
  };

  changePosition = (position) => {
    if (this.currentCup === null) return;
    switch (position) {
      case "right":
        this.checkRings("right");
        break;
      case "left":
        this.checkRings("left");
        break;
      case "top":
        this.checkRings("top");
        break;
      case "bottom":
        this.checkRings("bottom");
        break;
    }
  };

  decrementLivesLeft = () => {
    this.currentCup = null;
    this.setState({ livesLeft: this.state.livesLeft - 1 }, () => {
      if (this.state.livesLeft > 0) {
        this.setUpRinger();
      } else {
        this.gameOver();
      }
    });
  };

  switchSides = () => {
    if (this.currentCup === null) return;
    let ring = this.currentCup.match(/\w{2}/);
    let cupNum = +this.currentCup.match(/\d$/);
    let newCupNum = cupNum === 4 ? 2 : cupNum === 3 ? 1 : cupNum === 1 ? 3 : 4;
    let el = document.getElementById(ring + "c" + newCupNum);
    let cupContents = el.querySelector("img").classList;
    let type = cupContents.contains("empty")
      ? "empty"
      : cupContents.contains("pie")
      ? "pie"
      : "bomb";

    if (type === "empty" || type === "pie") {
      this.setState({ [this.currentCup]: "empty" });
      this.setState({ [ring + "c" + newCupNum]: "ringer" }, () => {
        this.currentCup = ring + "c" + newCupNum;
      });
    } else if (type === "bomb") {
      this.setState({ [this.currentCup]: "empty" });
      this.setState({ [ring + "c" + newCupNum]: "empty" }, () => {
        this.currentCup = null;
        this.decrementLivesLeft();
      });
    }
  };

  setUpEvents = () => {
    let leftPaddle = document.getElementById("leftPaddle");
    let rightPaddle = document.getElementById("rightPaddle");
    let topPaddle = document.getElementById("topPaddle");
    let bottomPaddle = document.getElementById("bottomPaddle");
    let switchSideButton = document.getElementById("switchSide");
    let dropButton = document.getElementById("arrow");
    /*    this.sounds.pop = new Audio("../mp3/pop.mp3");*/

    leftMC = new Hammer.Manager(leftPaddle);
    leftMC.add(new Hammer.Tap());
    leftPaddleFunction = () => {
      this.changePosition("left");
    };
    leftMC.on("tap", leftPaddleFunction);

    rightMC = new Hammer.Manager(rightPaddle);
    rightMC.add(new Hammer.Tap());
    rightPaddleFunction = () => {
      this.changePosition("right");
    };
    rightMC.on("tap", rightPaddleFunction);

    topMC = new Hammer.Manager(topPaddle);
    topMC.add(new Hammer.Tap());
    topPaddleFunction = () => {
      this.changePosition("top");
    };
    topMC.on("tap", topPaddleFunction);

    bottomMC = new Hammer.Manager(bottomPaddle);
    bottomMC.add(new Hammer.Tap());
    bottomPaddleFunction = () => {
      this.changePosition("bottom");
    };
    bottomMC.on("tap", bottomPaddleFunction);

    switchMC = new Hammer.Manager(switchSideButton);
    switchMC.add(new Hammer.Tap());
    switchFunction = () => {
      this.switchSides();
    };
    switchMC.on("tap", switchFunction);

    dropMC = new Hammer.Manager(dropButton);
    dropMC.add(new Hammer.Tap());
    dropFunction = () => {
      this.dropRinger();
      /*    let audio = this.sounds.pop;
            audio.play();
            audio.pause();
            audio.currentTime = 0;*/
    };
    dropMC.on("tap", dropFunction);

    addEventListener("keydown", (e) => {
      e.preventDefault();
      let map = {
        ArrowDown: bottomMC,
        ArrowUp: topMC,
        ArrowLeft: leftMC,
        ArrowRight: rightMC,
        KeyZ: switchMC,
        Space: dropMC,
      };

      if (map[e.code]) {
        var evt = map[e.code];
        evt.emit("tap", e.target);
      }
    });
  };

  startGame = () => {
    this.setState({ showScreen: "game" }, () => {
      halfWidth = Math.ceil(
        getComputedStyle(this.ring1.current).width.replace("px", "") / 2
      );
      halfHeight = Math.ceil(
        getComputedStyle(this.ring1.current).height.replace("px", "") / 2
      );
      this.gameBoard = document.getElementById("gameBoard");
      this.setUpRinger();
      this.setUpEvents();
      this.disperseItem({
        type: "bomb",
        left: 460,
        top: 120,
        leftVel: 2,
        topVel: 2,
      });
      this.cups = document.getElementsByClassName("cup");

      this.checkForCollisions();
    });
  };

  clearRings = () => {
    // Set all of the ring cups src to empty
    for (let i = 1; i < 6; i++) {
      for (let j = 1; j < 5; j++) {
        let cup = `r${i}c${j}`;
        this.setState({ [cup]: "empty" });
      }
    }
    let dispsersedItems = Array.prototype.slice.call(
      document.getElementsByClassName("dispersed")
    );
    dispsersedItems.map((item) => item.remove());
  };

  gameOver = () => {
    this.currentCup = null;
    cancelAnimationFrame(frameReq);
    this.clearRings();
    clearTimeout(bombThrowInterval);
  };

  playAgain = () => {
    this.setUpRinger();
    this.setState({ score: 0, livesLeft: 3 });
    this.disperseItem({
      type: "bomb",
      left: 460,
      top: 120,
      leftVel: 2,
      topVel: 2,
    });
    this.checkForCollisions();
  };

  componentDidMount() {
    cancelAnimationFrame(frameReq);
    images.bomb = "./svg/bomb.svg";
    images.pie = "./svg/pie.svg";
    images.ringer = "./png/ringer.png";
  }

  componentWillUnmount() {
    cancelAnimationFrame(frameReq);
  }

  render() {
    return (
      <div>
        {this.state.showScreen === "rules" ? (
          <Rules onClickHandler={this.startGame} />
        ) : (
          <div className="ringerGame">
            <GameBoard />
            <div id="dropper">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75.34 59">
                <g className="cls-2 unLoaded" id="arrow">
                  <polygon
                    className="cls-4"
                    points="27.31 38.12 37.28 55.39 47.25 38.12 27.31 38.12"
                  />
                  <polyline
                    className="cls-4"
                    points="36.09 32.16 37.28 33.54 38.47 34.93 38.47 40 38.47 42.57 38.47 45.1 38.47 50.21 37.28 50.21"
                  />
                  <polyline
                    className="cls-5"
                    points="36.09 32.16 37.28 33.54 38.47 34.93 38.47 40 38.47 42.57 38.47 45.1 38.47 46.82"
                  />
                  <polygon
                    className="cls-4"
                    points="36.13 45.36 37.28 50.21 40.91 46.79 36.13 45.36"
                  />
                  <polygon
                    className="cls-4"
                    points="39.66 45.03 37.28 45.03 34.91 45.03 34.91 37.98 34.91 30.93 37.28 30.93 39.66 30.93 39.66 37.98 39.66 45.03"
                  />
                </g>
              </svg>
            </div>

            <div id="ring1" ref={this.ring1}>
              <Cup id={"r1c1"} manifest={this.state.r1c1} />
              <Cup id={"r1c2"} manifest={this.state.r1c2} />
              <Cup id={"r1c3"} manifest={this.state.r1c3} />
              <Cup id={"r1c4"} manifest={this.state.r1c4} />
            </div>
            <div id="ring2">
              <Cup id={"r2c1"} manifest={this.state.r2c1} />
              <Cup id={"r2c2"} manifest={this.state.r2c2} />
              <Cup id={"r2c3"} manifest={this.state.r2c3} />
              <Cup id={"r2c4"} manifest={this.state.r2c4} />
            </div>
            <div id="ring3">
              <Cup id={"r3c1"} manifest={this.state.r3c1} />
              <Cup id={"r3c2"} manifest={this.state.r3c2} />
              <Cup id={"r3c3"} manifest={this.state.r3c3} />
              <Cup id={"r3c4"} manifest={this.state.r3c4} />
            </div>
            <div id="ring4">
              <Cup id={"r4c1"} manifest={this.state.r4c1} />
              <Cup id={"r4c2"} manifest={this.state.r4c2} />
              <Cup id={"r4c3"} manifest={this.state.r4c3} />
              <Cup id={"r4c4"} manifest={this.state.r4c4} />
            </div>
            <div id="ring5">
              <Cup id={"r5c1"} manifest={this.state.r5c1} />
              <Cup id={"r5c2"} manifest={this.state.r5c2} />
              <Cup id={"r5c3"} manifest={this.state.r5c3} />
              <Cup id={"r5c4"} manifest={this.state.r5c4} />
            </div>

            <img src={images.ringer} className="leftScoreRinger after" />
            <img src={images.ringer} className="rightScoreRinger after" />
            <Score
              score={this.state.score}
              livesLeft={this.state.livesLeft}
              ringer={images.ringer.default}
              title={images.score}
              clickHandler={this.playAgain}
            />
            {this.state.livesLeft < 1 && (
              <div className="gameOver">
                <img src="./svg/gameOver.svg" />
              </div>
            )}

            <LoadResources />
          </div>
        )}
      </div>
    );
  }
}

export default Game;
