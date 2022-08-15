import "bootstrap/dist/css/bootstrap.css";
import Chatbar from "./Chatbar";
import SidebarChats from "./sidebar/SidebarChats";
import SidebarCreateChat from "./sidebar/SidebarCreateChat";
import SidebarFriends from "./sidebar/SidebarFriends";
import SidebarNotifications from "./sidebar/SidebarNotifications";
import SidebarSetting from "./sidebar/SidebarSetting";
import SidebarSupport from "./sidebar/SidebarSupport";
import "./Sidebar.css";
const Sidebar = ({chatDirect, chatDefault,chatEmpty, chatGroup, setChatDirect, setChatDefault, setChatEmpty, setChatGroup,setIsOpen,isOpen,setup,pipeline,setSetup,setPipeline,addAgent,setAddAgent,chat,setting}) => {
  return (
    <div style={{backgroundColor:"#95aac9"}} class="d-flex flex-row flex-xl-column flex-gorw-1 justify-content-between align-items-center py-2 py-lg-0 fullwidth ">
      <aside style={{backgroundColor:"#95aac9"}} class="sideba bg-white">
        <div style={{backgroundColor:"#95aac9"}} class="tab-content h-100" role="tablist">
          {/* <!-- Create --> */}
          <div
            class="tab-pane fade h-100"
            id="tab-content-create-chat"
            role="tabpanel"
          >
            {/* @@include("./sidebar-create-chat.html", { "title": "Create chat" }) */}
            <SidebarCreateChat></SidebarCreateChat>
          </div>

          {/* <!-- Friends --> */}
          <div
            class="tab-pane fade h-100"
            id="tab-content-friends"
            role="tabpanel"
          >
            {/* @@include("./sidebar-friends.html", { "title": "Friends" }) */}
            <SidebarFriends setIsOpen={setIsOpen} isOpen={isOpen} addAgent={addAgent} setAddAgent={setAddAgent} chat={chat}></SidebarFriends>
          </div>

          {/* <!-- Chats --> */}
          <div
            class={`tab-pane fade h-100 show ${setting?" ":" active "} ` }
            id="tab-content-chats"
            role="tabpanel"
          >
            {/* @@include("./sidebar-chats.html", { "title": "Chats" }) */}
            <SidebarChats chatDirect={chatDirect} chatDefault={chatDefault} chatEmpty={chatEmpty} chatGroup={chatGroup} setChatDirect={setChatDirect} setChatDefault={setChatDefault} setChatEmpty={setChatEmpty} setChatGroup={setChatGroup} setup={setup}
          pipeline={pipeline}
          setSetup={setSetup}
          setPipeline={setPipeline} chat={chat} ></SidebarChats>
          </div>

          {/* <!-- Notifications - Notices --> */}
          <div
            class="tab-pane fade h-100"
            id="tab-content-notifications"
            role="tabpanel"
          >
            {/* @@include("./sidebar-notifications.html", { "title": "Notifications" }) */}
            <SidebarNotifications></SidebarNotifications>
          </div>

          {/* <!-- Support --> */}
          <div
            class="tab-pane fade h-100"
            id="tab-content-support"
            role="tabpanel"
          >
            {/* @@include("./sidebar-support.html", { "title": "Support" }) */}
            <SidebarSupport></SidebarSupport>
          </div>

          {/* <!-- Settings --> */}
          <div
            class={`tab-pane fade h-100 show ${!setting?" ":" active "} `}
            id="tab-content-settings"
            role="tabpanel"
          >
            {/* @@include("./sidebar-settings.html", { "title": "Settings" }) */}
            <SidebarSetting chatDirect={chatDirect} chatDefault={chatDefault} chatEmpty={chatEmpty} chatGroup={chatGroup} setChatDirect={setChatDirect} setChatDefault={setChatDefault} setChatEmpty={setChatEmpty} setChatGroup={setChatGroup} setIsOpen={setIsOpen} isOpen={isOpen} setup={setup} pipeline={pipeline} setSetup={setSetup} setPipeline={setPipeline} chat={chat}></SidebarSetting>
          </div>
        </div>
      </aside>
      {/* <Chatbar></Chatbar>  */}
    </div>
  );
};
export default Sidebar;
