import React from 'react';
import style from './Marker.css';
import axios from 'axios';

const Marker = (props) => {
    const { color, name, id } = props;
    let locationInfo  = '';

    function renderColor() {
      axios({
        method: 'get',
        url: 'http://127.0.0.1:5000/list?location='+name,
      })
        .then(function (response) {
          console.log(response);
          locationInfo = response;
        });
    }

    function handleClick() {
      console.log("SWAG")
    }
    return (
      <div className={style.marker}
        style={{ backgroundColor: color, cursor: 'pointer'}}
        title={name}
        onClick={handleClick()}
      />
    );
  };

  export default Marker;
