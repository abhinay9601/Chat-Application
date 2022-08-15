import "bootstrap/dist/css/bootstrap.min.css";
import Invite from "./dashboard/Invite";
import MediaPreview from "./dashboard/MediaPreview";
import Navigation from "./dashboard/Navigation";
import Profile from "./dashboard/Profile";
import Sidebar from "./dashboard/Sidebar.js";
import UserProfile from "./dashboard/UserProfile";
import "./Dashboard.css";
import Navbar from "./dashboard/sidebar/Navbar";
import Chatbar from "./dashboard/Chatbar";
import { useState } from "react";
import EditAgent from "./dashboard/editAgent";
import AgentAdded from "./dashboard/sidebar/Popup/AgentAdded";
import Updated from "./dashboard/sidebar/Popup/Updated";

const Dashboard = () => {
  const [chat, setChat] = useState(true);
  const [edit, setEdit] = useState(false);
  const [notification, setNotificaton] = useState(false);
  const [support, setsupport] = useState(false);
  const [setting, setSetting] = useState(false);

  const [chatDirect, setChatDirect] = useState(false);
  const [chatGroup, setChatGroup] = useState(false);
  const [chatDefault, setChatDefault] = useState(true);
  const [chatEmpty, setChatEmpty] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const [setup, setSetup] = useState(false);
  const [pipeline, setPipeline] = useState(false);
const[agentAdded,setAgentAdded]=useState(false);
const[updated,setupdated]=useState(false);
const[invite, setInvite] =useState(false);
const[addAgent, setAddAgent] =useState(false);

const toggleAgent = () => {
  setAgentAdded(!isOpen);
};
const toggleInvite = () => {
  setInvite(!invite);
};
const toggleAddAgent=()=>{
  setAddAgent(!addAgent);
}
const [friends, setFriends] = useState(false);

const [clickSetting,setClickSetting]=useState(false);
const [userProfile ,setUserProfile]=useState(false);
console.log("navigation",clickSetting) 
return (
    <div style={{ backgroundColor: "white" }}>
      {userProfile&&<Profile friends={friends} setFriends={setFriends} setUserProfile={setUserProfile} chat={chat} setChat={setChat} 
       edit={edit} notification={notification} support={support} setting={setting} setEdit={setEdit}setNotificaton={setNotificaton} setsupport={setsupport} setSetting={setSetting}></Profile>}
      {isOpen && <EditAgent handleClose={togglePopup} setAgentAdded={setAgentAdded} ></EditAgent>}
      {agentAdded &&<AgentAdded handleClose={toggleAgent}></AgentAdded>}
      {invite&&<Updated handleClose={toggleInvite}></Updated>}
      {addAgent&&<Invite setAddAgent={setAddAgent} handleClose={toggleAddAgent} invite={invite} setInvite={setInvite}></Invite>}
      <Navbar setUserProfile={setUserProfile}></Navbar>
      {/* <!-- Layout --> */}
      <div class="layout overflow-hidden">
        {/* <!-- Navigation --> */}
        {/* @@include("partials/navigation/navigation.html") */}
        <Navigation friends={friends} setFriends={setFriends} chat={chat} setChat={setChat} 
        clickSetting={clickSetting} edit={edit} notification={notification} support={support} setting={setting} setEdit={setEdit}setNotificaton={setNotificaton} setsupport={setsupport} setSetting={setSetting}
        ></Navigation>

        {/* <!-- Navigation --> */}

        {/* <!-- Sidebar --> */}
        {/* @@include("partials/sidebar/sidebar.html") */}
        <Sidebar
          chatDirect={chatDirect}
          chatDefault={chatDefault}
          chatEmpty={chatEmpty}
          chatGroup={chatGroup}
          setChatDirect={setChatDirect}
          setChatDefault={setChatDefault}
          setChatEmpty={setChatEmpty}
          setChatGroup={setChatGroup}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          setup={setup}
          pipeline={pipeline}
          setSetup={setSetup}
          setPipeline={setPipeline}
          addAgent={addAgent}
          setAddAgent={setAddAgent}
          chat={friends}
          setting={setting}
                  ></Sidebar>
        {/* <!-- Sidebar --> */}

        {/* <!-- Chat --> */}
        <Chatbar
          chatDirect={chatDirect}
          chatDefault={chatDefault}
          chatEmpty={chatEmpty}
          chatGroup={chatGroup}
          setChatDirect={setChatDirect}
          setChatDefault={setChatDefault}
          setChatEmpty={setChatEmpty}
          setChatGroup={setChatGroup}
          chat={chat}
          setup={setup}
          pipeline={pipeline}
        ></Chatbar>
        {/* <!-- Chat --> */}
      </div>
      {/* <!-- Layout --> */}

      {/* <!-- Modal: Invite --> */}
      {/* @@include("partials/modal/invite.html") */}
      {/* <Invite></Invite> */}
      {/* <!-- Modal: Profile --> */}
      {/* @@include("partials/modal/profile.html") */}
      {/* <Profile></Profile> */}
      {/* <!-- Modal: User profile --> */}
      {/* @@include("partials/modal/user-profile.html") */}
      <UserProfile></UserProfile>
      {/* <!-- Modal: Media Preview --> */}
      {/* @@include("partials/modal/media-preview.html") */}
      <MediaPreview></MediaPreview>
      {/* <!-- Scripts --> */}
      {/* @@include("partials/scripts/scripts.html") */}
    </div>
  );
};
export default Dashboard;
