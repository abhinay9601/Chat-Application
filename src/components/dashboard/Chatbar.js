import ChatDirect from "../../ChatDirect";
import ChatEmpty from "../../ChatEmpty";
import ChatGroup from "../../ChatGroup";
import Pipeline from "./sidebar/setting/Pipeline";
import Setup from "./sidebar/setting/Setup";
const Chatbar = ({
  chatDirect,
  chatDefault,
  chatEmpty,
  chatGroup,
  setChatDirect,
  setChatDefault,
  setChatEmpty,
  setChatGroup,
  chat,setup,pipeline
}) => {
  console.log(chatDirect);
  console.log(chatDefault);
  console.log(chatGroup);
  console.log(chatEmpty);

  return (
    <div>
      <div  class="d-flex flex-row flex-xl-column flex-grow-1 justify-content-between align-items-center py-2 py-lg-0  ">
        <aside class="sidebar bg-white h-90">
          <div class="tab-content h-90" >
            {/* <!-- Create --> */}
            {chatDirect && (
              <div
                class="tab-pan fad h-90"
                id="tab-chatdirect"
                role="tabpanel"
              >
                {/* @@include("./sidebar-create-chat.html", { "title": "Create chat" }) */}
                <ChatDirect></ChatDirect>
              </div>
            )}
            {/* <!-- Friends --> */}
            {chatGroup && (
              <div
                class="tab-pan fad h-90"
                id="tab-chatgroup"
                role="tabpanel"
              >
                {/* @@include("./sidebar-friends.html", { "title": "Friends" }) */}
                <ChatGroup chat={chat}></ChatGroup>
              </div>
            )}
            {/* <!-- Pipeline --> */}
            {pipeline && (
              <div
                class="tab-pan fad h-90"
                id="tab-chatgroup"
                role="tabpanel"
              >
                {/* @@include("./sidebar-friends.html", { "title": "Friends" }) */}
                <Pipeline></Pipeline>
              </div>
            )}
            {/* <!-- Friends --> */}
            {setup && (
              <div
                class="tab-pan fad h-90"
                id="tab-chatgroup"
                role="tabpanel"
              >
                {/* @@include("./sidebar-friends.html", { "title": "Friends" }) */}
                <Setup></Setup>
              </div>
            )}
            {/* <!-- Chats --> */}
            {chatDefault && (
              <div
                class="tab-pan fad h-100 show activ"
                id="tab-contentchats"
                role="tabpanel"
              >
                <main
                  style={{
                    height: "90vh",
                    width: "73.05vw",
                    backgroundColor: "white",
                  }}
                  class="main"
                >
                  <div
                    style={{ backgroundColor: "white", marginLeft: "0vw" }}
                    class="container h-100"
                  >
                    <div
                      style={{ height: "100" }}
                      class="d-flex flex-column h-100 justify-content-center text-center"
                    >
                      <div style={{ height: "100" }} class="mb-6">
                        <span class="icon icon-xl text-muted">
                          {/* @@include("assets/img/icons/message-square.svg") */}
                        </span>
                      </div>

                      <p class="text-muted">
                        Pick a person from left menu, <br /> and start your
                        conversation.
                      </p>
                    </div>
                  </div>
                </main>
              </div>
            )}
            {/* <!-- Notifications - Notices --> */}
            {chatEmpty && (
              <div
                class="tab-pan fad h-100"
                id="tab-chatempty"
                role="tabpanel"
              >
                {/* @@include("./sidebar-notifications.html", { "title": "Notifications" }) */}
                <ChatEmpty></ChatEmpty>
              </div>
            )}

            {/* <!-- Support --> */}
            {/* <div
            class="tab-pane fade h-100"
            id="tab-content-support"
            role="tabpanel"
          > */}
            {/* @@include("./sidebar-support.html", { "title": "Support" }) */}
            {/* <SidebarSupport></SidebarSupport> */}
            {/* </div> */}

            {/* <!-- Settings --> */}
            {/* <div
            class="tab-pane fade h-100"
            id="tab-content-settings"
            role="tabpanel"
          > */}
            {/* @@include("./sidebar-settings.html", { "title": "Settings" }) */}
            {/* <SidebarSetting></SidebarSetting>
          </div> */}
          </div>
        </aside>
      </div>
    </div>
  );
};
export default Chatbar;
