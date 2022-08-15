import { useState } from "react";
import axios from "axios";
import AgentAdded from "./sidebar/Popup/AgentAdded";
import { Navigate, useNavigate } from "react-router-dom";
import ArrowRight from "../../Images/icons/icons/arrow-left.svg";

const Invite = (props) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNo, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [address, setAddress] = useState("");
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
      `http://localhost:3000/add-user`,
      {
        name,
        email,
        address,
        phoneNo,
        department,
      },
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );

    setIsOpen(true);
    setEmail("");
    setName("");
    setPhone("");
    setDepartment("");
    setAddress("");
    setTimeout(() => {
      setIsOpen(false);
      props.handleClose();
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="popup-box" style={{ zIndex: "5" }}>
      {isOpen && <AgentAdded />}
      <div className="box" style={{ borderRadius: "10px" }}>
        <span
          className="close-icon"
          onClick={props.handleClose}
          style={{ paddingLeft: "0px", paddingTop: "0px" }}
        >
          <img src={ArrowRight} width={"50px"} height={"29px"} alt="..."></img>
        </span>
        <b>
          <h3
            style={{
              textAlign: "center",
              color: "#293951",
              font: "18px Roboto",
              marginLeft:"20px"
            }}
          >Add new user
            {/* Dropdown */}
            <select
              style={{
                padding: "10px 10px",
                // padding:"20px 8px 7px",
                width: "10.6vw",
                borderRadius: "10px",
                border: "none",
                marginLeft:"10px",
                // padding: "6px 10px",
                // width: "25vw",
                // borderRadius: "10px",
                // border: "none",
              }}
            >
              <option>Role</option>
              <option value="Agent">Agent</option>
              <option value="Manager">Manager</option>
            </select>

            {/* <div class="dropdown">
            <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Dropdown button
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item" href="#">Agent</a>
              <a class="dropdown-item" href="#">Manager</a>
            </div>
          </div> */}
            {/* Dropdown End */}
          </h3>
          <p
            style={{
              textAlign: "center",
              color: "#95aac9",
              font: "16px Roboto",
            }}
          >
            Complete the field below and press submit to add a user
            <br />
            Required fields are designated with an *{" "}
          </p>
        </b>
        <form class="row gy-6" onSubmit={submitHandler}>
          <div class="col-12 pb-1">
            <label
              for="invite-email"
              class="form-label text-muted"
              style={{ color: "#bfccdf", font: "16px Roboto" }}
            >
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
            <label
              for="invite-email"
              class="form-label text-muted"
              style={{ color: "#bfccdf", font: "16px Roboto" }}
            >
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
          <div class="col-12 pb-1">
            <label
              for="invite-email"
              class="form-label text-muted"
              style={{ color: "#bfccdf", font: "16px Roboto" }}
            >
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
              placeholder="NA"
              onChange={phoneHandler}
            />
          </div>
          <div class="col-12 pb-1">
            <label
              for="invite-email"
              class="form-label text-muted"
              style={{ color: "#bfccdf", font: "16px Roboto" }}
            >
              Department
            </label>
            {/* <input
              value={department}
              type="department"
              class="form-control form-control-lg"
              style={{ font: '16px Roboto', borderRadius: '10px' }}
              id="invite-department"
              placeholder="Department"
              onChange={departmentHandler}
            /> */}
            <input
              style={{ display: "inline", width: "3vw" }}
              onChange={departmentHandler}
              type="checkbox"
              value={department}
            ></input>
            <label
              style={{
                font: "14px Roboto",
                display: "inline-block",
                width: "6vw",
                color: "#6c757d",
              }}
            >
              {" "}
              IT
            </label>
            <input
              style={{ display: "inline", width: "3vw" }}
              onChange={departmentHandler}
              type="checkbox"
              value={department}
            ></input>
            <label
              style={{
                font: "14px Roboto",
                display: "inline-block",
                width: "6vw",
                color: "#6c757d",
              }}
            >
              General
            </label>
            <input
              style={{ display: "inline", width: "3vw" }}
              onChange={departmentHandler}
              type="checkbox"
              value={department}
            ></input>
            <label
              style={{
                font: "14px Roboto",
                display: "inline-block",
                width: "6vw",
                color: "#6c757d",
              }}
            >
              Marketing
            </label>
          </div>

          <div class="col-12 pb-1">
            <label
              for="invite-address"
              class="form-label text-muted"
              style={{ color: "#bfccdf", font: "16px Roboto" }}
            >
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
          <button
            class="btn btn-primary btn-lg btn-block buttons"
            style={{
              font: "18px Roboto",
              borderRadius: "10px",
              marginTop: "10px",
              marginLeft: "auto",
              padding: "14px 18px",
              marginRight: "auto",
            }}
            // onClick={}
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
export default Invite;
