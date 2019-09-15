import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';

const SimpleMap = (props) => {
    const [center, setCenter] = useState({lat: 42.3736, lng: -71.1097});
    const [zoom, setZoom] = useState(13.5);
    return (
        <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCmCiCLWdXot8-AtYfPZCW9PgYDisvmov0' }}
          defaultCenter={center}
          defaultZoom={zoom}
        >
          <Marker
            lat={42.36742}
            lng={-71.11545}
            name="Corporal Burns Playground"
          />

          <Marker
            lat={42.36944}
            lng={-71.10784}
            name="Cooper Square Park"
          />

          <Marker
            lat={42.36153}
            lng={-71.1079}
            name="Dana Park"
          />

          <Marker
            lat={42.35803}
            lng={-71.1078}
            name="Old Morse Park"
          />

          <Marker
            lat={42.35645}
            lng={-71.10418}
            name="Fort Washington Park"
          />

          <Marker
            lat={42.36141}
            lng={-71.10149}
            name="University Park Commons"
          />

          <Marker
            lat={42.36849}
            lng={-71.09994}
            name="Sennott Park"
          />  

          <Marker
            lat={42.36486}
            lng={-71.09868}
            name="Clement Morgan Park"
          />

          <Marker
            lat={42.36615}
            lng={-71.0949}
            name="Green-Rose Heritage Park"
          />

          <Marker
            lat={42.37021}
            lng={-71.09174}
            name="Donnelly Field"
          />

        </GoogleMapReact>
      </div>
    );
}

export default SimpleMap;

// import React, { Component } from 'react';
// import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
// import { Container } from '@material-ui/core';

// const mapStyles = {
//   margin: "1%"
// };

// const AnyReactComponent = ({text}) => <div>{text}</div>;

// const mapBox = {
//     width: '100%',
//     height: '100%',
// };

// export class MapContainer extends Component {
//   render() {
//     return (
//         <div style={mapBox}>
//             <Map
//                 google={this.props.google}
//                 zoom={13.5}
//                 style={mapStyles}
//                 initialCenter={{ lat: 42.3736, lng: -71.1097}}
//             >
//             <AnyReactComponent

//             lat={42.3736}
//             lng={-71.1097}
//             text="My Marker"
//             />
//             </Map>
//         </div>
//     );
//   }
// }

// export default GoogleApiWrapper({
//   apiKey: 'AIzaSyBM-5OwsOtr_tDubeq4tRizArA8pb93yo4'
// })(MapContainer);
