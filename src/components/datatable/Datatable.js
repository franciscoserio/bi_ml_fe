import React, {Component} from 'react';
import { MDBDataTableV5, MDBBadge } from 'mdbreact';
import './Datatable.css';

class Datatable extends Component {

    render() {

      var x = []

        this.props.devices.map((device, index) => (
            x.push({
                name: device["name"],
                created_at: device["created_at"],
                updated_at: device["updated_at"],
                latitude: device["latitude"],
                longitude: device["longitude"],
                status: device["status"] === "active" ?
                          <div className = "deviceListStatus"><div className = "greenSphere"></div><p className = "activeStatus">Active</p></div> :
                          <div className = "deviceListStatus"><div className = "redSphere"></div><p className = "inactiveStatus">Inactive</p></div>
            })
        ))

        const datatable = {
            columns: [
              {
                label: 'Name',
                field: 'name',
              },
              {
                label: 'Created At',
                field: 'created_at',
              },
              {
                label: 'Updated At',
                field: 'updated_at',
              },
              {
                label: 'Latitude',
                field: 'latitude',
              },
              {
                label: 'Longitude',
                field: 'longitude',
              },
              {
                label: 'Status',
                field: 'status',
              },
            ],
            rows: x
          };

      return <MDBDataTableV5 hover entriesOptions={[10, 20, 30]} entries={10} pagesAmount={4} data={datatable} searchTop searchBottom={false} />;
    }
  }
  
  export default Datatable;