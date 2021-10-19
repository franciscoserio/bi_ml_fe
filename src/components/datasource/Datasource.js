import React, {Component} from 'react';
import './Datasource.css';
import API from '../../utils/callAPI';
import $ from 'jquery';

class Datasource extends Component {

  constructor(props) {
    super(props);

    this.state = {
      datasources: [],
      databases: [],
      savedConnectionHost: '',
      savedConnectionPort: '',
      savedConnectionDatabase: '',
      savedConnectionUser: '',
      savedConnectionPassword: ''
    };
  }
  
  getDatasources(){

    API.getDatasources()
      .then((res)=>{
        if (res.status !== 401)
        {
          this.setState({datasources: res["data"]["datasources"]});
        }
        else
        {
          window.location = '/login';
        }
      })
  }

  getDatabases(){

    API.getDatabases()
      .then((res)=>{
        if (res.status !== 401)
        {
          this.setState({databases: res["data"]["databases"]});
        }
        else
        {
          window.location = '/login';
        }
      })
  }
  
  handleOnChangeSavedConnection = (e) => {
    
    this.props.getSelectedDatasource(e.target.value);

    if (e.target.value !== 'Select')
    {
      for (var i = 0; i < this.state.datasources.length; i++)
      {
        if (this.state.datasources[i]["id"] == e.target.value)
        {
          this.setState({
            savedConnectionHost: this.state.datasources[i]["host"],
            savedConnectionPort: this.state.datasources[i]["port"],
            savedConnectionDatabase: this.state.datasources[i]["database"],
            savedConnectionUser: this.state.datasources[i]["username"],
            savedConnectionPassword: this.state.datasources[i]["password"]
          })

          var databaseId = '';

          for (var j = 0; j < this.state.databases.length; j++)
          {
            if (this.state.datasources[i]["sgbd"] == this.state.databases[j]["name"])
            {
              databaseId = this.state.databases[j]["id"]
            }
          }
          $('#sgbdSavedConnections').val(databaseId).change();
        }
      }
    }
    else
    {
      this.setState({
        savedConnectionHost: '',
        savedConnectionPort: '',
        savedConnectionDatabase: '',
        savedConnectionUser: '',
        savedConnectionPassword: '',
      })
      $('#sgbdSavedConnections').val("").change();
    }
  }

  // saved connections
  handleOnChangeSavedConnectionHost = (e) => {
    this.setState({
      savedConnectionHost: e.target.value
    })
  }

  handleOnChangeSavedConnectionPort = (e) => {
    this.setState({
      savedConnectionPort: e.target.value
    })
  }

  handleOnChangeSavedConnectionDatabase = (e) => {
    this.setState({
      savedConnectionDatabase: e.target.value
    })
  }

  handleOnChangeSavedConnectionUser = (e) => {
    this.setState({
      savedConnectionUser: e.target.value
    })
  }

  handleOnChangeSavedConnectionPassword = (e) => {
    this.setState({
      savedConnectionPassword: e.target.value
    })
  }

  // new connection
  // save connection
  handleOnClickSaveNewConnection = (e) => {
    var name = $('#nameNewConnection').val();
    var sgbd = $('#SgbdNewConnection').val();
    var host = $('#hostNewConnection').val();
    var port = $('#portNewConnection').val();
    var database = $('#databaseNewConnection').val();
    var user = $('#userNewConnection').val();
    var password = $('#passwordNewConnection').val();

    if (name == ''){ $('#nameNewConnection').css('border-color', 'red'); }
    else{ $('#nameNewConnection').css('border-color', 'rgb(207, 207, 207)'); $('.errorAlertNewConnection').css('display', 'block'); }

    if (sgbd == '' || sgbd == 'Database'){ $('#SgbdNewConnection').css('border-color', 'red'); $('.errorAlertNewConnection').css('display', 'block'); }
    else{ $('#SgbdNewConnection').css('border-color', 'rgb(207, 207, 207)'); }

    if (host == ''){ $('#hostNewConnection').css('border-color', 'red'); $('.errorAlertNewConnection').css('display', 'block'); }
    else{ $('#hostNewConnection').css('border-color', 'rgb(207, 207, 207)'); }

    if (port == ''){ $('#portNewConnection').css('border-color', 'red'); $('.errorAlertNewConnection').css('display', 'block'); }
    else{ $('#portNewConnection').css('border-color', 'rgb(207, 207, 207)'); }

    if (database == ''){ $('#databaseNewConnection').css('border-color', 'red'); $('.errorAlertNewConnection').css('display', 'block'); }
    else{ $('#databaseNewConnection').css('border-color', 'rgb(207, 207, 207)'); }

    if (user == ''){ $('#userNewConnection').css('border-color', 'red'); $('.errorAlertNewConnection').css('display', 'block'); }
    else{ $('#userNewConnection').css('border-color', 'rgb(207, 207, 207)'); }
    
    if (password == ''){ $('#passwordNewConnection').css('border-color', 'red'); $('.errorAlertNewConnection').css('display', 'block'); }
    else{ $('#passwordNewConnection').css('border-color', 'rgb(207, 207, 207)'); }

    if (name !== '' && sgbd !== 'Database' && host !== '' && port !== '' && database !== '' && user !== '' && password !== '')
    {
      $('.connectionSuccess').css('display', 'none');
      $('.connectionError').css('display', 'none');
      $('.errorAlertNewConnection').css('display', 'none');
      $('#saveDatasourceButton').css('display', 'none');
      $('#saveDatasourceButtonLoading').css('display', 'inline-block');

      API.addDatasource(name, database, host, password, port, user, sgbd)
      .then(response => {

        if (response["status"] == 201)
        {
          $('.successAlertNewConnection').css('display', 'block');
          $('#saveDatasourceButton').css('display', 'inline-block');
          $('#saveDatasourceButtonLoading').css('display', 'none');

          $('#nameNewConnection').val("");
          $('#SgbdNewConnection').val("Database");
          $('#hostNewConnection').val("");
          $('#portNewConnection').val("");
          $('#databaseNewConnection').val("");
          $('#userNewConnection').val("");
          $('#passwordNewConnection').val("");

          // get new connection
          this.getDatasources();
        }

      })
      .catch(error => {
        console.log(error);
        $('.apiErrorAlertNewConnection').css('display', 'block');
        $('#saveDatasourceButton').css('display', 'inline-block');
        $('#saveDatasourceButtonLoading').css('display', 'none');
      });
    }
    
  }
  
  // test connection
  handleOnClickSaveTestConnection = (e) => {
    $('.successAlertNewConnection').css('display', 'none');
    $('.apiErrorAlertNewConnection').css('display', 'none');

    var name = $('#nameNewConnection').val();
    var sgbd = $('#SgbdNewConnection').val();
    var host = $('#hostNewConnection').val();
    var port = $('#portNewConnection').val();
    var database = $('#databaseNewConnection').val();
    var user = $('#userNewConnection').val();
    var password = $('#passwordNewConnection').val();

    if (name == ''){ $('#nameNewConnection').css('border-color', 'red'); }
    else{ $('#nameNewConnection').css('border-color', 'rgb(207, 207, 207)'); $('.errorAlertNewConnection').css('display', 'block'); }

    if (sgbd == '' || sgbd == 'Database'){ $('#SgbdNewConnection').css('border-color', 'red'); $('.errorAlertNewConnection').css('display', 'block'); }
    else{ $('#SgbdNewConnection').css('border-color', 'rgb(207, 207, 207)'); }

    if (host == ''){ $('#hostNewConnection').css('border-color', 'red'); $('.errorAlertNewConnection').css('display', 'block'); }
    else{ $('#hostNewConnection').css('border-color', 'rgb(207, 207, 207)'); }

    if (port == ''){ $('#portNewConnection').css('border-color', 'red'); $('.errorAlertNewConnection').css('display', 'block'); }
    else{ $('#portNewConnection').css('border-color', 'rgb(207, 207, 207)'); }

    if (database == ''){ $('#databaseNewConnection').css('border-color', 'red'); $('.errorAlertNewConnection').css('display', 'block'); }
    else{ $('#databaseNewConnection').css('border-color', 'rgb(207, 207, 207)'); }

    if (user == ''){ $('#userNewConnection').css('border-color', 'red'); $('.errorAlertNewConnection').css('display', 'block'); }
    else{ $('#userNewConnection').css('border-color', 'rgb(207, 207, 207)'); }
    
    if (password == ''){ $('#passwordNewConnection').css('border-color', 'red'); $('.errorAlertNewConnection').css('display', 'block'); }
    else{ $('#passwordNewConnection').css('border-color', 'rgb(207, 207, 207)'); }

    if (name !== '' && sgbd !== 'Database' && host !== '' && port !== '' && database !== '' && user !== '' && password !== '')
    {
      $('.connectionSuccess').css('display', 'none');
      $('.connectionError').css('display', 'none');
      $('.errorAlertNewConnection').css('display', 'none');
      $('#testDatasourceButton').css('display', 'none');
      $('#testDatasourceButtonLoading').css('display', 'inline-block');

      API.testDatasource(name, database, host, password, port, user, sgbd)
      .then(response => {
        if (response["status"] == 200)
        {
          
          $('.connectionSuccess').css('display', 'none');
          $('.connectionError').css('display', 'none');
          $('#testDatasourceButton').css('display', 'inline-block');
          $('#testDatasourceButtonLoading').css('display', 'none');

          if (response["data"]["status"] == "success")
          {
            $('.connectionSuccess').css('display', 'inline-block');
          }
          else
          {
            $('.connectionError').css('display', 'inline-block');
          }
        }

      })
      .catch(error => {        
        $('#testDatasourceButton').css('display', 'inline-block');
        $('#testDatasourceButtonLoading').css('display', 'none');
      });
    }
    
    
  }

  componentWillMount(){
    this.getDatabases();
    this.getDatasources();
  }

  render() {
    
    return <div className="datasourceWrapper">
            <div className="row">
              <div className="col">

                {/*
                      SAVED CONNECTIONS
                */}

                <p className="title">SAVED CONNECTIONS</p>
                
                
                
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">Datasource</span>
                  </div>
                  <select className="custom-select" id="selectSavedConnections" onChange={this.handleOnChangeSavedConnection}>
                    <option defaultValue>Select</option>
                    {this.state.datasources.map((datasource, index) => (
                        <option key={index} value={datasource["id"]}>{datasource["name"]}</option>
                    ))}
                  </select>
                </div>

                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">SGBD</span>
                  </div>
                  <select className="custom-select" id="sgbdSavedConnections">
                    <option defaultValue value="">Database</option>
                    {this.state.databases.map((database, index) => (
                        <option key={index} value={database["id"]}>{database["name"]}</option>
                    ))}
                  </select>
                </div>

                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">Host</span>
                  </div>
                  <input placeholder="Host" value={this.state.savedConnectionHost} onChange={this.handleOnChangeSavedConnectionHost} type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                </div>

                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">Port</span>
                  </div>
                  <input placeholder="Port" value={this.state.savedConnectionPort} onChange={this.handleOnChangeSavedConnectionPort} type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                </div>

                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">Database</span>
                  </div>
                  <input placeholder="Database" value={this.state.savedConnectionDatabase} onChange={this.handleOnChangeSavedConnectionDatabase} type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                </div>

                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">User</span>
                  </div>
                  <input placeholder="User" value={this.state.savedConnectionUser} onChange={this.handleOnChangeSavedConnectionUser} type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                </div>

                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">Password</span>
                  </div>
                  <input placeholder="Password" value={this.state.savedConnectionPassword} onChange={this.handleOnChangeSavedConnectionPassword} type="password" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                </div>

              </div>
              <div className="col">
                
                {/*
                      NEW CONNECTION
                */}

                <p className="title">NEW CONNECTION</p>
                
                <div class="successAlertNewConnection alert alert-success" role="alert">
                  New data source created!
                </div>

                <div class="errorAlertNewConnection alert alert-danger" role="alert">
                  Some inputs are empty :(
                </div>
                
                <div class="apiErrorAlertNewConnection alert alert-danger" role="alert">
                  An error has occured :( Please try again
                </div>

                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">Name</span>
                  </div>
                  <input id="nameNewConnection" placeholder="Name" type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                </div>
                
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">SGBD</span>
                  </div>
                  <select className="custom-select" id="SgbdNewConnection">
                    <option defaultValue>Database</option>
                    {this.state.databases.map((database, index) => (
                        <option key={index} value={database["id"]}>{database["name"]}</option>
                    ))}
                  </select>
                </div> 

                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">Host</span>
                  </div>
                  <input id="hostNewConnection" placeholder="Host" type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                </div>

                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">Port</span>
                  </div>
                  <input id="portNewConnection" placeholder="Port" type="number" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                </div>

                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">Database</span>
                  </div>
                  <input id="databaseNewConnection" placeholder="Database" type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                </div>
                
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">User</span>
                  </div>
                  <input id="userNewConnection" placeholder="User" type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                </div>

                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">Password</span>
                  </div>
                  <input id="passwordNewConnection" placeholder="Password" type="password" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                </div>                

                <div class="datasourceButtonWrapper">
                  <button class="hiddenButton btn btn-success"></button>
                  <p class="connectionSuccess">Successful connection!</p>
                  <p class="connectionError">Connection error :(</p>
                  <button onClick={this.handleOnClickSaveNewConnection} id="saveDatasourceButton" class="saveDatasourceButton btn btn-success">Save</button>
                  <button id="saveDatasourceButtonLoading" class="saveDatasourceButton btn btn-success" disabled><div class="spinner-border spinner-border-sm"></div></button>
                  <button onClick={this.handleOnClickSaveTestConnection} id="testDatasourceButton" class="testDatasourceButton btn btn-warning">Test</button>
                  <button id="testDatasourceButtonLoading" class="saveDatasourceButton btn btn-warning" disabled><div class="spinner-border spinner-border-sm"></div></button>
                </div>

              </div>
            </div>
          </div>;
  }
}

export default Datasource;