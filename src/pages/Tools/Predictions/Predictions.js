import React, {Component} from 'react';
import Sidebar from '../../../components/sidebar/Sidebar'
import Topbar from '../../../components/topbar/Topbar'
import Loading from '../../../components/loading/Loading'
import Steps from '../../../components/steps/Steps'
import Datasource from '../../../components/datasource/Datasource'
import Querying from '../../../components/querying/Querying'
import API from '../../../utils/callAPI';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Predictions.css';
import $ from 'jquery';

class Predictions extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      loading: 0,
      chosenDatasource: "Select",
      query: "",
      predictionColumn: "Select"
    };
  }

  componentWillMount(){

  }

  render() {
    
    const handleClickNone = (e) => {
    }

    // steps
    const handleClickDatasource = (e) => {
      $(".queryingWrapper").fadeOut(200);
      $(".graphicWrapper").fadeOut(200);
      $(".confirmationWrapper").fadeOut(200);
      $(".datasourceWrapper").delay(200).fadeIn();
    }

    const handleClickQuerying = (e) => {
      $(".datasourceWrapper").fadeOut(200);
      $(".graphicWrapper").fadeOut(200);
      $(".confirmationWrapper").fadeOut(200);
      $(".queryingWrapper").delay(200).fadeIn();
    }

    const handleClickGraphic = (e) => {
      $(".datasourceWrapper").fadeOut(200);
      $(".queryingWrapper").fadeOut(200);
      $(".confirmationWrapper").fadeOut(200);
      $(".graphicWrapper").delay(200).fadeIn();
    }

    const handleClickConfirmation = (e) => {
      $(".datasourceWrapper").fadeOut(200);
      $(".graphicWrapper").fadeOut(200);
      $(".queryingWrapper").fadeOut(200);
      $(".confirmationWrapper").delay(200).fadeIn();
    }
    
    // datasource
    const handleClickSavedConnection = (datasource) => {
      this.setState({chosenDatasource: datasource});
    }

    // querying
    const handleClickPredictionColumn = (query, predictionColumn) => {
      this.setState({query: query});
      this.setState({predictionColumn: predictionColumn});
    }

    return (
        <div>
          {this.state.loading == 1 ?
          <Loading />
          :
          <div>
            <Sidebar page = "Tenants" />
            <Topbar title = "Tools - Predictions" />
            
            <div className="predictions_page">

              <div className="center_steps">
                <Steps onClick1 = {handleClickDatasource}
                       number = "1"
                       description = "Data source"
                       bar = "1"
                       numberColor = {this.state.chosenDatasource == "Select" ? "red" : "green" }
                       borderNumberColor = {this.state.chosenDatasource == "Select" ? "red" : "green" }
                       borderColorBar = {this.state.chosenDatasource == "Select" ? "red" : "green" }
                />

                {this.state.predictionColumn === "Select" ?
                  <Steps onClick1 = {this.state.chosenDatasource !== "Select" ? handleClickQuerying : handleClickNone }
                        number = "2"
                        description = "Querying"
                        bar = "1"
                        numberColor = {this.state.chosenDatasource !== "Select" ? "red" : "grey" }
                        borderNumberColor = {this.state.chosenDatasource !== "Select" ? "red" : "grey" }
                        borderColorBar = {this.state.chosenDatasource !== "Select" ? "red" : "grey" }
                  />
                  :
                  <Steps onClick1 = {this.state.chosenDatasource !== "Select" ? handleClickQuerying : handleClickNone }
                          number = "2"
                          description = "Querying"
                          bar = "1"
                          numberColor = "green"
                          borderNumberColor = "green"
                          borderColorBar = "green"
                  />}
                <Steps onClick1 = {this.state.predictionColumn !== "Select" ? handleClickGraphic : handleClickNone }
                       number = "3"
                       description = "Graphic"
                       bar = "1"
                       numberColor = {this.state.predictionColumn !== "Select" ? "red" : "grey" }
                       borderNumberColor = {this.state.predictionColumn !== "Select" ? "red" : "grey" }
                       borderColorBar = {this.state.predictionColumn !== "Select" ? "red" : "grey" }
                />

                <Steps onClick1={handleClickConfirmation} number = "4" description = "Confirmation" bar = "0" numberColor = "grey" borderNumberColor = "grey" borderColorBar = "grey" />
              </div>

              <div class="wrappers">
                <Datasource getSelectedDatasource={handleClickSavedConnection} />

                <Querying getSelectedPredictionColumn={handleClickPredictionColumn} dataSourceId = {this.state.chosenDatasource} />

                <div style={{display: "none"}} className="graphicWrapper">
                  graphic
                </div>

                <div style={{display: "none"}} className="confirmationWrapper">
                  confirmation
                </div>
              </div>

            </div>

          </div>}
        </div>
    )
  }
}

export default Predictions;