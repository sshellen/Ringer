import React, { Suspense } from "react";
import Loader from "./components/Loader";
import Game from "./components/Game";
import styles from "../css/styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Suspense fallback={<Loader />}>
          <Game />
        </Suspense>
      </div>
    );
  }
}

export default App;
