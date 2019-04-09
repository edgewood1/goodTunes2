import API from "../utils/API";
import React from "react";

import {
  Container,
  Header,
  Names,
  Buttons,
  LargeFont,
  MedFont
} from "./playList_css";

class Books extends React.Component {
  state = {
    tunes: []
  };

  componentDidMount() {
    if (this.props.appData.allTunesShow) {
      this.getPlaylist();
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.appData.allTunesShow) {
      return { tunes: props.appData.allTunes };
    } else {
      return {
        tunes: props.appData.userTunes
      };
    }
  }

  getPlaylist = () => {
    API.getPlaylist()
      .then(res => {
        this.props.changeState({ allTunes: res["data"] });
        this.setState({ tunes: res.data });
      })
      .catch(err => {
        console.log(err);
        this.getPlaylist();
      });
  };

  random = () => {
    var random = Math.floor(Math.random() * 100000);

    return random;
  };

  saveTunes = e => {
    // check if user is logged in
    if (this.props.appData.login && this.props.appData.id) {
      e.id = this.props.appData.id;
      API.saveTune(e).then(res => {
        console.log(res);
        if (res.data == "already saved") {
          this.props.changeState({ message: res.data });
          setTimeout(() => {
            this.props.changeState({ message: "keep browsing..." });
          }, 1000);
        } else if (res.data.tune) {
          var addTune = this.props.appData.userTunes;
          addTune.push(res.data.tune);
          this.props.changeState({
            message: res.data.message,
            userTunes: addTune
          });
          setTimeout(() => {
            this.props.changeState({ message: "keep browsing..." });
          }, 1000);
        } else {
          this.props.changeState({
            message: "you'll need to login and try again",
            logInShow: 1
          });
        }
      });
    }
  };

  deleteTunes = e => {
    // user id
    e.idToRemove = this.props.appData.id;
    // song id
    var culprit = e._id;

    API.deleteTunes(e).then(res => {
      var Arr = this.props.appData.userTunes;
      var newArr = Arr.filter(x => {
        return x["_id"] !== culprit;
      });

      this.props.changeState({ message: res.data.message, userTunes: newArr });
    });
  };

  updateTunes = e => {
    console.log(e);
    API.updateTunes(e).then(res => {
      this.props.changeState({ message: res.data.message });
    });
  };

  playTunes = e => {
    API.playTunes(e)

      .then(res => {
        console.log(res);
        this.props.changeState({
          playerID: res.data,
          message: "Press play!",
          play: 1
        });
        if (res.data === "#") {
          this.props.changeState({
            message: "Track not available for play - try another!",
            play: 0
          });
        }
      })
      .catch(error => {
        this.props.changeState({
          message: "Track not available for play - try another!",
          play: 0
        });
        return error;
      });
  };

  render() {
    return (
      <Container>
        {this.state.tunes.map(e => (
          <Header key={this.random()}>
            <Names>
              <LargeFont>{e.artist}</LargeFont>
              <MedFont> {e.title} </MedFont>
            </Names>
            <Buttons>
              <img alt="meaningful" src={e.source} />
              <button
                onClick={() => this.playTunes(e)}
                style={{ margin: "3%" }}
              >
                Play
              </button>
              {this.props.appData.allTunesShow ? (
                <button
                  onClick={() => this.saveTunes(e)}
                  style={{ margin: "3%" }}
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => this.deleteTunes(e)}
                  style={{ margin: "3%" }}
                >
                  {" "}
                  Delete{" "}
                </button>
              )}
            </Buttons>
          </Header>
        ))}
      </Container>
    );
  }
}

export default Books;
