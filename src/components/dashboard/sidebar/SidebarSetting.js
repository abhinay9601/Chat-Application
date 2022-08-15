import Search from "./Search";
import user from "../../../Images/profile.jpeg";
import User from "../../../Images/profile.jpg";
import { useEffect, useState } from "react";
import Setup from "../sidebar/setting/Setup";

import "./SidebarSetting.css";
const SidebarSetting = ({
  chatDirect,
  chatDefault,
  chatEmpty,
  chatGroup,
  setChatDirect,
  setChatDefault,
  setChatEmpty,
  setChatGroup,
  setIsOpen,
  isOpen,
  setup,
  pipeline,
  setSetup,
  setPipeline,
  chat,
}) => {
  const setupHandler = () => {
    setChatDirect(false);
    setSetup(true);
    setPipeline(false);
    setChatDefault(false);
    setChatEmpty(false);
    setChatGroup(false);
  };
  const pipelineHandler = () => {
    setSetup(false);
    setPipeline(true);
    setChatDirect(false);
    setChatDefault(false);
    setChatEmpty(false);
    setChatGroup(false);
  };
  const [email, setEmail] = useState("ceo@eldermonk.com");
  const [contact, setContact] = useState("+189700027906");
  const [alternateContact, setAlternateContact] = useState("+1888200039");
  const [address, setAddress] = useState("Gilbert,Arizona,USA");
  const [department, setDepartments] = useState("General,IT,Field");
  console.log(email);
  useEffect(() => {
    localStorage.getItem("Email")
      ? setEmail(localStorage.getItem("Email"))
      : setEmail(email);
    localStorage.getItem("Contact")
      ? setContact(localStorage.getItem("Contact"))
      : setContact(contact);
    localStorage.getItem("AlternateContact")
      ? setAlternateContact(localStorage.getItem("AlternateContact"))
      : setContact(contact);
    localStorage.getItem("Address")
      ? setAddress(localStorage.getItem("Address"))
      : setAddress(address);
    localStorage.getItem("Department")
      ? setDepartments(localStorage.getItem("Department"))
      : setDepartments(department);
  }, [email, contact, alternateContact, address, department]);

  const emailHandler = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
    localStorage.setItem("Email", e.target.value);
  };
  const contactHandler = (e) => {
    setContact(e.target.value);
    localStorage.setItem("Contact", e.target.value);
  };
  const alternateContactHandler = (e) => {
    setAlternateContact(e.target.value);
    localStorage.setItem("AlternateContact", e.target.value);
  };
  const addressHandler = (e) => {
    setAddress(e.target.value);
    localStorage.setItem("Address", e.target.value);
  };
  const departmentHandler = (e) => {
    setDepartments(e.target.value);
    localStorage.setItem("Department", e.target.value);
  };

  return (
    <div
      class="scrollbars"
      style={{ backgroundColor: "#95aac9", fontStyle: "roboto !important" }}
    >
      <div
        style={{
          height: "90vh",
          backgroundColor: "#95aac9",
          color: "#000",
          width: "30vw",
        }}
        class="d-flex flex-column h-100"
      >
        <div
          class="hide-scrollbar scroll"
          style={{ backgroundColor: "#95aac9" }}
        >
          <div
            style={{ overflow: "scroll", height: "90vh" }}
            class="scrollbars container py-8"
          >
            {/* <!-- Title --> */}
            <div class="mb-8">
              <h2
                style={{ textAlign: "left", font: "26px Roboto" }}
                class="fw-bold text-dark  m-0"
              >
                Settings
              </h2>
            </div>

            {/* <!-- Search --> */}
            <div class="mb-3 mt-2">
              {/* @@include("../components/search.html") */}
              <Search></Search>
            </div>

            {/* <!-- Profile --> */}
            <div
              class="card border-0"
              style={{ color: "black", borderRadius: "10px" }}
            >
              <div class="card-body p-2">
                <div class="row align-items-center gx-6">
                  <div class="col-auto">
                    <div class="avatar">
                      <img
                        src={user}
                        style={{ marginLeft: "4px" }}
                        alt="#"
                        class="avatar-img"
                      />

                      <div
                        class="badge badge-circle bg-light border-outline position-absolute bottom-0 end-0"
                        style={{
                          position: "absolute",
                          top: "25px",
                          height: "35px",
                          backgroundColor: "white",
                          marginRight: "2px",
                        }}
                      >
                        {/* @@include("../../assets/img/icons/image.svg") */}
                        {/* <img src={user} alt="#" /> */}
                      </div>
                      <input
                        id="upload-profile-photo"
                        class="d-none"
                        type="file"
                      />
                      <label
                        class="stretched-label mb-0"
                        for="upload-profile-photo"
                      ></label>
                    </div>
                  </div>
                  <div class="col m-0 pt-0" style={{ textAlign: "left" }}>
                    <h5 class="pt-2">CEO Eldermonk</h5>
                    <p>ceo@eldermonk.com</p>
                  </div>
                  <div class="col-auto">
                    <a href="#" class="text-muted">
                      <div class="icon">
                        {/* @@include("../../assets/img/icons/log-out.svg") */}
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- Profile --> */}

            {/* Setup and Pipeline */}
            <div
              style={{
                marginTop: "1rem",
                backgroundColor: "#FFF",
                borderRadius: "10px",
              }}
            >
              <div
                class="accordion-header"
                style={{
                  padding: "1rem 0",
                  margin: "0rem 1rem",
                  borderBottom: "1px solid grey",
                }}
              >
                {/* <a
                  style={{
                    textDecoration: "none",
                    textAlign: "left",
                  }}
                  onClick={setupHandler}
                  href="#"
                  class="text-left   "
                >
                  <div style={{ color: "#000" }}>
                    <h5>Setup</h5>
                  
                  </div>
                </a> */}
                <div
                  class="accordion accordion-flush"
                  id="accordion-profile"
                  style={{ border: "none" }}
                >
                  <div class="accordion-item" style={{border:"0px"}}>
                    <div style={{border:"0px"}} class="accordion-header" id="accordion-profile-2">
                      <a
                        // onClick={setupHandler}
                        style={{ background: "none",border:"0px" }}
                        href="#"
                        class="accordion-button text-reset p-0 collapsed"
                        data-bs-toggle="collapse"
                        data-bs-target="#accordion-profile-body-2"
                        aria-expanded="false"
                        aria-controls="accordion-profile-body-2"
                      >
                        <div style={{ color: "#000" }}>
                          <h5>Setup</h5>
                        </div>
                      </a>
                    </div>

                    <div
                      id="accordion-profile-body-2"
                      class="accordion-collapse collapse"
                      aria-labelledby="accordion-profile-2"
                      data-parent="#accordion-profile"
                    >
                      <div class="accordion-body" style={{ color: "black",margin:"0px",marginTop:"10px",padding:"0px" }}>
<Setup></Setup>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="accordion-header" style={{ padding: "1rem 1rem" }}>
                <a
                  style={{ textDecoration: "none", textAlign: "left" }}
                  href="#"
                  class="text-left "
                  onClick={pipelineHandler}
                >
                  <div style={{ color: "#000" }}>
                    <h5>PipeLine</h5>
                    {/* <p></p> */}
                  </div>
                </a>
              </div>
            </div>
            {/* Setup and Pipeline */}

            {/* <!-- Account --> */}
            <div class="mt-8">
              <div class="d-flex align-items-center mb-2 mt-4 px-6">
                <small class="text-muted me-auto">Account</small>
              </div>

              <div class="card border-0" style={{ borderRadius: "10px" }}>
                <div class="card-body pb-1">
                  {/* <!-- Accordion --> */}
                  <div
                    class="accordion accordion-flush"
                    id="accordion-profile"
                    style={{ border: "none" }}
                  >
                    <div class="accordion-item">
                      <div class="accordion-header" id="accordion-profile-1 tab-settings">
                        <a
                          style={{ background: "none" }}
                          href="#"
                          class="accordion-button text-reset p-0 "
                          data-bs-toggle="collapse"
                          data-bs-target="#accordion-profile-body-1"
                          aria-expanded="false"
                          aria-controls="accordion-profile-body-1"
                        >
                          <div style={{ color: "#000" }}>
                            <h5>Profile settings</h5>
                            <p>Change your profile settings</p>
                          </div>
                        </a>
                      </div>

                      <div
                        id="accordion-profile-body-1"
                        class="accordion-collapse "
                        aria-labelledby="accordion-profile-1"
                        data-parent="#accordion-profile"
                      >
                        <div class="accordion-body" style={{ color: "black" }}>
                          <div
                            class="form-floating mb-6"
                            style={{
                              display: "flex",
                              justifyContent: "space-around",
                            }}
                          >
                            {/* <input
                              type="text"
                              class="form-control"
                              id="profile-name"
                              placeholder="Name"
                            />
                            <label for="profile-name">Name</label> */}
                            <div>
                              <img
                                src={User}
                                style={{
                                  borderRadius: "100px",
                                  display: "inline",
                                }}
                                width="55px"
                                height="55px"
                                alt="..."
                              ></img>
                            </div>
                            <div>
                              <h6 style={{ margin: "0px" }}>Elder Monk</h6>
                              <p style={{ margin: "0px", fontSize: ".8rem" }}>
                                Elder Monk Pvt.Ltd
                              </p>
                              <p style={{ margin: "0px", fontSize: ".8rem" }}>
                                client
                              </p>
                            </div>
                          </div>
                          <button
                            style={{
                              backgroundColor: "#2787f5",
                              borderRadius: "10px",
                              border: "0",
                              padding: "5px 7px",
                              color: "white",
                              margin: "10px 0",
                              marginLeft: "120px",
                            }}
                          >
                            Change Photo
                          </button>

                          <div class="form-floating mb-6">
                            {/* <input
                              type="email"
                              class="form-control"
                              id="profile-email"
                              placeholder="Email address"
                            />
                            <label for="profile-email">Email</label> */}
                            <div>
                              {/* <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  margin: "10px 0",
                                }}
                              >
                                <div
                                  style={{
                                    width: "12.5vw",
                                    padding: "10px 20px",
                                  }}
                                >
                                  Email:
                                </div>
                                <input
                                  style={{
                                    width: "25vw",
                                    padding: "10px 20px",
                                    border: "none",
                                    backgroundColor: "rgb(235, 241, 247)",
                                    borderRadius: "10px",
                                    font: "14px Roboto",
                                  }}
                                  type="email"
                                  placeholder={email}
                                  onChange={emailHandler}
                                ></input>
                              </div> */}
                                      <div class="form-floating">
                      <input
                        style={{
                          backgroundColor: '#ebf1f7',
                          border: 'none',
                          borderRadius: '8px',
                        }}
                        type="email"
                        class="form-control inputinput"
                        id="email"
                        placeholder="Email"
                        name="email"
                        value={email} 
                        onChange={emailHandler}
                      />
                      <label for="email">Email</label>
                    </div>
                  
                              {/* <div
                                style={{ display: "flex", margin: "10px 0" }}
                              >
                                <div
                                  style={{
                                    width: "12.5vw",
                                    padding: "10px 20px",
                                  }}
                                >
                                  Conatct:
                                </div>
                                <input
                                  style={{
                                    width: "25vw",
                                    padding: "10px 20px",
                                    border: "none",
                                    backgroundColor: "rgb(235, 241, 247)",
                                    borderRadius: "10px",
                                    font: "14px Roboto",
                                  }}
                                  type="number"
                                  placeholder={contact}
                                  onChange={contactHandler}
                                ></input>
                              </div> */}
                                          <div class="form-floating">
                      <input
                        style={{
                          backgroundColor: '#ebf1f7',
                          border: 'none',
                          borderRadius: '8px',
                        }}
                        type="text"
                        class="form-control inputinput"
                        id="Contact"
                        placeholder={contact}
                        name="Contact"
                        value={contact} 
                        onChange={contactHandler}
                      />
                      <label for="Contact">Contact</label>
                    </div>
                              {/* <div
                                style={{ display: "flex", margin: "10px 0" }}
                              >
                                <div
                                  style={{
                                    width: "12vw",
                                    padding: "10px 20px",
                                  }}
                                >
                                  Additional Contact:
                                </div>
                                <input
                                  style={{
                                    width: "25vw",
                                    padding: "10px 20px",
                                    border: "none",
                                    backgroundColor: "rgb(235, 241, 247)",
                                    borderRadius: "10px",
                                    font: "14px Roboto",
                                  }}
                                  type="number"
                                  placeholder={alternateContact}
                                  onChange={alternateContactHandler}
                                ></input>
                              </div> */}
                                          <div class="form-floating">
                      <input
                        style={{
                          backgroundColor: '#ebf1f7',
                          border: 'none',
                          borderRadius: '8px',
                        }}
                        type="email"
                        class="form-control inputinput"
                        id="alternateContact"
                        placeholder={alternateContact}
                        name="alternateContact"
                        value={alternateContact} 
                        onChange={alternateContactHandler}
                      />
                      <label for="alternateContact">Alternate Contact</label>
                    </div>
                              {/* <div
                                style={{ display: "flex", margin: "10px 0" }}
                              >
                                <div
                                  style={{
                                    width: "12.5vw",
                                    padding: "10px 20px",
                                  }}
                                >
                                  Address:
                                </div>
                                <input
                                  style={{
                                    width: "25vw",
                                    padding: "10px 20px",
                                    border: "none",
                                    backgroundColor: "rgb(235, 241, 247)",
                                    borderRadius: "10px",
                                    font: "14px Roboto",
                                  }}
                                  type="text"
                                  placeholder={address}
                                  onChange={addressHandler}
                                ></input>
                              </div> */}
                                          <div class="form-floating">
                      <input
                        style={{
                          backgroundColor: '#ebf1f7',
                          border: 'none',
                          borderRadius: '8px',
                        }}
                        type="text"
                        class="form-control inputinput"
                        id="address"
                        placeholder={address}
                        name="address"
                        value={address} 
                        onChange={addressHandler}
                      />
                      <label for="address">Address</label>
                    </div>
                              {/* <div
                                style={{ display: "flex", margin: "10px 0" }}
                              >
                                <div
                                  style={{ width: "12vw", padding: "10px 8px" }}
                                >
                                  Departments:
                                </div>
                                <input
                                  style={{
                                    width: "25vw",
                                    padding: "10px 20px",
                                    border: "none",
                                    backgroundColor: "rgb(235, 241, 247)",
                                    borderRadius: "10px",
                                    font: "14px Roboto",
                                  }}
                                  type="text"
                                  placeholder={department}
                                  onChange={departmentHandler}
                                ></input>
                              </div> */}
                                          <div class="form-floating">
                      <input
                        style={{
                          backgroundColor: '#ebf1f7',
                          border: 'none',
                          borderRadius: '8px',
                        }}
                        type="text"
                        class="form-control inputinput"
                        id="department"
                        placeholder={department}
                        name="department"
                        value={department} 
                        onChange={departmentHandler}
                      />
                      <label for="Department">Department</label>
                    </div>
                            </div>
                          </div>

                          <div class="form-floating mb-6">
                            {/* <input
                              class="form-control"
                              id="profile-phone"
                              type="text"
                              placeholder="Phone"
                            />
                            <label for="profile-phone">Phone</label> */}
                          </div>

                          <div class="form-floating mb-6 pb-2">
                            {/* <textarea
                              class="form-control"
                              placeholder="Bio"
                              id="profile-bio"
                              data-autosize="true"
                              style={{ minHeight: "120px" }}
                            ></textarea>
                            <label for="profile-bio">Bio</label> */}
                          </div>

                          <button
                            type="button"
                            class="btn btn-block btn-lg btn-primary w-100 pt-1"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- Account --> */}

            {/* <!-- Security -->/ */}
            <div class="mt-8" style={{ color: "#000" }}>
              <div class="d-flex align-items-center mt-4 mb-2 px-6">
                <small class="text-muted me-auto">Security</small>
              </div>

              <div class="card border-0" style={{ borderRadius: "10px" }}>
                <div class="card-body pb-1">
                  {/* <!-- Accordion --> */}
                  <div
                    class="accordion accordion-flush"
                    id="accordion-security"
                  >
                    <div class="accordion-item">
                      <div
                        class="accordion-header"
                        id="accordion-security-1"
                        style={{ border: "none" }}
                      >
                        <a
                          style={{ background: "none", textDecoration: "none" }}
                          href="#"
                          class="accordion-button text-reset collapsed p-0"
                          data-bs-toggle="collapse"
                          data-bs-target="#accordion-security-body-1"
                          aria-expanded="false"
                          aria-controls="accordion-security-body-1"
                        >
                          <div
                            style={{ color: "#000", textDecoration: "none" }}
                          >
                            <h5>Password</h5>
                            <p>Change your password</p>
                          </div>
                        </a>
                      </div>

                      <div
                        id="accordion-security-body-1"
                        class="accordion-collapse collapse"
                        aria-labelledby="accordion-security-1"
                        data-parent="#accordion-security"
                      >
                        <div class="accordion-body">
                          <form action="#" autocomplete="on">
                            <div class="form-floating mb-6">
                              <input
                                type="password"
                                class="form-control"
                                id="profile-current-password"
                                placeholder="Current Password"
                                autocomplete=""
                              />
                              <label for="profile-current-password">
                                Current Password
                              </label>
                            </div>

                            <div class="form-floating mb-6">
                              <input
                                type="password"
                                class="form-control"
                                id="profile-new-password"
                                placeholder="New password"
                                autocomplete=""
                              />
                              <label for="profile-new-password">
                                New password
                              </label>
                            </div>

                            <div class="form-floating mb-6">
                              <input
                                type="password"
                                class="form-control"
                                id="profile-verify-password"
                                placeholder="Verify Password"
                                autocomplete=""
                              />
                              <label for="profile-verify-password">
                                Verify Password
                              </label>
                            </div>
                          </form>
                          <button
                            type="button"
                            class="btn btn-block btn-lg btn-primary w-100"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- Security -->/ */}

            {/* <!-- Storage --> */}
            {/* <div class="mt-8">
              <div class="d-flex align-items-center my-4 px-6">
                <small class="text-muted me-auto">Storage</small>
                <div class="flex align-items-center text-muted">
                  <a href="#" class="text-muted small">
                    Clear storage
                  </a>
                  <div class="icon icon-xs"> */}
            {/* @@include("../../assets/img/icons/bar-chart-2.svg") */}
            {/* </div>
                </div>
              </div> */}

            {/* <div class="card border-0">
                <div class="card-body py-2">
                  {/* <!-- Accordion --> */}
            {/*                  <div class="accordion accordion-flush" id="accordion-storage">
                    <div class="accordion-item">
                      <div class="accordion-header" id="accordion-storage-1">
                        <a
                          href="#"
                          class="accordion-button text-reset collapsed"
                          data-bs-toggle="collapse"
                          data-bs-target="#accordion-storage-body-1"
                          aria-expanded="false"
                          aria-controls="accordion-storage-body-1"
                        >
                          <div>
                            <h5>Cache</h5>
                            <p>Maximum cache size</p>
                          </div>
                        </a>
                      </div>
                      <div
                        id="accordion-storage-body-1"
                        class="accordion-collapse collapse"
                        aria-labelledby="accordion-storage-1"
                        data-parent="#accordion-storage"
                      >
                        <div class="accordion-body">
                          <div class="row justify-content-between mb-4">
                            <div class="col-auto">
                              <small>2 GB</small>
                            </div>
                            <div class="col-auto">
                              <small>4 GB</small>
                            </div>
                            <div class="col-auto">
                              <small>6 GB</small>
                            </div>
                            <div class="col-auto">
                              <small>8 GB</small>
                            </div>
                          </div>
                          <input
                            type="range"
                            class="form-range"
                            min="1"
                            max="4"
                            step="1"
                            id="custom-range-1"
                          />
                        </div>
                      </div>
                    </div> */}

            {/* <div class="accordion-item">
                      <div class="accordion-header">
                        <div class="row align-items-center">
                          <div class="col">
                            <h5>Keep media</h5>
                            <p>Photos, videos and other files</p>
                          </div>
                          <div class="col-auto">
                            <div class="form-check form-switch">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                id="accordion-storage-check-1"
                              />
                              <label
                                class="form-check-label"
                                for="accordion-storage-check-1"
                              ></label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Storage --> */}

            {/* <!-- Notifications --> */}
            {/* <div class="mt-8">
              <div class="d-flex align-items-center my-4 px-6">
                <small class="text-muted me-auto">Notifications</small>
              </div>
              <!-- Accordion --> */}
            {/* <div class="card border-0">
                <div class="card-body py-2">
                  <div
                    class="accordion accordion-flush"
                    id="accordion-notifications"
                  >
                    <div class="accordion-item">
                      <div
                        class="accordion-header"
                        id="accordion-notifications-1"
                      >
                        <a
                          href="#"
                          class="accordion-button text-reset collapsed"
                          data-bs-toggle="collapse"
                          data-bs-target="#accordion-notifications-body-1"
                          aria-expanded="false"
                          aria-controls="accordion-notifications-body-1"
                        >
                          <div>
                            <h5>Message</h5>
                            <p>Set custom notifications for users</p>
                          </div>
                        </a>
                      </div>
                      <div
                        id="accordion-notifications-body-1"
                        class="accordion-collapse collapse"
                        aria-labelledby="accordion-notifications-1"
                        data-parent="#accordion-notifications"
                      >
                        <div class="accordion-body">
                          <div class="row align-items-center">
                            <div class="col">
                              <h5>Text</h5>
                              <p>Show text in notifications</p>
                            </div>
                            <div class="col-auto">
                              <div class="form-check form-switch">
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  id="accordion-notifications-check-1"
                                />
                                <label
                                  class="form-check-label"
                                  for="accordion-notifications-check-1"
                                ></label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="accordion-item"> */}
            {/* <div class="accordion-header">
                        <div class="row align-items-center">
                          <div class="col">
                            <h5>Sound</h5>
                            <p>Enable sound notifications</p>
                          </div>
                          <div class="col-auto">
                            <div class="form-check form-switch">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                id="accordion-notifications-check-3"
                              />
                              <label
                                class="form-check-label"
                                for="accordion-notifications-check-3"
                              ></label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="accordion-item"> */}
            {/* <div class="accordion-header">
                        <div class="row align-items-center">
                          <div class="col">
                            <h5>Browser notifications</h5>
                            <p>Enable browser notifications</p>
                          </div>
                          <div class="col-auto">
                            <div class="form-check form-switch">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                id="accordion-notifications-check-2"
                                checked
                              />
                              <label
                                class="form-check-label"
                                for="accordion-notifications-check-2"
                              ></label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            {/* <!-- Notifications --> */}

            {/* <!-- Devices --> */}
            {/* <div class="mt-8">
              <div class="d-flex align-items-center my-4 px-6">
                <small class="text-muted me-auto">Devices</small>
                <div class="flex align-items-center text-muted">
                  <a href="#" class="text-muted small">
                    End all sessions
                  </a>
                  <div class="icon icon-xs">
                    @@include("../../assets/img/icons/log-out.svg") */}
            {/* </div>
                </div>
              </div>
              <div class="card border-0">
                <div class="card-body py-3">
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                      <div class="row align-items-center">
                        <div class="col">
                          <h5>Windows ⋅ USA, Houston</h5>
                          <p>Today at 2:48 pm ⋅ Browser: Chrome</p>
                        </div>
                        <div class="col-auto">
                          <span class="text-primary extra-small">active</span>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="row align-items-center">
                        <div class="col">
                          <h5>iPhone ⋅ USA, Houston</h5>
                          <p>Yesterday at 2:48 pm ⋅ Browser: Chrome</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div> */}
            {/* <!-- Devices --> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default SidebarSetting;
