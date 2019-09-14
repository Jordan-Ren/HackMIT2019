import React, { Component } from 'react';
import Map from './Map';
import AppBar from './AppBar';

const home = {
   backgroundColor: "#a1b8ff",
};
export default class Home extends Component {
    render() {
       return (
          <div style={home}>
            <AppBar />
            <Map />
          </div>
       )
    }
}
