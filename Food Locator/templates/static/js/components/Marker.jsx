import React from 'react';
import style from './Marker.css';
import axios from 'axios';
import { red } from '@material-ui/core/colors';

const Marker = (props) => {
    const {color, name, id } = props;
    // let locationInfo = '';
    
    // function handleClick() {
    //   alert(name)
    // }
  
  //   // function renderColor() {
  // //  { posted_data: 'example' })
  //   async function getData() {
  //     try {
  //       return await axios.get('http://127.0.0.1:5000/list?location='+name)
  //     } catch (e) {
  //       console.log(`Axios request failed: ${e}`);
  //     }
  //   }

    // if (locationInfo.length > 0) {
    //   let color = "green";
    // } else {
    //   let color = "red";
    // }
    // console.log(color);
    // }

    // function handleClick() {
    //   renderColor()
    // }
    // console.log(name,locationInfo.response)
    let markerColor = "red";
    
    return (
      <div className={style.marker}
        style={{ backgroundColor: markerColor, cursor: 'pointer'}}
        title={name}
      />
    );
  };

  export default Marker;
