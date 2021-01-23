import React, {Component} from 'react';
import Sidebar from '../../components/sidebar/Sidebar'
import Topbar from '../../components/topbar/Topbar'
import select from '../../assets/select.png';
import Loading from '../../components/loading/Loading'
import see from '../../assets/see.svg';
import './Tenants.css';
import $ from 'jquery';
import API from '../../utils/callAPI';

class Tenants extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      loading: 1,
      loadingTenants: 1,
      tenants: null
    };
  }

  jqueryAnimations(){
    
    $(".tenant_box").hover(
      function() {
        $(this).find(".see").stop().animate({ opacity: 1 });
        $(this).find(".select").stop().animate({ opacity: 1 });
      },
      function() {
        $(this).find(".see").stop().animate({ opacity: 0 });
        $(this).find(".select").stop().animate({ opacity: 0 });
    });
  }

  getTenants(){

    API.getTenants()
      .then((res)=>{
        if (res.status != 401)
        {
          this.setState({tenants: res["data"]["tenants"]});
          this.setState({loadingTenants: 0});
          this.jqueryAnimations();
        }
        else
        {
          window.location = '/login';
        }
      })
  }

  componentWillMount(){
    
    API.checkLogin()
      .then(response => {
        if (response.status != 401)
        {
          this.setState({loading: 0});
          this.getTenants();
        }
        else
        {
          window.location = '/login';
        }
        
      })
      .catch(error => {
        window.location = '/login';
      });

  }

  render() {
    
    return (
        <div>
          {this.state.loading == 1 ?
          <Loading />
          :
          <div>
            <Sidebar page = "Tenants" />
            <Topbar title = "Tenants" />
            
            {this.state.loadingTenants == 1 ?
            <Loading />
            :
            <div class="tenants_page">
            
              
              {this.state.tenants.map((tenant, index) => (
                <div class="tenant_box" key={index}>
                  <p>{tenant["name"]}</p>
                  <img class="select" src={select} width="40px" height="40px" />
                  <img class="see" src={see} width="40px" height="40px" /> 
                </div>
              ))}

              <div class="tenant_box">
                <p class="add_tenant">+</p>
              </div>

            </div>}
          </div>}
        </div>
    )
  }
}

export default Tenants;
