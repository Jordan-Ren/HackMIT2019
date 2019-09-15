import React from 'react';
import style from './Marker.css';

const Marker = (props) => {
    const { color, name, id } = props;
    return (
      <div className={style.marker}
        style={{ backgroundColor: color, cursor: 'pointer'}}
        title={name}
      />
    );
  };

  export default Marker;