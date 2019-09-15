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
            lat={42.3736}
            lng={-71.1097}
            name="My Marker"
            color="blue"
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
