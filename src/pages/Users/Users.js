import React, {Component} from 'react';
import Sidebar from '../../components/sidebar/Sidebar'
import Topbar from '../../components/topbar/Topbar'
import Loading from '../../components/loading/Loading'
import logo from '../../assets/logo.png';
import API from '../../utils/callAPI';
import './Users.css';

class Users extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      loading: 1
    };
  }

  componentWillMount(){
    
    API.checkLogin()
    .then(response => {
      console.log("error");
      if (response.status != 401)
      {
        this.setState({loading: 0});
      }
      else
      {
        window.location = '/login';
      }
      
    })
    .catch(error => {
      if (error.response["status"] == 401)
      {
        window.location = '/login';
      }
    });

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

            <div class="users_page">
              <div class="users_box">
                <img class="img_tool" src={logo} width="150px" />
                <p>Francisco Sério</p>
              </div>
           
              <div class="users_box">
                <img class="img_tool" src={logo} width="150px" />
                <p>João Maria</p>
              </div>

              <div class="users_box">
                <img class="img_tool" src={logo} width="150px" />
                <p>Manuel Sousa</p>
              </div>
            </div>

          </div>}
        </div>
    )
  }
}

export default Users;
