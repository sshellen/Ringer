import React from "react";

class Rules extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="ringerGame">
        <img src="./svg/ringerSplash.svg" id="ringerRules" />
        <img
          src="./svg/playButton.svg"
          id="playButton"
          onClick={this.props.onClickHandler}
          className="playButton"
        />
      </div>
    );
  }
}

export default Rules;
