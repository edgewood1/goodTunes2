import React from "react";
import { Wrapper, Col1, Col2 } from "./container_css";
import PlayList from "./playList";
import Login from "./login";
import API from "../utils/API";
import Player from "./player";

class Container extends React.Component {
  render() {
    // https://medium.freecodecamp.org/the-basics-of-destructuring-props-in-react-a196696f5477
    const {
      appData: { play, playerID, message, logInShow }
    } = this.props;
    return (
      <Wrapper>
        <Col1>
          <Player play={play} playerID={playerID} message={message} />
        </Col1>
        <Col2>
          {logInShow ? (
            <Login
              changeState={this.props.changeState}
              appState={this.props.appData}
            />
          ) : (
            <PlayList
              changeState={this.props.changeState}
              appData={this.props.appData}
            />
          )}
        </Col2>
      </Wrapper>
    );
  }
}

export default Container;
