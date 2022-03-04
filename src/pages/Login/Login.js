import React, { Component } from "react";
import "./Login.css";
//import $ from 'jquery';
import Cookies from "universal-cookie";
import API from "../../utils/callAPI";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      incorrectCredentials: false,
      email: "",
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

    this.setState({ incorrectCredentials: false });

    const { email, password } = this.state;
    const cookies = new Cookies();

    API.Login(email, password)
      .then((response) => {
        if (response["status"] === 200) {
          // set cookies with token and roles
          cookies.set("token", response["data"]["token"], { maxAge: 31536000 });
          window.location = "/tenants";
          this.setState({ incorrectCredentials: false });
        }
      })
      .catch((error) => {
        this.setState({ incorrectCredentials: true });
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

          {this.state.incorrectCredentials === true &&
            <div className="alert alert-danger" role="alert">
              Incorrect credentials
            </div>}

            <div className="form-group has-error">
              <input
                className="form-control"
                type="email"
                name="email"
                placeholder="Email"
                value={this.state.email}
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
