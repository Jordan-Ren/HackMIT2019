import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { Container } from '@material-ui/core';

const mapStyles = {
  margin: "1%"
};

const mapBox = {
    width: '100%',
    height: '100%',
};

export class MapContainer extends Component {
  render() {
    return (
        <div style={mapBox}>
            <Map
                google={this.props.google}
                zoom={8}
                style={mapStyles}
                initialCenter={{ lat: 47.444, lng: -122.176}}
            />
        </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBM-5OwsOtr_tDubeq4tRizArA8pb93yo4'
})(MapContainer);
