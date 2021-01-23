import React, {Component} from 'react';
import './Topbar.css';
import notifications from '../../assets/notifications.png';
import signout from '../../assets/signout.png';
import search from '../../assets/search.png';
import $ from 'jquery';
import Cookies from 'universal-cookie';

class Tenants extends Component {

  constructor(props) {
    super(props);
    this.sayHello = this.logout.bind(this);
  }

  logout() {

    const cookies = new Cookies();

    // remove user cookies
    cookies.remove('token');
    cookies.remove('roles');

    window.location = '/login';
  }

  componentWillMount(){

  }

  render() {
    
    return <div className="topbar">

              <div class="topbar">
                <div class="title">
                  <h1>{this.props.title}</h1>
                </div>
                <div class="signout">
                  <a class="icons"><img src={search} height="35px" /></a>
                  <a class="icons"><img src={notifications}height="35px" /></a>
                  <a class="icons" onClick={this.logout}><img src={signout} height="35px" /></a>
                </div>
                <hr />
              </div>

            </div>;
  }
}

export default Tenants;