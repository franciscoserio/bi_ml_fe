import React, {Component} from 'react';
import Sidebar from '../../components/sidebar/Sidebar'
import Topbar from '../../components/topbar/Topbar'
import Datatable from '../../components/datatable/Datatable'
import select from '../../assets/select.png';
import Loading from '../../components/loading/Loading'
import see from '../../assets/see.svg';
import './Devices.css';
import $ from 'jquery';
import API from '../../utils/callAPI';
import { CompareArrowsOutlined } from '@material-ui/icons';

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
      createdDevicesLastWeek: 0
    };
  }

  setAllDevices() {
    this.setState({ totalDevices: this.state.devices.length });
  }

  setActiveDevices() {
    for (var i = 0; i < this.state.devices.length; i++) {
      if (this.state.devices[i]["status"] == "active") {
        this.setState({activeDevices: this.state.activeDevices + 1});
      }
    }
  }

  setInactiveDevices() {
    for (var i = 0; i < this.state.devices.length; i++) {
      if (this.state.devices[i]["status"] != "active") {
        this.setState({inactiveDevices: this.state.inactiveDevices + 1});
      }
    }
  }

  setCreatedDevicesLastWeek() {

    var now = new Date()
    for (var i = 0; i < this.state.devices.length; i++) {
      var created_at = new Date(this.state.devices[i]["created_at"])
      if ((now - created_at) <= 604800000) {
        this.setState({createdDevicesLastWeek: this.state.createdDevicesLastWeek + 1});
      }
    }
  }

  setStatistics() {

    this.setAllDevices()
    this.setActiveDevices()
    this.setInactiveDevices()
    this.setCreatedDevicesLastWeek()
  }

  async getDevices() {

    var devicesList = []
    var totalPages = null

    API.getDevices(this.state.limit.toString(), this.state.page.toString())
      .then((res) => {
        if (res.status !== 401)
        {
          
          totalPages = res["data"]["total_pages"]
          devicesList.push(...res["data"]["data"])
          this.setState({devices: devicesList});
          this.setStatistics();

          // get the rest of the data
          if (totalPages > 1) {
            for (var i = 2; i <= totalPages; i++) {
              
              API.getDevices(this.state.limit.toString(), i.toString())
                .then((resp)=>{
                  if (resp.status !== 401)
                  {
                    devicesList.push(...resp["data"]["data"])
                    this.setState({devices: devicesList});
                    this.setStatistics();
                    this.setState({loadingDevices: 0});
                    
                  } else
                  {
                    window.location = '/login';
                  }
                })
              }

              console.log("oi")
            } else {
              this.setState({loadingDevices: 0});
            }

        } else
        {
          window.location = '/login';
        }
      })
      .catch(() => {
        window.location = '/login';
      });

      this.setState({devices: devicesList});

      return devicesList
  }

  componentWillMount(){
    this.getDevices();
    this.setState({loading: 0});
  }

  render() {
    
    return (
        <div>
          {this.state.loading == 1 ?
          <Loading />
          :
          <div>
            <Sidebar page = "Devices" />
            <Topbar title = "Devices" />
            
            {this.state.loadingDevices == 1 ?
            
            <Loading />
            :
            <div class="devices_page">
              <div class="container-fluid">
                <div class="row">
                    <div class="col-md-4 col-xl-3">
                        <div class="card bg-c-blue order-card">
                            <div class="card-block">
                                <h6 class="m-b-20">Total Devices</h6>
                                <h2 class="text-right"><i class="fas fa-thermometer-quarter f-left"></i><span>{this.state.totalDevices}</span></h2>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-4 col-xl-3">
                        <div class="card bg-c-green order-card">
                            <div class="card-block">
                                <h6 class="m-b-20">Active Devices</h6>
                                <h2 class="text-right"><i class="fas fa-toggle-on f-left"></i><span>{this.state.activeDevices}</span></h2>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-4 col-xl-3">
                        <div class="card bg-c-pink order-card">
                            <div class="card-block">
                                <h6 class="m-b-20">Inactive Devices</h6>
                                <h2 class="text-right"><i class="fas fa-toggle-off f-left"></i><span>{this.state.inactiveDevices}</span></h2>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-4 col-xl-3">
                        <div class="card bg-c-yellow order-card">
                            <div class="card-block">
                                <h6 class="m-b-20">Created Devices Last Week</h6>
                                <h2 class="text-right"><i class="fa fa-plus f-left"></i><span>{this.state.createdDevicesLastWeek}</span></h2>
                            </div>
                        </div>
                    </div>

                </div>
              
                <div class="row">
                  <div class="col-md-12">
                    <Datatable devices = {this.state.devices}/>
                  </div>
                </div>

              </div>
            </div>}
          </div>}
        </div>
    )
  }
}

export default Devices;
