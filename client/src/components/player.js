import React from "react";
import styled from "styled-components";
import Iframe from "react-iframe";

const Container = styled.div`
  margin-top: 5%;
  display: flex;
  flex-direction: column;

  overflow: hidden;
`;

const LargeFont = styled.div`
  font-size: 1.5em;
  padding: 2%;
`;

const Header = styled.div`
  order: 1;
  flex-grow: 0.5;
  display: flex;
  justify-content: center;
  border: 1px solid black;
  border-radius: 10%;
  margin 2%
`;

const Header2 = styled.div`
  order: 2;

  flex-grow: 6;
  justify-content: center;
  border: 1px solid black;
  border-radius: 5%;

  margin: auto;
`;

class Player extends React.Component {
  render() {
    return (
      <Container>
        <Header>
          <LargeFont>{this.props.message}</LargeFont>
        </Header>
        <Header2>
          {this.props.play ? (
            <Iframe
              url={
                "https://open.spotify.com/embed?uri=spotify:track:" +
                this.props.playerID
              }
              width="100%"
              height="20%"
              position="relative"
            />
          ) : (
            <p />
          )}
        </Header2>
      </Container>
    );
  }
}

export default Player;
