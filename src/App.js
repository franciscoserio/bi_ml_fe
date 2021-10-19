import React, {Component} from 'react';
import './App.css';
import { Route, Link } from "react-router-dom";
import Predictions from "./pages/Tools/Predictions/Predictions";
import Tools from "./pages/Tools/Tools";
import Users from "./pages/Users/Users";
import UserDetails from "./pages/Users/UserDetails/UserDetails";
import Dashboard from "./pages/Dashboard/Dashboard";
import Tenants from "./pages/Tenants/Tenants";
import Login from "./pages/Login/Login";
import Devices from "./pages/Devices/Devices";

function App(){

    return (
        <div className="App">
          <Route exact path="/tools/predictions" component={Predictions} />
          <Route exact path="/tools" component={Tools} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/users/:user_id" component={UserDetails} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/tenants" component={Tenants} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/Devices" component={Devices} />
          <Route exact path="/Devices/:device_id" component={Devices} />
        </div>
    );
}

export default App;
