import React, { useEffect, useState } from 'react';
import { isValidDateValue } from '@testing-library/user-event/dist/utils';
import userIcon from '../../../Images/icons/user-plus.svg';
import Friend from './Friend';
import Search from './Search';
import SidebarAgent from './SidebarAgent';
import user from '../../../Images/users.svg';
import i4 from '../../../Images/icons/4.jpg';
import i5 from '../../../Images/icons/5.jpg';
import i6 from '../../../Images/icons/6.jpg';
import i7 from '../../../Images/icons/7.jpg';
import i8 from '../../../Images/icons/8.jpg';
import i11 from '../../../Images/icons/11.jpg';
import './SidebarFriends.css';
import axios from 'axios';

const SidebarFriends = ({ setIsOpen, isOpen, addAgent, setAddAgent, chat }) => {
  const [listUser, setListUser] = useState([]);
console.log("sidebarfriends",chat)
  useEffect(() => {
    axios
      .get(`http://localhost:3000/list-user`)
      .then(function (response) {
        console.log('list of sidebar fireingd users', response.data);

        setListUser(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [isOpen]);
  console.log('list User', listUser);
  const user2 = [
    {
      image: 'user',
      name: 'Abc',
      abbr: 'D',
      avatar: '',
      status: 'online',
      online: 'last seen a long time ago',
    },
    {
      image: '',
      name: 'Anirudh Kumar',
      abbr: 'D',
      avatar: '',
      status: 'online',
      online: 'avatar-online',
    },
  ];
  const user4 = [
    {
      image: '',
      name: 'Ashtu',
      abbr: 'M',
      avatar: '',
      status: 'Online',
      online: '',
    },
    {
      image: '',
      name: 'Dev',
      abbr: 'M',
      avatar: '',
      status: 'online',
      online: 'last seen a long time ago',
    },
  ];
  const user5 = [
    {
      image: '',
      name: 'Dev',
      abbr: 'R',
      avatar: '',
      status: 'online',
      online: 'avatar-online',
    },
    {
      image: '',
      name: 'Jacons Mill',
      abbr: 'R',
      avatar: '',
      status: 'online',
      online: 'avatar-online',
    },
  ];
  const user6 = [
    {
      image: '',
      name: 'Mink',
      abbr: 'S',
      avatar: '',
      status: 'online',
      online: 'avatar-online',
    },
  ];
  const user7 = [
    {
      image: '',
      name: 'Sarubh',
      abbr: 'T',
      avatar: '',
      status: 'online',
      online: 'last seen a long time ago',
    },
    {
      image: '',
      name: 'Test',
      abbr: 'T',
      avatar: '',
      status: 'online',
      online: 'avatar-online',
    },
  ];
  const user8 = [
    {
      image: '',
      name: 'Yo-yo',
      abbr: 'V',
      avatar: '',
      status: 'online',
      online: 'last seen a long time ago',
    },
    {
      image: 'i8',
      name: 'Zachary L Duavall',
      abbr: 'Z',
      avatar: '',
      status: 'online',
      online: 'avatar-online',
    },
    {
      image: 'i8',
      name: 'Zak',
      abbr: 'Z',
      avatar: '',
      status: 'online',
      online: 'avatar-online',
    },
  ];

  const [agent, setAgent] = useState(true);
  const [manager, setManager] = useState(false);
  const AgentHandler = () => {
    setAgent(true);
    setManager(false);
  };
  const ManagerHandler = () => {
    setManager(true);
    setAgent(false);
  };

  const agentHandler = () => {
    setAddAgent(!addAgent);
  };

  const [search, setSearch] = useState('');

  return (
    <div
      className="body fullwidth"
      style={{ backgroundColor: "#ebf1f7", fontStyle: "Roboto", width: "30vw" }}
    >
      <div class="d-flex flex-column " style={{ background: "#ebf1f7" }}>
        <div class="hide-scrollbar">
          <div
            style={{
              width: "30vw",
              height: "90vh",
              overflow: "scroll",
              backgroundColor: "#ebf1f7",
            }}
            class="container py-8 scroll fullwidth"
          >
            {/* <!-- Title --> */}
            {/* <div class="mb-8 pt-2 pb-2">
              <h2
                style={{ color: "#293951", textAlign: "left", font: "26px Roboto" }}
                class="fw-bold m-1"
              >
                Agent
              </h2>
            </div>
            <div class="mb-8 pt-2 pb-2">
              <h2
                style={{ color: "#293951", textAlign: "left", font: "26px Roboto" }}
                class="fw-bold m-1"
              >
                Agent
             
              </h2>
            </div> */}
            {/* Agent or Manager Button */}
            <ul
              class="nav nav-pills nav-justified ml-4 pt-3 pb-3"
              role="tablist"
              style={{
                marginLeft: "16px",
                borderRadius: "10px",
                width: "26vw",
              }}
            >
              <li class="nav-item">
                <a
                  style={{
                    backgroundColor: agent ? "rgb(39, 135, 245)" : "#ffffff",
                    color: agent ? "white" : "rgb(39, 135, 245)",
                  }}
                  class="nav-link active"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseExample"
                  href="#collapseExample"
                  role="tab"
                  aria-controls="create-chat-info"
                  aria-selected="true"
                  onClick={AgentHandler}
                >
                  Agent
                </a>
              </li>

              <li
                class="nav-item"
                style={{ backgroundColor: "#ffffff", borderRadius: "10px" }}
              >
                <a
                  style={{
                    backgroundColor: manager ? "rgb(39, 135, 245)" : "#ffffff",
                    color: manager ? "white" : "rgb(39, 135, 245)",
                  }}
                  class="nav-link "
                  data-bs-toggle="collapse"
                  data-bs-target="#Agent"
                  href="#create-chat-members"
                  role="tab"
                  aria-controls="create-chat-members"
                  aria-selected="true"
                  onClick={ManagerHandler}
                >
                  Manager
                </a>
              </li>
            </ul>
            {/* <ul class="nav nav-pills nav-justified ml-4 pt-3 pb-3" role="tablist">
            <li class="nav-item">
              <a
                style={{
                  margin: "1rem",
                  padding: ".45rem 2.5rem",
                  backgroundColor: "#2787f5",
                  textAlign: "left",
                  font: "20px Roboto",
                  borderRadius: "6px",
                }}
                class="btn btn-primary"
                data-bs-toggle="collapse"
                href="#collapseExample"
                role="button"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                Agent
              </a>
              </li>
              <li class="nav-item">
              <a
                style={{
                  textAlign: "left",
                  padding: ".45rem 2.5rem",
                  backgroundColor: "#2787f5",
                  font: "20px Roboto",
                  borderRadius: "6px",
                }}
                class="btn btn-primary"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#Agent"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                Manager
              </a>
              </li>
            </ul> */}
            <div class="mb-3">
              {/* @@include("../components/search.html") */}
              <div style={{ marginLeft: "15px", width: "30vw" }}>
                <Search setSearch={setSearch} chat={chat}></Search>
              </div>

              {/* <!-- Invite button --> */}
              <div
                class="mt-3 setw"
                style={{
                  marginLeft: "16px",
                  borderRadius: "10px",
                  width: "26vw",
                }}
              >
                <a
                  // href="#modal"
                  onClick={agentHandler}
                  class="btn btn-lg btn-primary w-100 d-flex"
                  // data-bs-toggle="modal"
                  // data-bs-target="#modal-invite"
                  style={{
                    color: "#ffffff",
                    textAlign: "left",
                    font: "16px Roboto",
                    padding: "10px 20px",
                    backgroundColor: "#2787f5",
                    display: "flex",
                    marginLeft: "0",
                  }}
                >
                  Find Agent or Manager
                  <span
                    class="icon ms-auto"
                    style={{ color: "#ffffff", marginTop: "-22px" }}
                  >
                    <img src={user}></img>
                    {/* @@include("../../assets/img/icons/user-plus.svg") */}
                    {/* <img style={{top:'200px'}} src={userIcon} alt="..."></img> */}
                  </span>
                </a>
              </div>
            </div>
            {agent && (
              <div
                style={{ backgroundColor: "#ebf1f7" }}
                class="collapse show"
                id="collapseExample"
              >
                <div
                  style={{ backgroundColor: "#ebf1f7", border: "0px" }}
                  class="card card-body show"
                >
                  {/* <!-- Search --> */}

                  {/* <!-- List --> */}
                  <div
                    style={{ backgroundColour: "#2787f5" }}
                    class="card-list"
                  >
                    {/* section for display acc to searchbar */}
                    {/* {listUser.map(
                      (val) =>
                        val.name.includes(search) &&
                        search && (
                          <Friend
                            image={val.image}
                            name={val.name}
                            abbr={val.name.substr(0, 1).toUpperCase()}
                            avatar={val.avatar}
                            status="Online"
                            online="Online"
                            setIsOpen={setIsOpen}
                            isOpen={isOpen}
                          ></Friend>
                        )
                    )} */}
                    {/* {user4.map(
                    (val) =>
                      val.name.includes(search) &&
                      search && (
                        <Friend
                          image={val.image}
                          name={val.name}
                          abbr={val.abbr}
                          avatar={val.avatar}
                          status={val.status}
                          online={val.online}
                          setIsOpen={setIsOpen}
                          isOpen={isOpen}
                        ></Friend>
                      )
                  )}
                  {user5.map(
                    (val) =>
                      val.name.includes(search) &&
                      search && (
                        <Friend
                          image={val.image}
                          name={val.name}
                          abbr={val.abbr}
                          avatar={val.avatar}
                          status={val.status}
                          online={val.online}
                          setIsOpen={setIsOpen}
                          isOpen={isOpen}
                        ></Friend>
                      )
                  )}
                  {user6.map(
                    (val) =>
                      val.name.includes(search) &&
                      search && (
                        <Friend
                          image={val.image}
                          name={val.name}
                          abbr={val.abbr}
                          avatar={val.avatar}
                          status={val.status}
                          online={val.online}
                          setIsOpen={setIsOpen}
                          isOpen={isOpen}
                        ></Friend>
                      )
                  )}
                  {user7.map(
                    (val) =>
                      val.name.includes(search) &&
                      search && (
                        <Friend
                          image={val.image}
                          name={val.name}
                          abbr={val.abbr}
                          avatar={val.avatar}
                          status={val.status}
                          online={val.online}
                          setIsOpen={setIsOpen}
                          isOpen={isOpen}
                        ></Friend>
                      )
                  )}*/}
                    {listUser.map(
                      (val) =>
                        val.name.toLowerCase().includes(search.toLowerCase()) &&
                        search && (
                          <Friend
                            image={val.image}
                            name={val.name}
                            abbr={val.abbr}
                            avatar={val.avatar}
                            status={val.status}
                            online={val.online}
                            setIsOpen={setIsOpen}
                            isOpen={isOpen}
                          ></Friend>
                        )
                    )}

                    <div
                      style={{
                        marginTop: "-8px",
                        textAlign: "left",
                        marginLeft: "10px",
                      }}
                      // class="my-0"
                    >
                      {!search && (
                        <small class="text-uppercase text-muted">All</small>
                      )}
                    </div>
                    {/* section for display acc to searchbar */}

                    {/* @@loop("../components/friend.html", [
                  
              ]) */}
                    <div style={{ marginTop: "-6px" }}>
                      {listUser.map(
                        (val) =>
                          !search && (
                            <Friend
                              image={val.image}
                              name={val.name}
                              abbr={val.name.substr(0, 1).toUpperCase()}
                              avatar={val.avatar}
                              status={val.status}
                              online={val.online}
                              setIsOpen={setIsOpen}
                              data={val}
                            ></Friend>
                          )
                      )}
                    </div>
                    {/* <div
                class="my-2"
                style={{ textAlign: "left", marginLeft: "10px" }}
              >
                <small class="text-uppercase text-muted">E</small>
              </div> */}

                    {/* @@loop("../components/friend.html", [
                  {
              ]) */}

                    {/* {user3.map((val) => (
                <Friend
                  image={val.image}
                  name={val.name}
                  abbr={val.abbr}
                  avatar={val.avatar}
                  status={val.status}
                  online={val.online}
                ></Friend>
              ))} */}
                    <div
                      class="my-2"
                      style={{ textAlign: "left", marginLeft: "10px" }}
                    >
                      {!search && (
                        <small class="text-uppercase text-muted">M</small>
                      )}
                    </div>

                    {/* @@loop("../components/friend.html", [
                  
              ]) */}
                    {/* {user4.map(
                    (val) =>
                      !search && (
                        <Friend
                          image={val.image}
                          name={val.name}
                          abbr={val.abbr}
                          avatar={val.avatar}
                          status={val.status}
                          online={val.online}
                          setIsOpen={setIsOpen}
                          isOpen={isOpen}
                        data={val}
                        ></Friend>
                      )
                  )} */}
                    <div
                      class="my-2"
                      style={{ textAlign: "left", marginLeft: "10px" }}
                    >
                      {!search && (
                        <small class="text-uppercase text-muted">R</small>
                      )}
                    </div>

                    {/* @@loop("../components/friend.html", [
                 
              ]) */}
                    {/* {user5.map(
                    (val) =>
                      !search && (
                        <Friend
                          image={val.image}
                          name={val.name}
                          abbr={val.abbr}
                          avatar={val.avatar}
                          status={val.status}
                          online={val.online}
                          setIsOpen={setIsOpen}
                          isOpen={isOpen}
                        data={val}
                        ></Friend>
                      )
                  )} */}
                    <div
                      class="my-2"
                      style={{ textAlign: "left", marginLeft: "10px" }}
                    >
                      {!search && (
                        <small class="text-uppercase text-muted">S</small>
                      )}
                    </div>

                    {/* @@loop("../components/friend.html", [
                  
              ]) */}
                    {/* {user6.map(
                    (val) =>
                      !search && (
                        <Friend
                          image={val.image}
                          name={val.name}
                          abbr={val.abbr}
                          avatar={val.avatar}
                          status={val.status}
                          online={val.online}
                          setIsOpen={setIsOpen}
                          isOpen={isOpen}
                        data={val}

                        ></Friend>
                      )
                  )} */}
                    <div
                      class="my-2"
                      style={{ textAlign: "left", marginLeft: "10px" }}
                    >
                      {!search && (
                        <small class="text-uppercase text-muted">T</small>
                      )}
                    </div>
                    {/* {user7.map(
                    (val) =>
                      !search && (
                        <Friend
                          image={val.image}
                          name={val.name}
                          abbr={val.abbr}
                          avatar={val.avatar}
                          status={val.status}
                          online={val.online}
                          setIsOpen={setIsOpen}
                          isOpen={isOpen}
                        data={val}

                        ></Friend>
                      )
                  )} */}

                    <div
                      class="my-2"
                      style={{ textAlign: "left", marginLeft: "10px" }}
                    >
                      {!search && (
                        <small class="text-uppercase text-muted">V</small>
                      )}
                    </div>
                    {/* {user8.map(
                    (val) =>
                      !search && (
                        <Friend
                          image={val.image}
                          name={val.name}
                          abbr={val.abbr}
                          avatar={val.avatar}
                          status={val.status}
                          online={val.online}
                          setIsOpen={setIsOpen}
                          isOpen={isOpen}
                        data={val}

                        ></Friend>
                      )
                  )} */}
                  </div>
                </div>
              </div>
            )}
            <div class="collapse" id="Agent">
              <div
                style={{ backgroundColor: "#ebf1f7", border: "0px" }}
                class="card card-body"
              >
                <SidebarAgent
                  setIsOpen={setIsOpen}
                  isOpen={isOpen}
                  search={search}
                  isManager={manager}
                ></SidebarAgent>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SidebarFriends;
