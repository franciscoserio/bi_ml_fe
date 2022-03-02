import React, { Component } from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import Topbar from "../../../components/topbar/Topbar";
import Loading from "../../../components/loading/Loading";
import API from "../../../utils/callAPI";
import logo from "../../../assets/logo.png";
import tenant_logo from "../../../assets/tenant_logo.png";
import "./UserDetails.css";
import $ from "jquery";

class UserDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: 0,
    };
  }

  handleOnClickTest = (e) => {
    var currentAttrValue = $(this).attr("href");

    // Show/Hide Tabs
    $(".tabs " + currentAttrValue)
      .show()
      .siblings()
      .hide();

    // Change/remove current tab to active
    $(this).parent("li").addClass("active").siblings().removeClass("active");

    e.preventDefault();
  };

  componentWillMount() {}

  goPredictionPage() {
    window.location = "/tools/predictions";
  }

  render() {
    return (
      <div>
        {this.state.loading === 1 ? (
          <Loading />
        ) : (
          <div>
            <Sidebar page="Tenants" />
            <Topbar title="Users" />

            <div className="users_page">
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="profile-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#profile"
                    type="button"
                    role="tab"
                    aria-controls="profile"
                    aria-selected="true"
                  >
                    <img className="img_logo" src={logo} width="25px" />
                    Profile
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="tenant-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#tenant"
                    type="button"
                    role="tab"
                    aria-controls="tenant"
                    aria-selected="false"
                  >
                    <img className="img_logo" src={tenant_logo} width="25px" />
                    Tenant
                  </button>
                </li>
              </ul>
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="profile"
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                >
                  <div className="container-flex">
                    <div className="row">
                      <div className="col-sm justify-content-center text-center content">
                        <img className="img_logo" src={logo} width="200px" />
                        <div className="form-check form-switch">
                          <label
                            className="form-check-label status"
                            for="flexSwitchCheckDefault"
                          >
                            Active
                          </label>
                          <input
                            className="form-check-input status_switch"
                            type="checkbox"
                            id="flexSwitchCheckDefault"
                          />
                        </div>

                        <div className="info_user">
                          <h3>Email</h3>
                          <div className="input-group mb-3">
                            <input
                              placeholder="Email"
                              type="text"
                              className="form-control"
                              aria-label="Small"
                              aria-describedby="inputGroup-sizing-sm"
                            />
                          </div>
                        </div>

                        <div className="info_user">
                          <h3>First Name</h3>
                          <div className="input-group mb-3">
                            <input
                              placeholder="First Name"
                              type="text"
                              className="form-control"
                              aria-label="Small"
                              aria-describedby="inputGroup-sizing-sm"
                            />
                          </div>
                        </div>

                        <div className="info_user">
                          <h3>Last Name</h3>
                          <div className="input-group mb-3">
                            <input
                              placeholder="Last Name"
                              type="text"
                              className="form-control"
                              aria-label="Small"
                              aria-describedby="inputGroup-sizing-sm"
                            />
                          </div>
                        </div>

                        <div className="info_user submit">
                          <button type="button" className="btn btn-warning">
                            Edit
                          </button>
                          <button type="button" className="btn btn-danger">
                            Delete
                          </button>
                        </div>
                      </div>

                      <div className="col-sm justify-content-center text-center content">
                        <h1>PERMISSIONS</h1>
                        <table className="permissions">
                          <tr>
                            <th></th>
                            <th>CREATE</th>
                            <th>READ</th>
                            <th>UPDATE</th>
                            <th>DELETE</th>
                          </tr>
                          <tr>
                            <td>Users</td>
                            <td>
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input permission_switch"
                                  type="checkbox"
                                  id="flexSwitchCheckDefault"
                                />
                              </div>
                            </td>
                            <td>
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input permission_switch"
                                  type="checkbox"
                                  id="flexSwitchCheckDefault"
                                />
                              </div>
                            </td>
                            <td>
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input permission_switch"
                                  type="checkbox"
                                  id="flexSwitchCheckDefault"
                                />
                              </div>
                            </td>
                            <td>
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input permission_switch"
                                  type="checkbox"
                                  id="flexSwitchCheckDefault"
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>Datasource</td>
                            <td>
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input permission_switch"
                                  type="checkbox"
                                  id="flexSwitchCheckDefault"
                                />
                              </div>
                            </td>
                            <td>
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input permission_switch"
                                  type="checkbox"
                                  id="flexSwitchCheckDefault"
                                />
                              </div>
                            </td>
                            <td>
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input permission_switch"
                                  type="checkbox"
                                  id="flexSwitchCheckDefault"
                                />
                              </div>
                            </td>
                            <td>
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input permission_switch"
                                  type="checkbox"
                                  id="flexSwitchCheckDefault"
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>Datasource</td>
                            <td>
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input permission_switch"
                                  type="checkbox"
                                  id="flexSwitchCheckDefault"
                                />
                              </div>
                            </td>
                            <td>
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input permission_switch"
                                  type="checkbox"
                                  id="flexSwitchCheckDefault"
                                />
                              </div>
                            </td>
                            <td>
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input permission_switch"
                                  type="checkbox"
                                  id="flexSwitchCheckDefault"
                                />
                              </div>
                            </td>
                            <td>
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input permission_switch"
                                  type="checkbox"
                                  id="flexSwitchCheckDefault"
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>Datasource</td>
                            <td>
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input permission_switch"
                                  type="checkbox"
                                  id="flexSwitchCheckDefault"
                                />
                              </div>
                            </td>
                            <td>
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input permission_switch"
                                  type="checkbox"
                                  id="flexSwitchCheckDefault"
                                />
                              </div>
                            </td>
                            <td>
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input permission_switch"
                                  type="checkbox"
                                  id="flexSwitchCheckDefault"
                                />
                              </div>
                            </td>
                            <td>
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input permission_switch"
                                  type="checkbox"
                                  id="flexSwitchCheckDefault"
                                />
                              </div>
                            </td>
                          </tr>
                        </table>

                        <div className="submit_permissions">
                          <button type="button" className="btn btn-warning">
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="tenant"
                  role="tabpanel"
                  aria-labelledby="tenant-tab"
                >
                  tenant
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default UserDetails;
