import React, { Component } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import Loading from "../../components/loading/Loading";
import "./Dashboard.css";
import { Responsive, WidthProvider } from "react-grid-layout";
import { GridStack } from "gridstack";
import "gridstack/dist/gridstack.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: 1,
    };
  }

  constructGrid() {
    var grid = GridStack.init();

    // for (var i = 1; i < 10; i++)
    // {
    //   grid.addWidget('<div><div className="x grid-stack-item-content">Item ' + i + '</div></div>', {width: 3, height: 3});
    // }
  }

  componentWillMount() {
    this.setState({ loading: 0 });
    // this.constructGrid();
    // const cookies = new Cookies();
    // const header = 'Bearer '.concat(cookies.get('token'))

    // const config = {
    //   headers: { 'Authorization': header }
    // };

    // axios.get(
    //   "http://localhost:8000/api/authentication/check",
    //   config
    // )
    // .then(response => {

    //   if (response.status !== 401)
    //   {
    //     this.setState({loading: 0});
    //     this.constructGrid();
    //   }
    //   else
    //   {
    //     window.location = '/login';
    //   }

    // });
  }

  render() {
    const { loading } = this.state;

    return (
      <div>
        {this.state.loading === 1 ? (
          <Loading />
        ) : (
          <div>
            <Sidebar page="Dashboard" />
            <Topbar title="Dashboard" />
            <div></div>
          </div>
        )}
      </div>
    );
  }
}

/*
<div>
          <Sidebar page = "Dashboard" />
          <Topbar title = "Dashboard" />
          <div className="dashboard-grid grid-stack">
          </div>
        </div>
*/
export default Dashboard;
