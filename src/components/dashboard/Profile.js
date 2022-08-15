import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Pic from '../../Images/7.jpg';
import mail from '../../Images/icons/mail.svg';
import phone from '../../Images/icons/phone-call.svg';
import cardHeader from '../../Images/icons/card-header.svg';
import user from '../../Images/profilePic.jpg';
import ArrowRight from "../../Images/icons/icons/arrow-left.svg"

const Profile = ({friends,setFriends,setUserProfile,chat, setChat,edit,notification,support,setting,setEdit,setNotificaton,setsupport,setSetting}) => {
  const navigate = useNavigate();
  const [userData, setuserData] = useState(
    JSON.parse(localStorage.getItem('userData'))
  );
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };
  const closeHandler=()=>{
    setUserProfile(false);
  }
const settingHandler=()=>{
  setChat(false);
  setSetting(true);
  setFriends(false);
  setEdit(false);
  setNotificaton(false);
  setsupport(false);
  setUserProfile(false);
}
  return (
    <div>
      <div
        // class="modal fade"
        style={{position:"absolute" ,left:"30vw",zIndex:"5"}}
        id="modal-profile"
        tabindex="-1"
        aria-labelledby="modal-profile"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered modal-fullscreen-xl-down">
          <div class="modal-content" style={{borderRadius:"10px"}}>
            {/* <!-- Modal body --> */}
            <div class="modal-body py-0">
              {/* <!-- Header --> */}
              <div
                class="profile modal-gx-n"
                style={{ margin: "0px", padding: "0px", }}
              >
                <div class="profile-img text-primary rounded-top-xl">
                  {/* @@include("../../assets/img/core/card-header.svg") */}
                  <img src={cardHeader} alt="..."></img>

                  <div class="position-absolute top-0 start-0 py-6 px-5">
                    <button
                    onClick={closeHandler}
                    style={{
                      backgroundColor:"transparent",
                      border:"0px",
                      paddingTop:"12px",
                    }}
                      type="button"
                      class="btn-back btn-close-white btn-close-arrow opacity-100"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
          <img src={ArrowRight} width={"50px"} height={"29px"} alt="..."></img>
                    </button>
                  </div>
                </div>

                <div
                  class="profile-body"
                  style={{
                    textAlign: "center",
                    position: "relative",
                    top: "-20px",
                  }}
                >
                  <div class="avatar avatar-xl">
                    <img
                      class="avatar-img"
                      src={user}
                      width={"63px"}
                      height={"61px"}
                      alt="#"
                    />
                  </div>

                  <h4 class="mb-1" style={{ font: "16px Roboto", textAlign:"center" }}>
                    {userData?.name}
                  </h4>
                  <p style={{ color: "#95aac9", font: "15px Roboto" }}>
                    Online
                  </p>
                </div>
              </div>
              {/* <!-- Header --> */}

              {/* <hr class="hr-bold modal-gx-n my-0" /> */}
              <hr clas="hr hr-bold modal-gx-n my-0" style={{background:"#95aac9", margin:"0px -16px", width:"498px", height:"16px"}}/>

              {/* <!-- List --> */}
              <ul class="list-group list-group-flush">
                {/* <li class="list-group-item">
                      <div class="row align-items-center gx-6">
                          <div class="col">
                              <h5>Location</h5>
                              <p>USA, Houston</p>
                          </div>

                          <div class="col-auto">
                              <div class="btn btn-sm btn-icon btn-dark">
                                  {/* @@include("../../assets/img/icons/globe.svg") */}
                {/* </div>
                          </div>
                      </div>
                  </li>  */}

                <li class="list-group-item">
                  <div class="row align-items-center gx-6">
                    <div class="col">
                      <h5 style={{ font: "15px Roboto" }}>E-mail</h5>
                      <p style={{ color: "#95aac9", font: "15px Roboto" }}>
                        {/* ceo@eldermonk.com */}
                        {userData.email}
                      </p>
                    </div>

                    <div class="col-auto">
                      <div class="btn btn-sm btn-icon btn-light">
                        {/* @@include("../../assets/img/icons/mail.svg") */}
                        <img src={mail} alt="..."></img>
                      </div>
                    </div>
                  </div>
                </li>

                <li class="list-group-item">
                  <div class="row align-items-center gx-6">
                    <div class="col">
                      <h5 style={{ font: "15px Roboto" }}>Phone</h5>
                      <p style={{ color: "#95aac9", font: "15px Roboto" }}>
                        {/* +189700027906 */}
                        {userData.phoneNo}
                      </p>
                    </div>

                    <div class="col-auto">
                      <div class="btn btn-sm btn-icon btn-light">
                        {/* @@include("../../assets/img/icons/phone-call.svg") */}
                        <img src={phone} alt="..."></img>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              {/* <!-- List  --> */}

              {/* <!-- List --> */}
              {/* <ul class="list-group list-group-flush">
                  <li class="list-group-item">
                      <div class="row align-items-center gx-6">
                          <div class="col">
                              <h5 style={{font:"20px Roboto"}}>Active status</h5>
                          </div>

                          <div class="col-auto">
                              <div class="form-check form-switch">
                                  <input class="form-check-input" type="checkbox" id="profile-status" checked />
                                  <label class="form-check-label" for="profile-status"></label>
                              </div>
                          </div>
                      </div>
                  </li>
              </ul> */}
              {/* <!-- List --> */}

              {/* <hr class="hr-bold modal-gx-n my-0" /> */}
              <hr clas="hr hr-bold modal-gx-n my-0" style={{background:"#95aac9", margin:"0px -16px", width:"498px", height:"16px"}}/>

              {/* <!-- List --> */}
              <ul class="list-group list-group-flush">
                <li
                  class="list-group-item"
                  mt-4
                  mb-4
                  style={{ paddingTop: "14px", paddingBottom: "14px" }}
                >
                  <a
                    style={{ textDecoration: "none",font: "15px Roboto" }}
                    href="#tab-setting"
                    class="text-reset"
                    data-theme-toggle="tab"
                    title="Settings"
                    onClick={settingHandler}
                    data-bs-dismiss="modal"
                  >
                    <p style={{color:"#95aac9",font: "15px Roboto", marginBottom:"4px"}}>Settings</p>
                  </a>
                </li>
                <hr clas="hr hr-bold modal-gx-n my-0" style={{background:"#95aac9", margin:"0px -16px", width:"498px", height:"16px"}}/>

                <li
                  class="list-group-item"
                  mt-4
                  mb-4
                  style={{ paddingTop: "14px", paddingBottom: "14px" }}
                >
                  {/* <Link
                    to="/"
                    style={{ textDecoration: 'none', font: '20px Roboto' }}
                    class="text-danger"
                  >
                    Logout
                  </Link> */}
                  <button
                    style={{
                      textAlign: "left",
                      textDecoration: "none",
                      font: "15px Roboto",
                      border: "none",
                      background: "none",
                      padding:"0px",
                    }}
                    class="text-danger"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
              {/* <!-- List --> */}
            </div>
            {/* <!-- Modal body --> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
