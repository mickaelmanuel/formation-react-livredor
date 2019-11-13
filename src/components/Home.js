import React from "react";
import { Link } from "react-router-dom";
import { Api } from "../Api";
import { Input } from "./Input";
import { Button } from "./Button";
import axios from "axios";
export class Home extends React.Component {
  state = {
    isLoading: false,
    messages: [],
    message: ""
  };
  async loadMessages() {
    this.setState({ isLoading: true });
    const messages = await Api.getMessages();
    this.setState({ messages, isLoading: false });
  }
  async componentDidMount() {
    await this.loadMessages();
  }
  render() {
    if (this.state.isLoading) {
      return <p>Loading…</p>;
    }
    return (
      <div>
        <ul>
          {this.state.messages &&
            this.state.messages.map(message => {
              return <li key={message.id}>{message.content}</li>;
            })}
        </ul>

        {(() => {
          if (this.props.token === null) {
            return (
              <p>
                You need to <Link to="/login">Login</Link> or <Link to="/signup">Sign up</Link> to add a message
              </p>
            );
          } else {
            return (
              <div>
                <div>
                  <Input
                    placeholder="message"
                    value={this.state.message}
                    name="message"
                    onTextChange={e => {
                      this.setState({ message: e.target.value });
                    }}
                  />
                  <Button
                    onClick={async () => {
                      //   axios
                      //     .post(
                      //       "https://livredor-api.herokuapp.com/message",
                      //       {
                      //         content: this.state.message
                      //       },
                      //       {
                      //         headers: { Authorization: "Bearer " + this.props.token }
                      //       }
                      //     )
                      //     .then(async response => {
                      //       await this.loadMessages();
                      //     })
                      //     .catch(error => {
                      //       // this.setState({ errorMessage: error.response.data.error });
                      //       console.log(error);
                      //     });

                      Api.postMessage(
                        this.props.token,
                        this.state.message,
                        async response => {
                          console.log(response.data);
                          await this.loadMessages();
                        },
                        error => {
                          console.log(error);
                        }
                      );
                    }}
                  >
                    Send
                  </Button>
                </div>
                <p>
                  Logged in as <b>{this.props.username}</b>
                  <Button onClick={this.props.onLogout}>Logout</Button>
                </p>
              </div>
            );
          }
        })()}
      </div>
    );
  }
}
