import React from "react";
import { Input } from "./Input";
import { Button } from "./Button";
import axios from "axios";
export class SignUp extends React.Component {
  state = {
    username: "",
    password: "",
    errorMessage: ""
  };
  render() {
    return (
      <div>
        <Button
          onClick={() => {
            this.props.history.goBack();
          }}
        >
          Go back
        </Button>
        <Input
          placeholder="username"
          value={this.state.username}
          name="username"
          onTextChange={e => {
            this.setState({ username: e.target.value });
          }}
        />
        <Input
          placeholder="password"
          value={this.state.password}
          name="password"
          onTextChange={e => {
            this.setState({ password: e.target.value });
          }}
        />
        <Button
          onClick={async () => {
            axios
              .post("https://livredor-api.herokuapp.com/signup", {
                username: this.state.username,
                password: this.state.password
              })
              .then(response => {
                this.props.onTokenChange(response.data);
                this.props.history.push("/");
              })
              .catch(error => {
                this.setState({ errorMessage: error.response.data.error });
              });
          }}
        >
          Sign up
        </Button>
        <span style={{ color: "red" }}>{this.state.errorMessage}</span>
      </div>
    );
  }
}
