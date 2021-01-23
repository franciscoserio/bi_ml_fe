import React, {Component} from 'react';
import './Querying.css';
import API from '../../utils/callAPI';
import $ from 'jquery';
import Datatable from './Datatable'

class Datasource extends Component {

  constructor(props) {
    super(props);

    this.state = {
      queryColumns: [],
      queryData: [],
      query: [],
      error: 0
    };
    
  }

  getDatasources(query){

    this.props.getSelectedPredictionColumn("", "Select");
    $('.runQuery').css('display', 'none');
    $('.runQueryLoading').css('display', 'block');

    API.querying(this.props.dataSourceId, query)
      .then((res)=>{
        if (res.status != 401)
        {
          if (res.data["status"] == "success")
          {
            $('.runQuery').css('display', 'block');
            $('.runQueryLoading').css('display', 'none');

            this.setState({queryColumns: res["data"]["columns"]});
            this.setState({queryData: res["data"]["data"]});
            this.setState({query: query});
            this.setState({error: 1});
          }
          else
          {
            $('.runQuery').css('display', 'block');
            $('.runQueryLoading').css('display', 'none');
            $('.errorAlertQuerying').css('display', 'block');
            $('.errorAlertQuerying p').text(res.data["errors"][0]);
          }        
        }
        else
        {
          window.location = '/login';
          $('.runQuery').css('display', 'block');
          $('.runQueryLoading').css('display', 'none');
        }
      }).catch((e) => {
        $('.runQuery').css('display', 'block');
        $('.runQueryLoading').css('display', 'none');
        $('.errorAlertQuerying').css('display', 'block');
      })
  }

  handleOnClickRunQuery = (e) => {
    this.setState({error: 0});
    $('.errorAlertQuerying').css('display', 'none');
    $('#query').css('border-color', 'rgb(207, 207, 207)');

    var query = $('#query').val();

    if (query == '')
    {
      $('#query').css('border-color', 'red');
      $('.errorAlertQuerying p').text('Query input is empty :(');
      $('.errorAlertQuerying').css('display', 'block');
    }
    else
    {
      this.getDatasources(query);
    }
  }
  
  handleOnChangeSavedConnection = (e) => {
    
    this.props.getSelectedPredictionColumn(this.state.query, e.target.value);

  }

  render() {

    return <div className="queryingWrapper">
            <div className="row">
              <div className="col">
                <p className="title">QUERY</p>

                <div class="errorAlertQuerying alert alert-danger" role="alert">
                  <p></p>
                </div>
                
                <textarea class="form-control" id="query" rows="7" spellCheck="false"></textarea>

                <div class="queryButtonWrapper">
                  <button onClick={this.handleOnClickRunQuery} class="runQuery btn btn-success">Run</button>
                  <button class="runQueryLoading btn btn-success" disabled><div class="spinner-border spinner-border-sm"></div></button>
                </div>
              </div>
            </div>

            {this.state.error == 0 ?
              <div></div>
            :
            <div>
              <div className="row">
                <div className="col">
                  <p className="title">RESULT</p>
                  
                  <Datatable queryColumns = {this.state.queryColumns} queryData = {this.state.queryData} />
                  <br />

                </div>
              </div>

              <div className="row">
                <div className="col">
                  <p className="title">PREDICTION COLUMN</p>
                  
                  <select className="custom-select" id="selectPredictionColumn" onChange={this.handleOnChangeSavedConnection}>
                    <option defaultValue>Select</option>
                    {this.state.queryColumns.map((columns, index) => (
                        <option key={index} value={columns}>{columns}</option>
                    ))}
                  </select>

                </div>
              </div>

              <br />

            </div>
            }
           </div>;
  }
}

export default Datasource;