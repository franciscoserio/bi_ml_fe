import React, { Component } from "react";
import "./Sidebar.css";
import dashboard from "../../assets/dashboard.svg";
import dashboard_white from "../../assets/dashboard-white.svg";
import devices_white from "../../assets/devices-white.svg";
import data_white from "../../assets/data-white.svg";
import devices from "../../assets/devices.svg";
import data from "../../assets/data.svg";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import $ from "jquery";

class Sidebar extends Component {
  componentDidMount() {
    $(".sidenav").hover(
      function () {
        $(".sidenav").animate(
          {
            width: "260px",
          },
          300
        );

        // logo user
        $(".logouser")
          .animate({ opacity: 0 }, 300, function () {
            $(this).css("margin-top", "20px");
            $(this).css("margin-bottom", "5px");
            $(this).text("Francisco Sério");
          })
          .animate({ opacity: 1 }, 200);

        $(".logo_user").animate({
          width: "205px",
          height: "205px",
        });

        // tenants
        $(".tenants")
          .animate({ opacity: 0 }, 200, function () {
            $(this).text("Tenants");
          })
          .animate({ opacity: 1 }, 200);

        // dashboard
        $(".dashboard")
          .animate({ opacity: 0 }, 200, function () {
            $(this).text("Dashboard");
          })
          .animate({ opacity: 1 }, 200);

        // devices
        $(".devices")
          .animate({ opacity: 0 }, 200, function () {
            $(this).text("Devices");
          })
          .animate({ opacity: 1 }, 200);

        // data
        $(".data")
          .animate({ opacity: 0 }, 200, function () {
            $(this).text("Data");
          })
          .animate({ opacity: 1 }, 200);
      },
      function () {
        $(".sidenav").stop(true, true);
        $(".logo_user").stop(true, true);
        $(".logouser").stop(true, true);
        $(".tenants").stop(true, true);
        $(".dashboard").stop(true, true);
        $(".devices").stop(true, true);
        $(".data").stop(true, true);

        $(".logouser")
          .animate({ opacity: 1 }, 50, function () {
            $(this).text("");
          })
          .animate({ opacity: 0 }, 50);

        $(".tenants")
          .animate({ opacity: 1 }, 50, function () {
            $(this).text("");
          })
          .animate({ opacity: 0 }, 50);

        $(".dashboard")
          .animate({ opacity: 1 }, 50, function () {
            $(this).text("");
          })
          .animate({ opacity: 0 }, 50);

        $(".devices")
          .animate({ opacity: 1 }, 50, function () {
            $(this).text("");
          })
          .animate({ opacity: 0 }, 50);

        $(".data")
          .animate({ opacity: 1 }, 50, function () {
            $(this).text("");
          })
          .animate({ opacity: 0 }, 50);

        $(".logo_user").animate(
          {
            width: "40px",
            height: "40px",
          },
          300
        );

        $(".sidenav").animate(
          {
            width: "90px",
          },
          300
        );
      }
    );
  }

  render() {
    return (
      <div className="sidebar">
        <div className="sidenav">
          <a>
            <img className="logo_user" src={logo} width="40px" height="40px" />
            <div className="description">
              <p className="logouser"></p>
            </div>
          </a>
          <br />

          {this.props.page === "Tenants" ? (
            <a className="menu_chosed">
              <img src={dashboard} width="40px" height="40px" />
              <div className="description">
                <p className="tenants"></p>
              </div>
            </a>
          ) : (
            <Link to={"/tenants"}>
              <img src={dashboard_white} width="40px" height="40px" />
              <div className="description">
                <p className="tenants"></p>
              </div>
            </Link>
          )}

          {this.props.page === "Dashboard" ? (
            <a className="menu_chosed">
              <img src={dashboard} width="40px" height="40px" />
              <div className="description">
                <p className="dashboard"></p>
              </div>
            </a>
          ) : (
            <Link to={"/dashboard"}>
              <img src={dashboard_white} width="40px" height="40px" />
              <div className="description">
                <p className="dashboard"></p>
              </div>
            </Link>
          )}

          {this.props.page === "Devices" ? (
            <a className="menu_chosed">
              <img src={devices} width="40px" height="40px" />
              <div className="description">
                <p className="devices"></p>
              </div>
            </a>
          ) : (
            <Link to={"/devices"}>
              <img src={devices_white} width="40px" height="40px" />
              <div className="description">
                <p className="devices"></p>
              </div>
            </Link>
          )}

          {this.props.page === "Data" ? (
            <a className="menu_chosed">
              <img src={data} width="40px" height="40px" />
              <div className="description">
                <p className="data"></p>
              </div>
            </a>
          ) : (
            <Link to={"/dashboard"}>
              <img src={data_white} width="40px" height="40px" />
              <div className="description">
                <p className="data"></p>
              </div>
            </Link>
          )}
        </div>
      </div>
    );
  }
}

export default Sidebar;
