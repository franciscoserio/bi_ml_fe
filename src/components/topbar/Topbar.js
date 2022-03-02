import React, { Component } from "react";
import "./Topbar.css";
import notifications from "../../assets/notifications.png";
import signout from "../../assets/signout.png";
import search from "../../assets/search.png";
import Cookies from "universal-cookie";

class Tenants extends Component {
  constructor(props) {
    super(props);
    this.sayHello = this.logout.bind(this);
  }

  logout() {
    const cookies = new Cookies();

    // remove user cookies
    cookies.remove("token");
    cookies.remove("roles");

    window.location = "/login";
  }

  componentWillMount() {}

  render() {
    return (
      <div>
        <div className="topbar">
          <div className="title">
            <h1>{this.props.title}</h1>
          </div>
          <div className="signout">
            <a className="icons">
              <img src={search} height="35px" />
            </a>
            <a className="icons">
              <img src={notifications} height="35px" />
            </a>
            <a className="icons" onClick={this.logout}>
              <img src={signout} height="35px" />
            </a>
          </div>
        </div>
        <hr style={{ margin: 0 }} />
      </div>
    );
  }
}

export default Tenants;
