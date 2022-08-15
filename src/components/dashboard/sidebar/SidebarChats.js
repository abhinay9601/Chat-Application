import Search from "./Search";
import bootstrap from "../../../Images/icons/bootstrap.svg";
import pic from "../../../Images/7.jpg";
import "./SidebarChart.css";
// import ChatDirect from "../../../ChatDirect";
const SidebarChats = ({
  chatDirect,
  chatDefault,
  chatEmpty,
  chatGroup,
  setChatDirect,
  setChatDefault,
  setChatEmpty,
  setChatGroup,
  setup,
  pipeline,
  setSetup,
  setPipeline,
  chat,
}) => {
  const chatDirectHandler = () => {
    setSetup(false);
    setPipeline(false);
    setChatDirect(true);
    setChatDefault(false);
    setChatEmpty(false);
    setChatGroup(false);
  };
  const chatGroupHandler = () => {
    setSetup(false);
    setPipeline(false);
    setChatDirect(false);
    setChatDefault(false);
    setChatEmpty(false);
    setChatGroup(true);
  };
  const chatEmptyHandler = () => {
    setChatDirect(false);
    setChatDefault(false);
    setChatEmpty(true);
    setChatGroup(false);
    setSetup(false);
    setPipeline(false);
  };
  return (
    <div
      className="body fullwidth"
      style={{
        backgroundColor: "#ebf1f7",
        width: "30vw",
        fontFamily: "Roboto",
      }}
    >
      <div
        style={{ backgroundColor: "#ebf1f7", width: "30vw" }}
        class="d-flex flex-column h-100 position-relative fullwidth "
      >
        <div style={{ width: "30vw" }} class="hide-scrollbar">
          <div
            style={{
              backgroundColor: "#ebf1f7",
              overflow: "scroll",
              width: "30vw",
              height: "90vh",
            }}
            class="container py-6 scroll setwidth setheight"
          >
            {/* <!-- Title --> */}
            <div
              style={{
                backgroundColor: "#ebf1f7",
                color: "black",
                width: "30vw",
              }}
              class="mb-8 pt-2 pb-2"
            >
              <h2
                style={{
                  color: "#293951",
                  textAlign: "left",
                  font: "26px Roboto",
                }}
                class="fw-bold m-0"
              >
                Chats
              </h2>
            </div>

            {/* <!-- Search --> */}
            <div
              style={{
                color: "#ebf1f7",
                marginLeft: "1px",
                width: "30vw",
              }}
              class="mb-0 w-100"
            >
              {/* @@include("../components/search.html") */}
              <Search chatDirect={chatDirect} ></Search>
            </div>
            <nav class="navigation text-center navbar navbar-light hide-scrollbar">
              {/* <!-- Brand --> */}
              {/* <!-- Chats --> */}
              <div
                style={{
                  backgroundColor: "white",
                  color: "black",
                  // width: "30vw",
                  overflow: "scroll",
                  height: "auto",
                }}
                class="card-list scroll"
              >
                {/* <!-- Card --> */}
                <a
                  style={{
                    backgroundColor: "#ebf1f7",
                    textDecoration: "none",
                    paddingTop: "0",
                    paddingBottom: "0",
                    padding: "0",
                  }}
                  id="tab-chat-group"
                  data-bs-toggle="tab"
                  role="tab"
                  title="Chat Group"
                  href="#tab-chat-group"
                  class="card nav-link border-0 text-reset"
                  onClick={chatGroupHandler}
                >
                  <div
                    style={{
                      backgroundColor: "white",
                      color: "black",
                      textAlign: "left",
                      margin: "20px 0",
                      borderRadius: "10px",
                    }}
                    class="card-body"
                  >
                    <div class="row gx-5">
                      <div class="flex">
                        <div class="col-auto">
                          <div class="avatar avatar-online">
                            <img
                              style={{ position: "absolute" }}
                              src={pic}
                              alt="#"
                              class="avatar-img setimg setimg"
                            />
                          </div>
                        </div>

                        <div class="col">
                          <div class=" align-items-center mb-3">
                            <h5
                              style={{
                                color: "#293951",
                                font: "18px Roboto",
                                textDecoration: "none",
                                display: "inline",
                                marginLeft: "4.3rem",
                              }}
                              class="me-auto mb-0 fw-bold wid "
                            >
                              William Wright
                            </h5>
                            <span
                              style={{
                                color: "#bfccdf",
                                marginLeft: "90px",
                                font: "15.975px Roboto",
                              }}
                              class="text extra-small setmargin "
                            >
                              12:45 PM
                            </span>
                          </div>
                        </div>
                      </div>
                      <div class="d-flexs align-items-center">
                        <div
                          class="line-clamp me-auto marg "
                          style={{
                            color: "#95aac9",
                            font: "16px Roboto",
                            textDecoration: "none",
                            marginLeft: "72px",
                          }}
                        >
                          Hello! Yeah, I'm going to meet my friend of mine at
                          the ...
                        </div>

                        <div
                          style={{ borderRadius: "100px" }}
                          class="badge badge-circle bg-primary ms-3"
                        >
                          <span>3</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* </div> */}
                  {/* <!-- .card-body --> */}

                  <div
                    style={{
                      backgroundColor: "white",
                      color: "black",
                      display: "none",
                    }}
                    class="card-footer"
                  >
                    {/* <div class="row align-items-center gx-4">
                    <div class="col-auto">
                      <div class="avatar avatar-xs">
                        <img
                          class="avatar-img"
                          src={bootstrap}
                          alt="Bootstrap Community"
                        />
                      </div>
                    </div>

                    <div class="col">
                      <h6 class="mb-0">Bootstrap Community</h6>
                    </div>

                    <div class="col-auto">
                      <div class="avatar-group">
                        <div class="avatar avatar-xs">
                          <img
                            src="assets/img/avatars/12.jpg"
                            alt="#"
                            class="avatar-img"
                          />
                        </div>

                        <div class="avatar avatar-xs">
                          <img
                            src="assets/img/avatars/11.jpg"
                            alt="#"
                            class="avatar-img"
                          />
                        </div>

                        <div class="avatar avatar-xs">
                          <img
                            src="assets/img/avatars/9.jpg"
                            alt="#"
                            class="avatar-img"
                          />
                        </div>

                        <div class="avatar avatar-xs">
                          <span class="avatar-text">+5</span>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  </div>
                </a>
                {/* <!-- Card --> */}

                {/* <!-- Card --> */}
                <a
                  style={{
                    backgroundColor: "#ebf1f7",
                    textDecoration: "none",
                    paddingTop: "0",
                    paddingBottom: "0",
                    padding: "0",
                  }}
                  id="tab-chat-direct"
                  data-bs-toggle="tab"
                  role="tab"
                  title="Chat Group"
                  href="#tab-chat-direct"
                  class="card border-0 text-reset"
                  onClick={chatDirectHandler}
                >
                  <div
                    style={{
                      backgroundColor: "white",
                      color: "black",
                      textAlign: "left",
                      margin: "0px 0",
                      borderRadius: "10px",
                    }}
                    class="card-body"
                  >
                    <div class="row gx-5">
                      <div styles={{ display: "flex" }} class="flex">
                        <div class="col-auto">
                          <div class="avatar avatar-online">
                            <img
                              style={{ position: "absolute" }}
                              src={pic}
                              alt="#"
                              class="avatar-img setimg"
                            />
                          </div>
                        </div>

                        <div class="col">
                          <div class=" align-items-center mb-3">
                            <h5
                              style={{
                                color: "#293951",
                                font: "18px Roboto",
                                textDecoration: "none",
                                display: "inline",
                                marginLeft: "4.3rem",
                              }}
                              class="me-auto mb-0 fw-bold name"
                            >
                              William Wright
                            </h5>
                            <div
                              classname="setMargins"
                              class="text extra-small setMargins"
                              style={{
                                color: "#bfccdf",
                                margin: "-18px 0px 0px 270px",
                                font: "15.975px Roboto ",
                              }}
                            >
                              12:45 PM
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="d-flexs align-items-center">
                        <div
                          style={{
                            color: "#95aac9",
                            font: "16px Roboto",
                            textDecoration: "none",
                            marginLeft: "72px",
                          }}
                          class="line-clamp me-auto marg "
                        >
                          Hello! Yeah, I'm going to meet my friend of mine at
                          the ...
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!-- .card-body --> */}
                </a>
                {/* <!-- Card --> */}

                {/* <!-- Card --> */}
                <a
                  style={{
                    backgroundColor: "#ebf1f7",
                    textDecoration: "none",
                    paddingTop: "0",
                    paddingBottom: "0",
                    padding: "0",
                  }}
                  id="tab-chat-direct"
                  data-bs-toggle="tab"
                  role="tab"
                  title="Chat Direct"
                  href="#tab-chat-direct"
                  class="card border-0 text-reset"
                  onClick={chatDirectHandler}
                >
                  <div
                    style={{
                      backgroundColor: "white",
                      color: "black",
                      textAlign: "left",
                      margin: "20px 0",
                      borderRadius: "10px",
                    }}
                    class="card-body"
                  >
                    <div class="row gx-5">
                      <div styles={{ display: "flex" }} class="flex">
                        <div class="col-auto">
                          <div class="avatar avatar-online">
                            <img
                              style={{ position: "absolute" }}
                              src={pic}
                              alt="#"
                              class="avatar-img setimg"
                            />
                          </div>
                        </div>

                        <div class="col">
                          <div class=" align-items-center mb-3">
                            <h5
                              style={{
                                color: "#293951",
                                font: "18px Roboto",
                                textDecoration: "none",
                                display: "inline",
                                marginLeft: "4.3rem",
                              }}
                              class="me-auto mb-0 fw-bold name"
                            >
                              Bill Marrow
                            </h5>
                            <span
                              style={{
                                color: "#bfccdf",
                                margin: "0px 0px 0px 120px",
                                font: "15.975px Roboto",
                              }}
                              class="text extra-small setmargin"
                            >
                              12:45 PM
                            </span>
                          </div>
                        </div>
                      </div>
                      <div class="d-flexs align-items-center">
                        <div
                          style={{
                            color: "#95aac9",
                            font: "16px Roboto",
                            textDecoration: "none",
                            marginLeft: "72px",
                          }}
                          class="line-clamp me-auto marg"
                        >
                          Hello! Yeah, I'm going to meet my friend of mine at
                          the ...
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!-- .card-body --> */}
                </a>
                {/* <!-- Card --> */}

                {/* <!-- Card --> */}
                <a
                  style={{
                    backgroundColor: "#ebf1f7",
                    textDecoration: "none",
                    paddingTop: "0",
                    paddingBottom: "0",
                    padding: "0px",
                  }}
                  id="tab-chat-empty"
                  data-bs-toggle="tab"
                  role="tab"
                  title="Chat empty"
                  href="#tab-chat-empty"
                  class="card border-0 text-reset"
                  onClick={chatEmptyHandler}
                >
                  <div
                    style={{
                      backgroundColor: "white",
                      color: "black",
                      textAlign: "left",
                      // margin:"8px 0",
                      borderRadius: "10px",
                    }}
                    class="card-body"
                  >
                    <div class="row gx-5">
                      <div styles={{ display: "flex" }} class="flex">
                        <div class="col-auto">
                          <div class="avatar avatar-online">
                            <img
                              style={{ position: "absolute" }}
                              src={pic}
                              alt="#"
                              class="avatar-img setimg"
                            />
                          </div>
                        </div>

                        <div class="col">
                          <div class=" align-items-center mb-3">
                            <h5
                              style={{
                                color: "#293951",
                                font: "18px Roboto",
                                textDecoration: "none",
                                display: "inline",
                                marginLeft: "4.3rem",
                              }}
                              class="me-auto mb-0 fw-bold name"
                            >
                              William Wright
                            </h5>
                            <span
                              style={{
                                color: "#bfccdf",
                                marginLeft: "85px",
                                font: "15.975px Roboto",
                              }}
                              class="text extra-small setmargin "
                            >
                              12:45 PM
                            </span>
                          </div>
                        </div>
                      </div>
                      <div class="d-flexs align-items-center">
                        <div
                          style={{
                            color: "#95aac9",
                            font: "16px Roboto",
                            textDecoration: "none",
                            marginLeft: "72px",
                          }}
                          class="line-clamp me-auto marg"
                        >
                          Hello! Yeah, I'm going to meet my friend of mine at
                          the ...
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!-- .card-body --> */}
                </a>

                {/* <!-- Card --> */}

                {/* <!-- Card --> */}
                {/* <a style={{backgroundColor: "#ebf1f7",textDecoration:"none"}} href="chat-direct.html" class="card border-0 text-reset"> */}
                {/* <div
                  class="card-body"
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    textAlign: "left",
                    margin:"10px 0",
                    borderRadius:"10px"
                  }}
                >
                  <div class="row gx-5">
                    <div class="col-auto">
                      <div class="avatar">
                        <img
                          src="assets/img/avatars/4.jpg"
                          alt="#"
                          class="avatar-img"
                        />
                      </div>
                    </div>

                    <div class="col">
                      <div class="d-flex align-items-center mb-3">
                        <h5 class="me-auto mb-0">Warren White</h5>
                        <span class="text-muted extra-small ms-2">
                          06:20 PM
                        </span>
                      </div>

                      <div class="d-flex align-items-center">
                        <div class="line-clamp me-auto">
                          Hello! Yeah, I'm going to meet my friend of mine at
                          the departments stores as soon as possible.
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                {/* <!-- .card-body --> */}
                {/* </a> */}
                {/* <!-- Card --> */}

                {/* <!-- Card --> */}
                {/* <a style={{backgroundColor:"rgb(240, 238, 238)",textDecoration:"none"}} href="chat-direct.html" class="card border-0 text-reset"> */}
                {/* <div
                  class="card-body"
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    textAlign: "left",
                    margin:"10px 0",
                    borderRadius:"10px"
                  }}
                >
                  <div class="row gx-5">
                    <div class="col-auto">
                      <div class="avatar">
                        <img
                          src="assets/img/avatars/11.jpg"
                          alt="#"
                          class="avatar-img"
                        />
                      </div>
                    </div>

                    <div class="col">
                      <div class="d-flex align-items-center mb-3">
                        <h5 class="me-auto mb-0">Mila White</h5>
                        <span class="text-muted extra-small ms-2">
                          04:40 PM
                        </span>
                      </div>

                      <div class="d-flex align-items-center">
                        <div class="line-clamp me-auto">
                          Hello! Yeah, I'm going to meet my friend of mine at
                          the departments stores as soon as possible.
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                {/* <!-- .card-body --> */}
                {/* </a> */}
                {/* <!-- Card --> */}

                {/* <!-- Card --> */}
                {/* <a style={{backgroundColor:"rgb(240, 238, 238)",textDecoration:"none"}} href="chat-direct.html" class="card border-0 text-reset"> */}
                {/* <div
                  class="card-body"
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    textAlign: "left",
                    margin:"10px 0",
                    borderRadius:"10px"
                  }}
                >
                  <div class="row gx-5">
                    <div class="col-auto">
                      <div class="avatar avatar-online">
                        <img
                          src="assets/img/avatars/5.jpg"
                          alt="#"
                          class="avatar-img"
                        />
                      </div>
                    </div>

                    <div class="col">
                      <div class="d-flex align-items-center mb-3">
                        <h5 class="me-auto mb-0">Damian Binder</h5>
                        <span class="text-muted extra-small ms-2">
                          02:45 PM
                        </span>
                      </div>

                      <div class="d-flex align-items-center">
                        <div class="line-clamp me-auto">
                          Hello! Yeah, I'm going to meet my friend of mine at
                          the departments stores as soon as possible.
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                {/* <!-- .card-body --> */}
                {/* </a> */}
                {/* <!-- Card --> */}

                {/* <!-- Card --> */}
                {/* <a style={{backgroundColor:"rgb(240, 238, 238)"}} href="chat-direct.html" class="card border-0 text-reset"> */}
                {/* <div
                  class="card-body"
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    textAlign: "left",
                    margin:"10px 0",
                    borderRadius:"10px"
                  }}
                >
                  <div class="row gx-5">
                    <div class="col-auto">
                      <div class="avatar avatar-online">
                        <span class="avatar-text">B</span>
                      </div>
                    </div>

                    <div class="col">
                      <div class="d-flex align-items-center mb-3">
                        <h5 class="me-auto mb-0">Bill Marrow</h5>
                        <span class="text-muted extra-small ms-2">
                          12:20 PM
                        </span>
                      </div>

                      <div class="d-flex align-items-center">
                        <div class="line-clamp me-auto">
                          Hello! Yeah, I'm going to meet my friend of mine at
                          the departments stores as soon as possible.
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                {/* <!-- .card-body --> */}
                {/* </a> */}
                {/* <!-- Card --> */}

                {/* <!-- Card --> */}
                {/* <a style={{backgroundColor:"rgb(240, 238, 238)"}} href="#" class="card border-0 text-reset"> */}
                {/* <div
                  class="card-body"
                  style={{ backgroundColor: "white", color: "black" }}
                >
                  <div class="row gx-5">
                    <div class="col-auto">
                      <div class="avatar avatar-online">
                        <span class="avatar-text">M</span>
                      </div>
                    </div>

                    <div class="col">
                      <div class="d-flex align-items-center mb-3">
                        <h5 class="me-auto mb-0">Marshall Wallaker</h5>
                        <span class="text-muted extra-small ms-2">
                          12:18 PM
                        </span>
                      </div>

                      <div class="d-flex align-items-center">
                        <div class="line-clamp me-auto">
                          Hello! Yeah, I'm going to meet my friend of mine at
                          the departments stores as soon as possible.
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                {/* <!-- .card-body --> */}
                {/* </a> */}
                {/* <!-- Card --> */}

                {/* <!-- Card --> */}
                {/* <a style={{backgroundColor:"rgb(240, 238, 238)"}} href="chat-direct.html" class="card border-0 text-reset"> */}
                {/* <div
                  class="card-body"
                  style={{ backgroundColor: "white", color: "black" }}
                >
                  <div class="row gx-5">
                    <div class="col-auto">
                      <div class="avatar">
                        <svg
                          class="avatar-img placeholder-img"
                          width="100%"
                          height="100%"
                          xmlns="http://www.w3.org/2000/svg"
                          role="img"
                          aria-label="Placeholder"
                          preserveAspectRatio="xMidYMid slice"
                          focusable="false"
                        >
                          <title>Placeholder</title>
                          <rect
                            width="100%"
                            height="100%"
                            fill="#868e96"
                          ></rect>
                        </svg>
                      </div>
                    </div>

                    <div class="col">
                      <div class="d-flex align-items-center mb-3">
                        <h5 class="placeholder-glow w-100 mb-0">
                          <span class="placeholder col-5"></span>
                        </h5>
                      </div>

                      <div class="placeholder-glow">
                        <span class="placeholder col-12"></span>
                        <span class="placeholder col-8"></span>
                      </div>
                    </div>
                  </div>
                </div> */}
                {/* <!-- .card-body --> */}
                {/* </a> */}
                {/* <!-- Card --> */}

                {/* <!-- Card --> */}
                {/* <a href="chat-direct.html" class="card border-0 text-reset"> */}
                {/* <div
                  class="card-body"
                  style={{ backgroundColor: "white", color: "black" }}
                >
                  <div class="row gx-5">
                    <div class="col-auto">
                      <div class="avatar">
                        <svg
                          class="avatar-img placeholder-img"
                          width="100%"
                          height="100%"
                          xmlns="http://www.w3.org/2000/svg"
                          role="img"
                          aria-label="Placeholder"
                          preserveAspectRatio="xMidYMid slice"
                          focusable="false"
                        >
                          <title>Placeholder</title>
                          <rect
                            width="100%"
                            height="100%"
                            fill="#868e96"
                          ></rect>
                        </svg>
                      </div>
                    </div>

                    <div class="col">
                      <div class="d-flex align-items-center mb-3">
                        <h5 class="placeholder-glow  w-100  mb-0">
                          <span class="placeholder col-5"></span>
                        </h5>
                      </div>

                      <div class="placeholder-glow">
                        <span class="placeholder col-12"></span>
                        <span class="placeholder col-8"></span>
                      </div>
                    </div>
                  </div>
                </div> */}
                {/* <!-- .card-body --> */}
                {/* </a> */}
                {/* <!-- Card --> */}
              </div>
              {/* <!-- Chats --> */}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SidebarChats;
