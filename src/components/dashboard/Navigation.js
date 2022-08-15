import { useEffect, useState } from "react";
import Bell from "../../Images/icons/bell.svg";
import Edit from "../../Images/icons/edit-3.svg";
import Layout from "../../Images/icons/layout.svg";
import Message from "../../Images/icons/message-square.svg";
import Setting from "../../Images/icons/settings.svg";
import Users from "../../Images/icons/users.svg";
import X from "../../Images/icons/x.svg";
import Chatbar from "./Chatbar";
import "./Navigation.css";
// import "./navigation.css"

const Navigation = ({friends,setFriends, chat, setChat,clickSetting,edit,notification,support,setting,setEdit,setNotificaton,setsupport,setSetting}) => {
  

  console.log("Navigation",clickSetting)
  // useEffect(()=>{
  //   document.createElementById("click").click();
  // },[])
  const chatsHandler = () => {
    setChat(true);
    setSetting(false);
    setFriends(false);
    setEdit(false);
    setNotificaton(false);
    setsupport(false);
  };
  const friendsHandler = () => {
    setChat(false);
    setFriends(true);
    setEdit(false);
    setNotificaton(false);
    setsupport(false);
    setSetting(false);
  };
  const editHandler = () => {
    setChat(false);
    setFriends(false);
    setEdit(true);
    setNotificaton(false);
    setsupport(false);
    setSetting(false);
  };
  const notificationHandler = () => {
    setChat(false);
    setFriends(false);
    setEdit(false);
    setNotificaton(true);
    setsupport(false);
    setSetting(false);
  };
  const supportHandler = () => {
    setChat(false);
    setFriends(false);
    setEdit(false);
    setNotificaton(false);
    setsupport(true);
    setSetting(false);
  };
  const settingHandler = () => {
    setChat(false);
    setFriends(false);
    setEdit(false);
    setNotificaton(false);
    setsupport(false);
    setSetting(true);
  };
  // if(clickSetting)
  // setSetting(true);
  return (
    <div
      class="navigatio"
      style={{
        height: "90vh",
        backgroundColor: "white",
        display: "block",
        position: "sticky",
        top: "0",
        left: "0",
        bottom: "0",
        width:"60px"
      }}
    >
      <nav class="navigation d-flex flex-column text-center navbar navbar-light hide-scrollbar absolute">
        {/* <!-- Brand --> */}
        <a href="index.html" title="Messenger" class="d-none d-xl-block mb-6">
          {/* @@include("../../assets/img/brand/brand.svg") */}
          {/* <Bell></Bell> */}
          {/* <img src={Bell} alt="..." /> */}
        </a>

        {/* <!-- Nav items --> */}
        <ul
          style={{
            display: "flex",
            alignItems:"center",  
            justifyContent: "space-around",
            backgroundColor:"#ffffff",
          }}
          class="ulfix nav navbar-nav flex-row flex-xl-column flex-grow- justify-content-between justify-content-xl-center align-items-center w-100 py- py-lg-2 px-lg-1 navigatio"
          role="tablist"
        >
          {/* <!-- Invisible item to center nav vertically --> */}
          <li class="nav-item d-none d-xl-block invisible flex-xl-grow-1">
            <a class="nav-link py-0 py-lg-8" href="#" title="#">
              <div class="icon icon-xl">
                {/* @@include("../../assets/img/icons/x.svg") */}
                <img src={X} alt="..." />
              </div>
            </a>
          </li>

          {/* <!-- New chat --> */}
          <li class="nav-item width">
            <a
              onClick={editHandler}
              class="nav-link py-0 py-lg-8"
              id="tab-create-chat"
              href="#tab-content-create-chat"
              title="Create chat"
              data-bs-toggle="tab"
              role="tab"
            >
              {/* backgroundColor:edit?"blue":"white" */}
              <div
                style={{
                  // margin: "1.5rem 0",
                  padding: "0px",
                  width:"50px",
                  marginLeft:" auto",
                  marginRight:" auto",
                  borderRadius: "100px ",
                }}
                class="icon icon-xl active margin alitem "
              >
                {/* @@include("../../assets/img/icons/edit-3.svg") */}
                {edit && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#2787f5"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-edit-3"
                  >
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                  </svg>
                )}
                {!edit && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#000"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-edit-3"
                  >
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                  </svg>
                )}
              </div>
            </a>
          </li>

          {/* <!-- Friends --> */}
          <li class="nav-item width">
            <a
              onClick={friendsHandler}
              class="nav-link py-0 py-lg-8"
              id="tab-friends"
              href="#tab-content-friends"
              title="Friends"
              data-bs-toggle="tab"
              role="tab"
            >
              {/* backgroundColor:friends?"blue":"white", */}
              <div
                style={{
                  // margin: "1.5rem 0",
                  padding: "5px",
                  marginLeft:" auto",
                  marginRight:" auto",
                  borderRadius: "100px",
                }}
                class="icon icon-xl margin alitem"
              >
                {/* @@include("../../assets/img/icons/users.svg") */}

                {/* <img src={Users} alt="..." /> */}
                {friends && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#2787f5"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-users"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                )}
                {!friends && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#000"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-users"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                )}
              </div>
            </a>
          </li>

          {/* <!-- Chats --> */}
          <li class="nav-item width">
            <a
              onClick={chatsHandler}
              class="nav-link  py-0 py-lg-8"
              id="tab-chats click"
              href="#tab-content-chats"
              title="Chats"
              data-bs-toggle="tab"
              role="tab"
            >
              <div
                style={{
                  // margin: "1.5rem 0",
                  padding: "5px",
                  borderRadius: "100px ",
                  marginLeft:" auto",
                  marginRight:" auto",
                  // backgroundColor: chat ? "blue" : "white",
                }}
                class="icon icon-xl icon-badged margin alitem"
              >
                {/* @@include("../../assets/img/icons/message-square.svg") */}
                {/* <img src={Message} alt="..." /> */}
                {chat && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#2787f5"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-message-square"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                )}
                {!chat && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#000"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-message-square"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                )}
                {/* <div
                  style={{
                    position: "absolute",
                    width: "1rem",
                    height: "1rem",
                    textAlign: "center",
                    margin: "auto",
                    padding: "1px",
                    paddingTop: "3px",
                    borderRadius: "10px",
                    left: "34px",
                    top: "265px",
                    fontSize: ".6rem",
                  }}
                  class="badge badge-circle bg-primary"
                >
                  <span>4</span>
                </div>*/}
              </div>
            </a>
          </li>

          {/* <!-- Notification --> */}
          <li class="nav-item width">
            <a
              onClick={notificationHandler}
              class="nav-link py-0 py-lg-8"
              id="tab-notifications"
              href="#tab-content-notifications"
              title="Notifications"
              data-bs-toggle="tab"
              role="tab"
            >
              <div
                style={{
                  // margin: "1.5rem 0",
                  padding: "5px",
                  borderRadius: "100px ",
                  marginLeft:" auto",
                  marginRight:" auto",
                  // backgroundColor: notification ? "blue" : "white",
                }}
                class="icon icon-xl margin alitem"
              >
                {/* <img src={Bell} alt="..." /> */}
                {notification && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#2787f5"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-bell"
                  >
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                  </svg>
                )}
                {!notification && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#000"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-bell"
                  >
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                  </svg>
                )}
                {/* @@include("../../assets/img/icons/bell.svg") */}
              </div>
            </a>
          </li>

          {/* <!-- Support --> */}
          <li class="nav-item d-none d-xl-block flex-xl-grow-1">
            <a
              onClick={supportHandler}
              class="nav-link py-0 py-lg-8"
              id="tab-support"
              href="#tab-content-support"
              title="Support"
              data-bs-toggle="tab"
              role="tab"
            >
              <div
                style={{
                  // margin: "1.5rem 0",
                  padding: "5px",
                  borderRadius: "100px ",
                  marginLeft:" auto",
                  marginRight:" auto",
                  // backgroundColor: support ? "blue" : "white",
                }}
                class="icon icon-xl margin"
              >
                {/* @@include("../../assets/img/icons/layout.svg") */}
                {/* <img src={Layout} alt="..." /> */}
                {support && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#2787f5"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-layout"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                    ></rect>
                    <line x1="3" y1="9" x2="21" y2="9"></line>
                    <line x1="9" y1="21" x2="9" y2="9"></line>
                  </svg>
                )}
                {!support && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#000"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-layout"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                    ></rect>
                    <line x1="3" y1="9" x2="21" y2="9"></line>
                    <line x1="9" y1="21" x2="9" y2="9"></line>
                  </svg>
                )}
              </div>
            </a>
          </li>

          {/* <!-- Settings --> */}
          <li class="nav-item d-none d-xl-block">
            <a
              class="nav-link py-0 py-lg-8 active "
              id="tab-settings"
              href="#tab-content-settings"
              title="Settings"
              data-bs-toggle="tab"
              role="tab"
              onClick={settingHandler}
            >
              <div
                style={{
                  // margin: "1.5rem 0",
                  padding: "5px",
                  borderRadius: "100px ",
                  marginLeft:" auto",
                  marginRight:" auto",
                  // backgroundColor: setting ? "blue" : "white",
                }}
                class="icon icon-xl margin"
              >
                {/* @@include("../../assets/img/icons/settings.svg") */}

                {/* <img src={Setting} alt="..." /> */}
                {setting && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#2787f5"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-settings"
                  >
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                  </svg>
                )}
                {!setting && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#000"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-settings"
                  >
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                  </svg>
                )}
              </div>
            </a>
          </li>

          {/* <!-- Profile --> */}
          {/* <li class="nav-item">
            <a
              href="#"
              class="nav-link p-0 mt-lg-2"
              data-bs-toggle="modal"
              data-bs-target="#modal-profile"
            >
              <div class="avatar avatar-online mx-auto d-none d-xl-block">
                <img class="avatar-img" src="assets/img/avatars/1.jpg" alt="" />
              </div>
              <div class="avatar avatar-online avatar-xs d-xl-none">
                <img class="avatar-img" src="assets/img/avatars/1.jpg" alt="" />
              </div>
            </a>
          </li> */}
          {/* <Chatbar></Chatbar> */}
        </ul>
      </nav>
    </div>
  );
};
export default Navigation;
