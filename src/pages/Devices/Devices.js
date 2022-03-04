import React, { Component } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import Datatable from "../../components/datatable/Datatable";
import Loading from "../../components/loading/Loading";
import Menu from "../../components/devices/Devices";
import "./Devices.css";
import API from "../../utils/callAPI";

class Devices extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: 1,
      loadingDevices: 1,
      devices: null,
      limit: 100,
      page: 1,
      totalDevices: 0,
      activeDevices: 0,
      inactiveDevices: 0,
      createdDevicesLastWeek: 0,
      ws: null
    };
  }

  setAllDevices() {
    this.setState({ totalDevices: this.state.devices.length });
  }

  setActiveDevices() {
    var activeDevices = 0;
    for (var i = 0; i < this.state.devices.length; i++) {
      if (this.state.devices[i]["is_active"] === true) {
        activeDevices = activeDevices + 1;
      }
    }
    this.setState({ activeDevices: activeDevices });
  }

  setInactiveDevices() {
    var inactiveDevices = 0;
    for (var i = 0; i < this.state.devices.length; i++) {
      if (this.state.devices[i]["is_active"] === false) {
        inactiveDevices = inactiveDevices + 1;
      }
    }
    this.setState({ inactiveDevices: inactiveDevices });
  }

  setCreatedDevicesLastWeek() {
    var now = new Date();
    var createdDevicesLastWeek = 0;
    for (var i = 0; i < this.state.devices.length; i++) {
      var created_at = new Date(this.state.devices[i]["created_at"]);
      if (now - created_at <= 604800000) {
        createdDevicesLastWeek = createdDevicesLastWeek + 1;
        
      }
    }
    this.setState({
        createdDevicesLastWeek: createdDevicesLastWeek
      });
  }

  setStatistics() {
    this.setAllDevices();
    this.setActiveDevices();
    this.setInactiveDevices();
    this.setCreatedDevicesLastWeek();
  }

  AddOrEditDevice(obj) {
    var newDevice = true
    var updated_device_list = this.state.devices;
    updated_device_list.forEach(function(e) {
      if (obj.id === e.id) {
        for(var i in obj) e[i] = obj[i]
        newDevice = false
      }
    })
    if (newDevice !== false) {
      updated_device_list.push(obj); 
    }
    this.setState({ devices: updated_device_list });
  }

  timeout = 250; // Initial timeout duration as a class variable

  /**
  * @function connect
  * This function establishes the connect with the websocket and also ensures constant reconnection if connection closes
 */
  connectWebsocket = () => {
    var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiMGI4YzY5ZDItZjhhMS00NTNhLWIzYTItNDVmY2RkZWUzMDBiIiwidXNlcm5hbWUiOiJ1c2VyMUBlbWFpbC5jb20iLCJleHAiOjE2NDY0Mjg3NzYsImVtYWlsIjoidXNlcjFAZW1haWwuY29tIn0.ukecHVa1lFPiJGyWmEv2arTvNh8HhkVh84wVoSDTen8"
    var ws = new WebSocket("ws://localhost:8000/ws/88427b1d-a0f0-491e-9a35-7903e9460de1/devices?authorization=" + token);
    let that = this; // cache the this
    var connectInterval;

    // websocket onopen event listener
    ws.onopen = () => {
        console.log("connected websocket main component");

        this.setState({ ws: ws });

        that.timeout = 250; // reset timer to 250 on open of websocket connection 
        clearTimeout(connectInterval); // clear Interval on on open of websocket connection
    };

    ws.onmessage = evt => {
        // listen to data sent from the websocket server
        const message = JSON.parse(evt.data);
        this.AddOrEditDevice(message["message"]["message"]);
        this.setStatistics();
    }

    // websocket onclose event listener
    ws.onclose = e => {
        console.log(
            `Socket is closed. Reconnect will be attempted in ${Math.min(
                10000 / 1000,
                (that.timeout + that.timeout) / 1000
            )} second.`,
            e.reason
        );

        that.timeout = that.timeout + that.timeout; //increment retry interval
        connectInterval = setTimeout(this.check, Math.min(10000, that.timeout)); //call check function after timeout
    };

    // websocket onerror event listener
    ws.onerror = err => {
        console.error(
            "Socket encountered error: ",
            err.message,
            "Closing socket"
        );

        ws.close();
    };
  }

  check = () => {
      const { ws } = this.state;
      if (!ws || ws.readyState === WebSocket.CLOSED) this.connectWebsocket(); //check if websocket instance is closed, if so call `connect` function.
  };

  async getDevices() {
    var devicesList = [];
    var totalPages = null;

    API.getDevices(this.state.limit.toString(), this.state.page.toString())
      .then((res) => {
        if (res.status !== 401) {
          totalPages = res["data"]["total_pages"];
          devicesList.push(...res["data"]["results"]);
          this.setState({ devices: devicesList });
          this.setStatistics();

          // get the rest of the data
          if (totalPages > 1) {
            for (var i = 2; i <= totalPages; i++) {
              API.getDevices(this.state.limit.toString(), i.toString()).then(
                (resp) => {
                  if (resp.status !== 401) {
                    devicesList.push(...resp["data"]["data"]);
                    this.setState({ devices: devicesList });
                    this.setStatistics();
                    this.setState({ loadingDevices: 0 });
                  } else {
                    window.location = "/login";
                  }
                }
              );
            }
          } else {
            this.setState({ loadingDevices: 0 });
          }
        } else {
          window.location = "/login";
        }
      })
      .catch((e) => {
        console.log(e);
        window.location = "/login";
      });

    this.setState({ devices: devicesList });

    return devicesList;
  }

  componentDidMount() {
    this.getDevices();
    this.connectWebsocket();
    this.setState({ loading: 0 });
  }

  render() {
    return (
      <div>
        {this.state.loading === 1 ? (
          <Loading />
        ) : (
          <div>
            <Sidebar page="Devices" />
            <Topbar title="Devices" />

            {this.state.loadingDevices === 1 ? (
              <Loading />
            ) : (
              <div className="devices_page">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-4 col-xl-3">
                      <div className="card bg-c-blue order-card">
                        <div className="card-block">
                          <h6 className="m-b-20">Total Devices</h6>
                          <h2 className="text-right">
                            <i className="fas fa-thermometer-quarter f-left"></i>
                            <span>{this.state.totalDevices}</span>
                          </h2>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-4 col-xl-3">
                      <div className="card bg-c-green order-card">
                        <div className="card-block">
                          <h6 className="m-b-20">Active Devices</h6>
                          <h2 className="text-right">
                            <i className="fas fa-toggle-on f-left"></i>
                            <span>{this.state.activeDevices}</span>
                          </h2>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-4 col-xl-3">
                      <div className="card bg-c-pink order-card">
                        <div className="card-block">
                          <h6 className="m-b-20">Inactive Devices</h6>
                          <h2 className="text-right">
                            <i className="fas fa-toggle-off f-left"></i>
                            <span>{this.state.inactiveDevices}</span>
                          </h2>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-4 col-xl-3">
                      <div className="card bg-c-yellow order-card">
                        <div className="card-block">
                          <h6 className="m-b-20">Created Devices Last Week</h6>
                          <h2 className="text-right">
                            <i className="fa fa-plus f-left"></i>
                            <span>{this.state.createdDevicesLastWeek}</span>
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <button type="button" data-bs-toggle="modal-create-devic" className="create-device btn btn-primary">
                        <i className="fa fa-plus"></i> Create
                      </button>
                      <Datatable devices={this.state.devices} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Devices;
