import { useEffect } from "react";

const Navigation =()=>{
    useEffect(()=>{
        document.getElementById("click").click();
    },[])
  return <div><nav class="navigation d-flex flex-column text-center navbar navbar-light hide-scrollbar">
  {/* <!-- Brand --> */}
  <a href="index.html" title="Messenger" class="d-none d-xl-block mb-6">
      {/* @@include("../../assets/img/brand/brand.svg") */}
  </a>

  {/* <!-- Nav items --> */}
  <ul class="d-flex nav navbar-nav flex-row flex-xl-column flex-grow-1 justify-content-between justify-content-xl-center align-items-center w-100 py-4 py-lg-2 px-lg-3" role="tablist">
      {/* <!-- Invisible item to center nav vertically --> */}
      <li class="nav-item d-none d-xl-block invisible flex-xl-grow-1">
          <a class="nav-link py-0 py-lg-8" href="#" title="">
              <div class="icon icon-xl">
                  {/* @@include("../../assets/img/icons/x.svg") */}
              </div>
          </a>
      </li>

      {/* <!-- New chat --> */}
      <li class="nav-item">
          <a class="nav-link py-0 py-lg-8" id="tab-create-chat" href="#tab-content-create-chat" title="Create chat" data-bs-toggle="tab" role="tab">
              <div class="icon icon-xl">
                  {/* @@include("../../assets/img/icons/edit-3.svg") */}
              </div>
          </a>
      </li>

      {/* <!-- Friends --> */}
      <li class="nav-item">
          <a class="nav-link py-0 py-lg-8" id="tab-friends" href="#tab-content-friends" title="Friends" data-bs-toggle="tab" role="tab">
              <div class="icon icon-xl">
                  {/* @@include("../../assets/img/icons/users.svg") */}
              </div>
          </a>
      </li>

      {/* <!-- Chats --> */}
      <li class="nav-item" id="click">
          <a  class="nav-link active py-0 py-lg-8" id="tab-chats click" href="#tab-content-chats" title="Chats" data-bs-toggle="tab" role="tab">
              <div class="icon icon-xl icon-badged">
                  {/* @@include("../../assets/img/icons/message-square.svg") */}
                  <div class="badge badge-circle bg-primary">
                      <span>4</span>
                  </div>
              </div>
          </a>
      </li>

      {/* <!-- Notification --> */}
      <li class="nav-item">
          <a class="nav-link py-0 py-lg-8" id="tab-notifications" href="#tab-content-notifications" title="Notifications" data-bs-toggle="tab" role="tab">
              <div class="icon icon-xl">
                  {/* @@include("../../assets/img/icons/bell.svg") */}
              </div>
          </a>
      </li>

      {/* <!-- Support --> */}
      <li class="nav-item d-none d-xl-block flex-xl-grow-1">
          <a class="nav-link py-0 py-lg-8" id="tab-support" href="#tab-content-support" title="Support" data-bs-toggle="tab" role="tab">
              <div class="icon icon-xl">
                  {/* @@include("../../assets/img/icons/layout.svg") */}
              </div>
          </a>
      </li>

      {/* <!-- Settings --> */}
      <li class="nav-item d-none d-xl-block">
          <a class="nav-link py-0 py-lg-8" id="tab-settings" href="#tab-content-settings" title="Settings" data-bs-toggle="tab" role="tab">
              <div class="icon icon-xl">
                  {/* @@include("../../assets/img/icons/settings.svg") */}
              </div>
          </a>
      </li>

      {/* <!-- Profile --> */}
      <li class="nav-item">
          <a href="#" class="nav-link p-0 mt-lg-2" data-bs-toggle="modal" data-bs-target="#modal-profile">
              <div class="avatar avatar-online mx-auto d-none d-xl-block">
                  <img class="avatar-img" src="assets/img/avatars/1.jpg" alt="" />
              </div>
              <div class="avatar avatar-online avatar-xs d-xl-none">
                  <img class="avatar-img" src="assets/img/avatars/1.jpg" alt="" />
              </div>
          </a>
      </li>
  </ul>
</nav></div>
}
export default Navigation;