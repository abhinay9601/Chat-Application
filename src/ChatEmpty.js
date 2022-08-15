
const ChatEmpty=()=>{
  return<div><div class="layout overflow-hidden">
  {/* <!-- Navigation --> */}
  {/* @@include("partials/navigation/navigation.html") */}
  {/* <!-- Navigation --> */}

  {/* <!-- Sidebar --> */}
  {/* @@include("partials/sidebar/sidebar.html") */}
  {/* <!-- Sidebar --> */}

  {/* <!-- Chat --> */}
  <main class="main is-visible" data-dropzone-area="">
      <div class="container h-100">

          <div class="d-flex flex-column h-100 position-relative">
              {/* <!-- Chat: Header --> */}
              <div class="chat-header border-bottom py-4 py-lg-7">
                  <div class="row align-items-center">

                      {/* <!-- Mobile: close --> */}
                      <div class="col-2 d-xl-none">
                          <a class="icon icon-lg text-muted" href="#" data-toggle-chat="">
                              {/* @@include("assets/img/icons/chevron-left.svg") */}
                          </a>
                      </div>
                      {/* <!-- Mobile: close --> */}

                      {/* <!-- Content --> */}
                      <div class="col-8 col-xl-12">
                          <div class="row align-items-center text-center text-xl-start">
                              {/* <!-- Title --> */}
                              <div class="col-12 col-xl-6">
                                  <div class="row align-items-center gx-5">
                                      <div class="col-auto">
                                          <div class="avatar d-none d-xl-inline-block">
                                              <img class="avatar-img" src="assets/img/avatars/8.jpg" alt="" />
                                          </div>
                                      </div>

                                      <div class="col overflow-hidden">
                                          <h5 class="text-truncate">Elise Dennis</h5>
                                          <p class="text-truncate">is typing<span class='typing-dots'><span>.</span><span>.</span><span>.</span></span></p>
                                      </div>
                                  </div>
                              </div>
                              {/* <!-- Title --> */}

                              {/* <!-- Toolbar --> */}
                              <div class="col-xl-6 d-none d-xl-block">
                                  <div class="row align-items-center justify-content-end gx-6">
                                      <div class="col-auto">
                                          <a href="#" class="icon icon-lg text-muted" data-offcanvas="info">
                                              {/* @@include("assets/img/icons/more-horizontal.svg") */}
                                          </a>
                                      </div>

                                      <div class="col-auto">
                                          <div class="avatar-group">
                                              <a href="#" class="avatar avatar-sm" data-bs-toggle="modal" data-bs-target="#modal-user-profile">
                                                  <img class="avatar-img" src="assets/img/avatars/8.jpg" alt="#" />
                                              </a>

                                              <a href="#" class="avatar avatar-sm" data-bs-toggle="modal" data-bs-target="#modal-profile">
                                                  <img class="avatar-img" src="assets/img/avatars/1.jpg" alt="#" />
                                              </a>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                              {/* <!-- Toolbar --> */}
                          </div>
                      </div>
                      {/* <!-- Content --> */}

                      {/* <!-- Mobile: more --> */}
                      <div class="col-2 d-xl-none text-end">
                          <a href="#" class="icon icon-lg text-muted" data-offcanvas="info">
                              {/* @@include("assets/img/icons/more-vertical.svg") */}
                          </a>
                      </div>
                      {/* <!-- Mobile: more --> */}

                  </div>
              </div>
              {/* <!-- Chat: Header --> */}

              {/* <!-- Chat: Content --> */}
              <div class="chat-body hide-scrollbar flex-1 h-100">
                  <div class="chat-body-inner h-100">

                      <div class="d-flex flex-column h-100 justify-content-center">
                          <div class="text-center mb-6">
                              <span class="icon icon-xl text-muted">
                                  {/* @@include("assets/img/icons/send.svg") */}
                              </span>
                          </div>

                          <p class="text-center text-muted">No messages yet, <br /> start the conversation!</p>
                      </div>

                  </div>
              </div>
              {/* <!-- Chat: Content --> */}

              {/* <!-- Chat: Footer --> */}
              <div class="chat-footer pb-3 pb-lg-7 position-absolute bottom-0 start-0">
                  {/* <!-- Chat: Files --> */}
                  <div class="dz-preview bg-dark" id="dz-preview-row" data-horizontal-scroll="">
                  </div>
                  {/* <!-- Chat: Files --> */}

                  {/* <!-- Chat: Form --> */}
                  <form class="chat-form rounded-pill bg-dark" data-emoji-form="">
                      <div class="row align-items-center gx-0">
                          <div class="col-auto">
                              <a href="#" class="btn btn-icon btn-link text-body rounded-circle" id="dz-btn">
                                  {/* @@include("assets/img/icons/paperclip.svg") */}
                              </a>
                          </div>

                          <div class="col">
                              <div class="input-group">
                                  <textarea class="form-control px-0" placeholder="Type your message..." rows="1" data-emoji-input="" data-autosize="true"></textarea>

                                  <a href="#" class="input-group-text text-body pe-0" data-emoji-btn="">
                                      <span class="icon icon-lg">
                                          {/* @@include("assets/img/icons/smile.svg") */}
                                      </span>
                                  </a>
                              </div>
                          </div>

                          <div class="col-auto">
                              <button class="btn btn-icon btn-primary rounded-circle ms-5">
                                  {/* @@include("assets/img/icons/send.svg") */}
                              </button>
                          </div>
                      </div>
                  </form>
                  {/* <!-- Chat: Form --> */}
              </div>
              {/* <!-- Chat: Footer --> */}
          </div>

      </div>
  </main>
  {/* <!-- Chat --> */}

  {/* <!-- Chat: Info --> */}
  {/* @@include("partials/offcanvas/chat-more.html") */}
</div>
{/* <!-- Layout --> */}

{/* <!-- Modal: Invite --> */}
{/* @@include("partials/modal/invite.html") */}

{/* <!-- Modal: Profile --> */}
{/* @@include("partials/modal/profile.html") */}

{/* <!-- Modal: User profile --> */}
{/* @@include("partials/modal/user-profile.html") */}

{/* <!-- Modal: Media Preview --> */}
{/* @@include("partials/modal/media-preview.html") */}

{/* <!-- Scripts --> */}
{/* @@include("partials/scripts/scripts.html") */}
</div>
}
export default ChatEmpty;