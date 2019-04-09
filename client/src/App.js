import React from "react";
import styled from "styled-components";
import Container from "./components/container.js";
import Nav from "./components/nav.js";
import API from "./utils/API";
import Footer from "./components/footer";

const Height = styled.div``;

const Width = styled.div`
  min-height: 100%;
  border: 3px solid yellow;
  width: 100%;
  background: linear-gradient(
    to bottom,
    #6db3f2 0%,
    #54a3ee 50%,
    #3690f0 51%,
    #1e69de 100%
  ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
`;

class App extends React.Component {
  // db: true - saved playlist clicked allTunesShow: 0
  // dbLoad: true - see Db Tunes clicked = allTunesShow: 1
  // loginShow: 1 - login
  // loginShow: 0 - show playlist

  // login: true - loggedin

  // id - user's id for getting db
  // added - number of tracks in a users savelist
  // play - 1: make player appear

  state = {
    allTunesShow: 1,
    logInShow: 0,
    added: 0,
    play: 0,

    login: false,
    id: 0,
    message: "Logged Out",

    allTunes: [],
    userTunes: [],
    playerID: 0
  };

  changeState = x => {
    // this.setState(x);
    this.setState(x, () => console.log(this.state));
  };

  getTunes = () => {
    API.getSavedTunes(this.state.id).then(res => {
      var add = res.data.filter((e, i) => {
        return !this.state.savedTunes.includes(e);
      });

      this.setState({ savedTunes: add });
    });
  };

  render() {
    return (
      <Width>
        <Nav appData={this.state} changeState={this.changeState} />

        <Height>
          <Container appData={this.state} changeState={this.changeState} />
        </Height>
        <Footer />
      </Width>
    );
  }
}

export default App;
