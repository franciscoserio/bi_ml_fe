import React, { Component } from "react";
import "./Login.css";
//import $ from 'jquery';
import Cookies from "universal-cookie";
import API from "../../utils/callAPI";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    const { username, password } = this.state;
    const cookies = new Cookies();

    API.Login(username, password)
      .then((response) => {
        if (response["status"] === 200) {
          // set cookies with token and roles
          cookies.set("token", response["data"]["token"], { maxAge: 31536000 });

          window.location = "/tenants";
        }
      })
      .catch((error) => {
        console.log("login errado");
      });
    event.preventDefault();
  }

  render() {
    // background color
    document.body.style = "background-color: rgb(11, 122, 192);";

    return (
      <div className="login-page">
        <div className="login-form">
          <form onSubmit={this.handleSubmit}>
            <h2 className="text-center">Login</h2>
            <div className="form-group has-error">
              <input
                className="form-control"
                name="username"
                placeholder="Username"
                value={this.state.username}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="password"
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-lg btn-block">
                Sign in
              </button>
            </div>
            <p className="text-center small">
              Don't have an account? <a href="#">Sign up here!</a>
            </p>
          </form>
        </div>
      </div>
    );
  }
}
