import React, { useEffect, useState } from 'react';
import Friend from './Friend';
import i8 from '../../../Images/icons/8.jpg';
import axios from 'axios';
const SidebarAgent = ({
  chatDirect,
  chatDefault,
  chatEmpty,
  chatGroup,
  setChatDirect,
  setChatDefault,
  setChatEmpty,
  setChatGroup,
  setIsOpen,
  search,
  isManager,
}) => {
  const [listUser, setListUser] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/list-user`)
      .then(function (response) {
        console.log('list of users', response.data);
        setListUser(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const user2 = [
    {
      image: 'user',
      name: 'Danny Stansified',
      abbr: 'D',
      avatar: '',
      status: 'online',
      online: 'last seen a long time ago',
    },
    {
      image: '',
      name: 'Diwakar Mishra',
      abbr: 'D',
      avatar: '',
      status: 'online',
      online: 'avatar-online',
    },
  ];
  const user3 = [
    {
      image: 'i8',
      name: 'Elise Dennis',
      abbr: '',
      avatar: { i8 },
      status: 'online',
      online: 'avatar-online',
    },
  ];
  const user4 = [
    {
      image: '',
      name: 'Mishra Diwakar',
      abbr: 'M',
      avatar: '',
      status: 'Online',
      online: '',
    },
    {
      image: '',
      name: 'Mila White',
      abbr: 'M',
      avatar: '',
      status: 'online',
      online: 'last seen a long time ago',
    },
  ];
  const user5 = [
    {
      image: '',
      name: 'Rock',
      abbr: 'R',
      avatar: '',
      status: 'online',
      online: 'avatar-online',
    },
    {
      image: '',
      name: 'Rusher',
      abbr: 'R',
      avatar: '',
      status: 'online',
      online: 'avatar-online',
    },
  ];
  const user6 = [
    {
      image: '',
      name: 'Steve Watson',
      abbr: 'S',
      avatar: '',
      status: 'online',
      online: 'avatar-online',
    },
  ];
  const user7 = [
    {
      image: '',
      name: 'Teresa F Jean',
      abbr: 'T',
      avatar: '',
      status: 'online',
      online: 'last seen a long time ago',
    },
    {
      image: '',
      name: 'Tesla',
      abbr: 'T',
      avatar: '',
      status: 'online',
      online: 'avatar-online',
    },
  ];
  const user8 = [
    {
      image: '',
      name: 'Victor',
      abbr: 'V',
      avatar: '',
      status: 'online',
      online: 'last seen a long time ago',
    },
  ];

  return (
    <div>
      {/* <!-- Search --> */}

      {/* <!-- List --> */}
      {isManager && (
        <div class="card-list" id="agent-list">
          {/* <div
             style={{ textAlign: "left", marginLeft: "10px" }}
             class="my-2"
           >
             <small class="text-uppercase text-muted">B</small>
           </div> */}

          {/* @@loop("../components/friend.html", [
              name: "Elise Dennis",
   abbr: "",
   avatar: "assets/img/avatars/8.jpg",
   status: "online",
   online: "avatar-online
           ]) */}

          {/* section for display acc to searchbar */}
           {user8.map((val)=>(val.name.toLowerCase().includes(search.toLowerCase())&&search&&
             <Friend
               image={val.image}
               name={val.name}
               abbr={val.abbr}
               avatar={val.avatar}
               status={val.status}
               online={val.online}
             ></Friend>
           ))}
          {user2.map((val)=>(val.name.toLowerCase().includes(search.toLowerCase())&&search&&<Friend
                   image={val.image}
                   name={val.name}
                   abbr={val.abbr}
                   avatar={val.avatar}
                   status={val.status}
                   online={val.online}
                   setIsOpen={setIsOpen}
                   data={val}
                 
                 ></Friend>
             
))}
{user4.map((val)=>(val.name.toLowerCase().includes(search.toLowerCase())&&search&&<Friend
                   image={val.image}
                   name={val.name}
                   abbr={val.abbr}
                   avatar={val.avatar}
                   status={val.status}
                   online={val.online}
                   setIsOpen={setIsOpen}
                   data={val}
                 
                 ></Friend>
             
))}
{user5.map((val)=>(val.name.toLowerCase().includes(search.toLowerCase())&&search&&<Friend
                   image={val.image}
                   name={val.name}
                   abbr={val.abbr}
                   avatar={val.avatar}
                   status={val.status}
                   online={val.online}
                   setIsOpen={setIsOpen}
                   data={val}
                   ></Friend>
             
))}
{user6.map((val)=>(val.name.toLowerCase().includes(search.toLowerCase())&&search&&<Friend
                   image={val.image}
                   name={val.name}
                   abbr={val.abbr}
                   avatar={val.avatar}
                   status={val.status}
                   online={val.online}
                   setIsOpen={setIsOpen}
                   data={val}
                 
                 ></Friend>
             
))}
{user7.map((val)=>(val.name.toLowerCase().includes(search.toLowerCase())&&search&&<Friend
                   image={val.image}
                   name={val.name}
                   abbr={val.abbr}
                   avatar={val.avatar}
                   status={val.status}
                   online={val.online}
                   setIsOpen={setIsOpen}
                   data={val}
                   ></Friend>
             
))}
{listUser.map((val)=>(val.name.toLowerCase().includes(search.toLowerCase())&&search&&<Friend
                   image={val.image}
                   name={val.name}
                   abbr={val.abbr}
                   avatar={val.avatar}
                   status={val.status}
                   online={val.online}
                   setIsOpen={setIsOpen}
                   data={val}
                   ></Friend>
             
))} 

          {/* section for display acc to searchbar */}

          <div style={{ textAlign: 'left', marginLeft: '10px' }} class="my-2">
            {!search && <small class="text-uppercase text-muted">All</small>}
          </div>

          {/* @@loop("../components/friend.html", [
               
           ]) */}
          
          {/* <div
             class="my-2"
             style={{ textAlign: "left", marginLeft: "10px" }}
           >
             <small class="text-uppercase text-muted">E</small>
           </div> */}

          {/* @@loop("../components/friend.html", [
               {
           ]) */}

          {user2.map((val) => (
             <Friend
               image={val.image}
               name={val.name}
               abbr={val.abbr}
               avatar={val.avatar}
               status={val.status}
               online={val.online}
             ></Friend>
           ))}
           {user4.map((val) => (
             <Friend
               image={val.image}
               name={val.name}
               abbr={val.abbr}
               avatar={val.avatar}
               status={val.status}
               online={val.online}
             ></Friend>
           ))}
           {user5.map((val) => (
             <Friend
               image={val.image}
               name={val.name}
               abbr={val.abbr}
               avatar={val.avatar}
               status={val.status}
               online={val.online}
             ></Friend>
           ))}
           {user6.map((val) => (
             <Friend
               image={val.image}
               name={val.name}
               abbr={val.abbr}
               avatar={val.avatar}
               status={val.status}
               online={val.online}
             ></Friend>
           ))}
           {user7.map((val) => (
             <Friend
               image={val.image}
               name={val.name}
               abbr={val.abbr}
               avatar={val.avatar}
               status={val.status}
               online={val.online}
             ></Friend>
           ))}
           {user8.map((val) => (
             <Friend
               image={val.image}
               name={val.name}
               abbr={val.abbr}
               avatar={val.avatar}
               status={val.status}
               online={val.online}
             ></Friend>
           ))}
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
      )}
    </div>
  );
};
export default SidebarAgent;
