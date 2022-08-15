import Check from '../../../../Images/icons/Check.png';
import React from 'react';
// import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';
import './AgentAdded.css';

const AgentAdded = (props) => {
  return (
    <div className="popup-box">
      <div className="boxs" style={{background:"#d4edda",marginRight: '6px',marginLeft:"489px",marginTop:"634px"}}>
        {/* <span className="close-icons" onClick={props.handleClose}>
          x
        </span> */}
        <b  style={{display:"flex",justifyContent:"space-between"}}>
          {/* <div style={{display:"flex",justifyContent:"space-around"}}> */}
          <h4 style={{ color: '#155724', marginTop: '8px', marginLeft:"8px",fontSize:"1rem" }}>User account has been created</h4>
          <img
            style={{marginTop:"6px",marginRight: '7px' }}
            src={Check}
            width="20px"
            height="20px"
            alt="..."
          ></img>
          {/* </div> */}
        </b>
      </div>
    </div>
  );
};
export default AgentAdded;
