import React from "react";

class Loader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="ringerGame">
          <span className="spinner">
            <img src="./svg/spinner.svg" />
          </span>
          <div className="loading">Loading</div>
        </div>
      </div>
    );
  }
}

export default Loader;
