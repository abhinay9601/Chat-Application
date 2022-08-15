import React, { useState, useEffect } from 'react';
import './EditAjent.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Updated from './sidebar/Popup/Updated';
import ArrowRight from "../../Images/icons/icons/arrow-left.svg"


const EditAgent = (props) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState(localStorage.getItem('email'));
  const [name, setName] = useState(localStorage.getItem('name'));
  const [phoneNo, setPhone] = useState(localStorage.getItem('phoneNo'));
  const [department, setDepartment] = useState(
    localStorage.getItem('department')
  );
  const [address, setAddress] = useState(localStorage.getItem('address'));
  const [isOpen, setIsOpen] = useState(false);
  const emailHandler = (e) => {
    setEmail(e.target.value);
  };
  const nameHandler = (e) => {
    setName(e.target.value);
  };
  const phoneHandler = (e) => {
    setPhone(e.target.value);
  };
  const departmentHandler = (e) => {
    setDepartment(e.target.value);
  };
  const addressHandler = (e) => {
    setAddress(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    axios.post(
      `http://localhost:3000/add-user/${localStorage.getItem('editUserId')}`,
      {
        name,
        email,
        address,
        phoneNo,
        department,
      },
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
    );
    // .then(function (response) {
    //   console.log(response);
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
    setIsOpen(true);
    setEmail('');
    setName('');
    setPhone('');
    setDepartment('');
    setAddress('');
    setTimeout(() => {
      setIsOpen(false);
      localStorage.clear();
      props.handleClose();
      navigate('/dashboard');
    }, 1000);
  };

  const handleClosebox = () => {
    localStorage.clear();
    props.handleClose();
  };
  return (
    <div className="popup-box">
      {isOpen && <Updated />}
      <div className="box" style={{ borderRadius: "10px" }}>
        <span
          className="close-icon"
          onClick={handleClosebox}
          style={{ paddingLeft: "0px", paddingTop: "-2px" }}
        >
          <img src={ArrowRight} width={"50px"} height={"29px"} alt="..."></img>
        </span>
        <b>
          <h3
            style={{
              textAlign: "center",
              color: "#6c757d",
              font: "22px Roboto",
            }}
          >
            Edit User
          </h3>
        </b>
        {/* <hr clas="hr hr-bold modal-gx-n my-0" style={{background:"#95aac9", margin:"0px -20px", width:"502px", height:"16px"}}/> */}
        <hr
          className="hr hr-bold modal-gx-n my-6"
          style={{
            background: "#95aac9",
            margin: "7px 0px",
            marginLeft: "-20px",
            padding: "7px 0px",
            width: "109.5%",
            height: "16px",
            position: "relative",
            top: "0.8vh",
          }}
        />

        <hr
          className="hr hr-bold modal-gx-n my-6"
          style={{
            background: "#95aac9",
            margin: "6px 0px",
            marginLeft: "-20px",
            width: "109.5%",
            height: "16px",
            position: "absolute",
            top: "37.5vh",
          }}
        />

        <hr
          className="hr hr-bold modal-gx-n my-6"
          style={{
            background: "#95aac9",
            margin: "6px 0px",
            marginLeft: "-20px",
            width: "109.5%",
            height: "16px",
            position: "absolute",
            top: "63.5vh",
          }}
        />

        <hr
          className="hr hr-bold modal-gx-n my-6"
          style={{
            background: "#95aac9",
            margin: "6px 0px",
            marginLeft: "-20px",
            width: "109.5%",
            height: "16px",
            position: "absolute",
            top: "84.5vh",
          }}
        />

        <form class="row gy-6" onSubmit={submitHandler}>
          <div class="col-12 pb-1">
            <label for="invite-email" class="form-label text-muted">
              E-Mail
            </label>
            <input
              value={email}
              type="email"
              class="form-control form-control-lg"
              style={{
                font: "14px Roboto",
                borderRadius: "10px",
                padding: "14px 18px",
                background: "#ebf1f7",
              }}
              id="invite-email"
              placeholder="name@example.com"
              onChange={emailHandler}
            />
          </div>
          <div class="col-12 pb-1">
            <label for="invite-email" class="form-label text-muted">
              Full Name
            </label>
            <input
              value={name}
              type="name"
              class="form-control form-control-lg"
              style={{
                font: "14px Roboto",
                borderRadius: "10px",
                padding: "14px 18px",
                background: "#ebf1f7",
              }}
              id="invite-name"
              placeholder="Full Name"
              onChange={nameHandler}
            />
          </div>

          <div class="col-12 pb-1" style={{ marginTop: "10px" }}>
            <label for="invite-email" class="form-label text-muted">
              Phone
            </label>
            <input
              value={phoneNo}
              type="number"
              class="form-control form-control-lg"
              style={{
                font: "14px Roboto",
                borderRadius: "10px",
                padding: "14px 18px",
                background: "#ebf1f7",
              }}
              id="invite-phone"
              placeholder="1234567890"
              onChange={phoneHandler}
            />
          </div>
          <div class="col-12 pb-1">
            <label for="invite-email" class="form-label text-muted">
              Department
            </label>
            {/* <input
              value={department}
              onChange={departmentHandler}
              type="department"
              class="form-control form-control-lg"
              style={{ font: '16px Roboto', borderRadius: '10px' }}
              id="invite-department"
              placeholder="Department"
            /> */}
            <input
              style={{ display: "inline", width: "3vw" }}
              type="checkbox"
              value={department}
              onChange={departmentHandler}
            ></input>
            <label
              style={{
                display: "inline-block",
                width: "6vw",
                font: "14px Roboto",
              }}
            >
              {" "}
              IT
            </label>
            <input
              style={{ display: "inline", width: "3vw" }}
              type="checkbox"
              value={department}
              onChange={departmentHandler}
            ></input>
            <label
              style={{
                display: "inline-block",
                width: "6vw",
                font: "14px Roboto",
              }}
            >
              General
            </label>
            <input
              style={{ display: "inline", width: "3vw" }}
              type="checkbox"
              value={department}
              onChange={departmentHandler}
            ></input>
            <label
              style={{
                display: "inline-block",
                width: "6vw",
                font: "14px Roboto",
              }}
            >
              Marketing
            </label>
          </div>
          {/* <hr className='hr hr-bold modal-gx-n my-6' style={{background:"#95aac9", margin:"6px -20px", width:"120%", height:"16px"}}/> */}

          <div class="col-12 pb-1" style={{ marginTop: "20px" }}>
            <label for="invite-address" class="form-label text-muted">
              Address
            </label>
            <textarea
              value={address}
              class="form-control form-control-lg"
              style={{
                font: "14px Roboto",
                borderRadius: "10px",
                padding: "14px 18px",
                background: "#ebf1f7",
              }}
              id="invite-address"
              rows="3"
              placeholder="Address..."
              onChange={addressHandler}
            ></textarea>
          </div>
          {/* <hr className='hr hr-bold modal-gx-n my-6' style={{background:"#95aac9", margin:"6px -20px", width:"100%", height:"16px"}}/> */}
          <button
            class="btn btn-primary btn-lg btn-block buttons"
            style={{
              borderRadius: "10px",
              marginTop: "20px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
            // onClick={submitHandler}
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
      {/* <AgentAdded></AgentAdded> */}
    </div>
  );
};

export default EditAgent;