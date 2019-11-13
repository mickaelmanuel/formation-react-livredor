import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { SignUp } from "./components/SignUp";

export default class App extends React.Component {
  state = {
    username: "",
    token: null
  };

  render() {
    return (
      <Router>
        <div>
          <h1>Livre d'or</h1>
          <Switch>
            <Route
              path="/login"
              render={routeParams =>
                this.state.token === null ? (
                  <Login
                    onTokenChange={tok => {
                      this.setState({ token: tok.token, username: tok.username });
                    }}
                    history={routeParams.history}
                  />
                ) : (
                  <Redirect to="/" />
                )
              }
            ></Route>
            <Route
              path="/signup"
              render={routeParams =>
                this.state.token === null ? (
                  <SignUp
                    onTokenChange={tok => {
                      this.setState({ token: tok.token, username: tok.username });
                    }}
                    history={routeParams.history}
                  />
                ) : (
                  <Redirect to="/" />
                )
              }
            ></Route>
            <Route path="/">
              <Home
                username={this.state.username}
                token={this.state.token}
                onLogout={() => {
                  this.setState({ token: null, username: "" });
                  window.location.reload(true);
                }}
              />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
