import React, {Component} from 'react';
import Sidebar from '../../../components/sidebar/Sidebar'
import Topbar from '../../../components/topbar/Topbar'
import Loading from '../../../components/loading/Loading'
import API from '../../../utils/callAPI';
import logo from '../../../assets/logo.png';
import tenant_logo from '../../../assets/tenant_logo.png';
import './UserDetails.css';
import $ from 'jquery';

class UserDetails extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      loading: 0
    };
  }

  handleOnClickTest  = (e) => {
    var currentAttrValue = $(this).attr('href');
  
      // Show/Hide Tabs
      $('.tabs ' + currentAttrValue).show().siblings().hide();
  
      // Change/remove current tab to active
      $(this).parent('li').addClass('active').siblings().removeClass('active');
  
      e.preventDefault();
  }

  componentWillMount(){
    
  }

  goPredictionPage() {
    window.location = '/tools/predictions';
  }

  render() {
    
    return (
        <div>
          {this.state.loading == 1 ?
          <Loading />
          :
          <div>
            <Sidebar page = "Tenants" />
            <Topbar title = "Users" />

            <div className="users_page">




            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                <button class="nav-link active" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="true">
                  <img class="img_logo" src={logo} width="25px" />
                  Profile
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="tenant-tab" data-bs-toggle="tab" data-bs-target="#tenant" type="button" role="tab" aria-controls="tenant" aria-selected="false">
                  <img class="img_logo" src={tenant_logo} width="25px" />
                  Tenant
                </button>
              </li>
            </ul>
            <div class="tab-content" id="myTabContent">
              <div class="tab-pane fade show active" id="profile" role="tabpanel" aria-labelledby="profile-tab">

                <div class="container-flex">
                  <div class="row">
                    <div class="col-sm justify-content-center text-center content">
                      <img class="img_logo" src={logo} width="200px" />
                      <div class="form-check form-switch">
                        <label class="form-check-label status" for="flexSwitchCheckDefault">Active</label>
                        <input class="form-check-input status_switch" type="checkbox" id="flexSwitchCheckDefault" />
                      </div>

                      <div class="info_user">
                        <h3>Email</h3>
                        <div class="input-group mb-3">
                          <input placeholder="Email" type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                        </div>
                      </div>

                      <div class="info_user">
                        <h3>First Name</h3>
                        <div class="input-group mb-3">
                          <input placeholder="First Name" type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                        </div>
                      </div>

                      <div class="info_user">
                        <h3>Last Name</h3>
                        <div class="input-group mb-3">
                          <input placeholder="Last Name" type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                        </div>
                      </div>

                      <div class="info_user submit">
                        <button type="button" class="btn btn-warning">Edit</button>
                        <button type="button" class="btn btn-danger">Delete</button>
                      </div>

                    </div>

                    <div class="col-sm justify-content-center text-center content">
                      
                      <h1>PERMISSIONS</h1>
                      <table class="permissions">
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
                            <div class="form-check form-switch">
                              <input class="form-check-input permission_switch" type="checkbox" id="flexSwitchCheckDefault" />
                            </div>
                          </td>
                          <td>
                            <div class="form-check form-switch">
                              <input class="form-check-input permission_switch" type="checkbox" id="flexSwitchCheckDefault" />
                            </div>
                          </td>
                          <td>
                            <div class="form-check form-switch">
                              <input class="form-check-input permission_switch" type="checkbox" id="flexSwitchCheckDefault" />
                            </div>
                          </td>
                          <td>
                            <div class="form-check form-switch">
                              <input class="form-check-input permission_switch" type="checkbox" id="flexSwitchCheckDefault" />
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>Datasource</td>
                          <td>
                            <div class="form-check form-switch">
                              <input class="form-check-input permission_switch" type="checkbox" id="flexSwitchCheckDefault" />
                            </div>
                          </td>
                          <td>
                            <div class="form-check form-switch">
                              <input class="form-check-input permission_switch" type="checkbox" id="flexSwitchCheckDefault" />
                            </div>
                          </td>
                          <td>
                            <div class="form-check form-switch">
                              <input class="form-check-input permission_switch" type="checkbox" id="flexSwitchCheckDefault" />
                            </div>
                          </td>
                          <td>
                            <div class="form-check form-switch">
                              <input class="form-check-input permission_switch" type="checkbox" id="flexSwitchCheckDefault" />
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>Datasource</td>
                          <td>
                            <div class="form-check form-switch">
                              <input class="form-check-input permission_switch" type="checkbox" id="flexSwitchCheckDefault" />
                            </div>
                          </td>
                          <td>
                            <div class="form-check form-switch">
                              <input class="form-check-input permission_switch" type="checkbox" id="flexSwitchCheckDefault" />
                            </div>
                          </td>
                          <td>
                            <div class="form-check form-switch">
                              <input class="form-check-input permission_switch" type="checkbox" id="flexSwitchCheckDefault" />
                            </div>
                          </td>
                          <td>
                            <div class="form-check form-switch">
                              <input class="form-check-input permission_switch" type="checkbox" id="flexSwitchCheckDefault" />
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>Datasource</td>
                          <td>
                            <div class="form-check form-switch">
                              <input class="form-check-input permission_switch" type="checkbox" id="flexSwitchCheckDefault" />
                            </div>
                          </td>
                          <td>
                            <div class="form-check form-switch">
                              <input class="form-check-input permission_switch" type="checkbox" id="flexSwitchCheckDefault" />
                            </div>
                          </td>
                          <td>
                            <div class="form-check form-switch">
                              <input class="form-check-input permission_switch" type="checkbox" id="flexSwitchCheckDefault" />
                            </div>
                          </td>
                          <td>
                            <div class="form-check form-switch">
                              <input class="form-check-input permission_switch" type="checkbox" id="flexSwitchCheckDefault" />
                            </div>
                          </td>
                        </tr>
                      </table>

                      <div class="submit_permissions">
                        <button type="button" class="btn btn-warning">Edit</button>
                      </div>

                    </div>

                  </div>
                </div>
                
                
              </div>
              <div class="tab-pane fade" id="tenant" role="tabpanel" aria-labelledby="tenant-tab">
                tenant
              </div>
            </div>



            </div>

          </div>}
        </div>
    )
  }
}

export default UserDetails;
