import React, {Component} from 'react';
import './App.css';
import { Route, Link } from "react-router-dom";
import Predictions from "./pages/Tools/Predictions/Predictions";
import Tools from "./pages/Tools/Tools";
import Dashboard from "./pages/Dashboard/Dashboard";
import Tenants from "./pages/Tenants/Tenants";
import Login from "./pages/Login/Login";

function App(){

    return (
        <div className="App">
          <Route exact path="/tools/predictions" component={Predictions} />
          <Route exact path="/tools" component={Tools} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/tenants" component={Tenants} />
          <Route exact path="/login" component={Login} />
        </div>
    );
}

export default App;
