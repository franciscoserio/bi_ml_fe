import React, { Component } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import Loading from "../../components/loading/Loading";
import detect_anomalies from "../../assets/detect_anomalies.jpg";
import predictions from "../../assets/predictions.jpg";
import pattern_recognition from "../../assets/pattern_recognition.jpg";
import "./Tools.css";

class Tools extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: 0,
    };
  }

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
            <Topbar title="Tools" />

            <div className="tools_page">
              <div className="tools_box">
                <img className="img_tool" src={detect_anomalies} width="230px" />
                <p>Detect anomalies</p>
              </div>

              <div className="tools_box">
                <img className="img_tool" src={pattern_recognition} width="230px" />
                <p>Pattern recognition</p>
              </div>

              <div className="tools_box" onClick={this.goPredictionPage}>
                <img className="img_tool" src={predictions} width="230px" />
                <p>Predictions</p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Tools;
