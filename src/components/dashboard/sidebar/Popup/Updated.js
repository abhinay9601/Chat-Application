import React from 'react';
// import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';
import Check from '../../../../Images/icons/Check.png';

import './Updated.css';

const Updated = (props) => {
  return (
    <div className="popup-box">
      <div className="boxs">
        {/* <span className="close-icons" onClick={props.handleClose}>
          x
        </span> */}
        <b style={{display:"flex",justifyContent:"space-around"}}>
          <h3 style={{ position:"absolute",color: '#155724',marginLeft:"-306px", marginTop: '7px',fontSize:"1rem" }}>Updated Agent</h3>
          <img
            style={{ position:"absolute",backgroundColor: 'white', marginLeft:"410px", marginTop:"7px" }}
            src={Check}
            width="20px"
            height="20px"
            alt="..."
          ></img>
        </b>
      </div>
    </div>
  );
};
export default Updated;
