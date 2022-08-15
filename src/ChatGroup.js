import Navigation from "./Navigation";
import Bootstrap from "./Images/icons/bootstrap.svg";
import horizontal from "./Images/icons/more-horizontal.svg";
import img1 from "./Images/icons/1.jpg";
import img11 from "./Images/icons/11.jpg"; 
import img7 from "./Images/icons/7.jpg"; 
import plus from "./Images/icons/plus.svg"; 
import "./components/dashboard/sidebar/SidebarChart.css";
import send from "./Images/icons/send.svg";
import paperclip from "./Images/icons/paperclip.svg";
import smile from "./Images/icons/smile.svg";
import user from "./Images/profile.jpeg";
const ChatGroup = ({chat}) => {
  return (
    <div >
       <div class="layout overflow-scroll h-90 scroll" style={{height:"79vh",marginTop:"1.8rem"}}>
            {/* <!-- Navigation --> */}
            {/* @@include("partials/navigation/navigation.html") */}
            {/* <Navigation></Navigation> */}
            {/* <!-- Navigation --> */}

            {/* <!-- Sidebar --> */}
            {/* @@include("partials/sidebar/sidebar.html") */}
            {/* <!-- Sidebar --> */}

            {/* <!-- Chat --> */}
            <main class="main is-visible" data-dropzone-area="" style={{border:"0px"}}>
                <div class="container h-100" style={{backgroundColor:"#fff",color:"black"}}>

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
                                <div class="col-8 col-xl-12" style={{position:"fixed",top:"65px",backgroundColor:"#fff",borderBottom:"1px solid gray"}}>
                                    <div class="row align-items-center text-center text-xl-start">
                                        {/* <!-- Title --> */}
                                        <div class="col-12 col-xl-4">
                                            <div class="row align-items-center gx-5">
                                                <div class="col-auto">
                                                    <div class="avatar d-none d-xl-inline-block">
                                                        <img class="avatar-img" src={user} alt="" />
                                                    </div>
                                                </div>

                                                <div class="col overflow-hidden text-dark" style={{marginLeft:"-42px"}}>
                                                    <h5 class="text-truncate">William Wright</h5>
                                                    <p class="text-truncate">35 members, 3 online</p>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <!-- Title --> */}

                                        {/* <!-- Toolbar --> */}
                                        <div class=" col-xl-6 d-none d-xl-block">
                                            <div class="row align-items-center justify-content-start gx-2">
                                                <div class="col-auto" style={{marginLeft:"62px"}}>
                                                    <a href="#"  style={{position:"relative",right:"-120px"}} class="icon icon-lg text-muted" data-bs-toggle="offcanvas" data-bs-target="#offcanvas-more-group" aria-controls="offcanvas-more-group">
                                                        {/* @@include("assets/img/icons/more-horizontal.svg") */}
                                                        <img src={horizontal} alt="..."></img>
                                                    </a>
                                                </div>

                                                <div class="col-auto" style={{marginLeft:"56px"}}>
                                                    <div class="avatar-group" style={{width:"20vw"}} >
                                                        <a href="#" style={{position:"relative",right:"-90px"}} class="avatar avatar-sm m-0" data-bs-toggle="modal" data-bs-target="#modal-user-profile">
                                                            <img class="avatar-img m-0" style={{border:"2px solid white"}} src={user} alt="#" />
                                                        </a>

                                                        <a href="#"  style={{position:"relative",right:"-60px"}} class="avatar avatar-sm" data-bs-toggle="modal" data-bs-target="#modal-user-profile">
                                                            <img style={{border:"2px solid white"}} class="avatar-img m-0" src={user} alt="#" />
                                                        </a>

                                                        <a href="#" style={{position:"relative",right:"-30px"}} class="avatar avatar-sm" data-bs-toggle="modal" data-bs-target="#modal-user-profile">
                                                            <img style={{border:"2px solid white"}} class="avatar-img m-0" src={user} alt="#" />
                                                        </a>

                                                        <a href="#" style={{}} class="avatar avatar-sm" data-bs-toggle="offcanvas" data-bs-target="#offcanvas-add-members" aria-controls="offcanvas-add-members">
                                                            <span style={{padding:".9rem",border:"2px solid white",position:"relative",bottom:"-2px",right:"2px"}} class="avatar-text avatar bg-info rounded-circle " data-bs-toggle="tooltip" data-bs-placement="bottom" title="<strong>Add People</strong><p>Invite friends to group</p>">
                                                                {/* @@include("assets/img/icons/plus.svg") */}
                                                                <img src={plus} alt="..."></img>
                                                            </span>
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
                                    <div class="dropdown">
                                        <a class="text-muted" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <div class="icon icon-lg">
                                                {/* @@include("assets/img/icons/more-vertical.svg") */}
                                            </div>
                                        </a>

                                        <ul class="dropdown-menu">
                                            <li>
                                                <a class="dropdown-item" href="#" data-bs-toggle="offcanvas" data-bs-target="#offcanvas-add-members" aria-controls="offcanvas-add-members">Add members</a>
                                            </li>
                                            <li>
                                                <a class="dropdown-item" href="#" data-bs-toggle="offcanvas" data-bs-target="#offcanvas-more-group" aria-controls="offcanvas-more-group">More</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                {/* <!-- Mobile: more --> */}

                            </div>
                        </div>
                        {/* <!-- Chat: Header --> */}

                        {/* <!-- Chat: Content --> */}
                        
                        {/* <!-- Chat: Content --> */}

                        {/* <!-- Chat: Footer --> */}
                        <div class="chat-footer pb-3 pb-lg-7 position-absolute bottom-0 start-0">
                            {/* <!-- Chat: Files --> */}
                            <div class="dz-preview bg-dark" id="dz-preview-row" data-horizontal-scroll="">
                            </div>
                            {/* <!-- Chat: Files --> */}

                            {/* <!-- Chat: Form --> */}
                            <form class="chat-form rounded-pill bg-dark" style={{backgroundColor:"rgb(235, 241, 247)",borderRadius:"100px",width:"59vw",position:"fixed", top:"93.8vh"}} data-emoji-form="">
                                <div style={{backgroundColor:"rgb(235, 241, 247)",borderRadius:"100px"}} class="row align-items-center gx-0">
                                    <div style={{backgroundColor:"rgb(235, 241, 247)",borderTopLeftRadius:"90px",borderBottomLeftRadius:"90px" }} class="col-auto" >
                                        <a style={{backgroundColor:"rgb(235, 241, 247)"}} href="#" class="btn btn-icon btn-link text-body rounded-circle" id="dz-btn">
                                            {/* @@include("assets/img/icons/paperclip.svg") */}
                                            <img src={paperclip} alt="..."></img>
                                        </a>
                                    </div>

                                    <div style={{backgroundColor:"rgb(235, 241, 247)"}} class="col">
                                        <div class="input-group" style={{backgroundColor:"rgb(235, 241, 247)"}}>
                                            <textarea style={{backgroundColor:"rgb(235, 241, 247)",border:"0px"}} class="form-control px-0" placeholder="Type your message..." rows="1" data-emoji-input="" data-autosize="true"></textarea>

                                            <a href="#" class="input-group-text text-body pe-0" style={{backgroundColor:"rgb(235, 241, 247)",border:"0px"}} data-emoji-btn="">
                                                <span class="icon icon-lg" style={{backgroundColor:"rgb(235, 241, 247)",border:"0px"}}>
                                                    {/* @@include("assets/img/icons/smile.svg") */}
                                                    <img src={smile} alt="..."></img>
                                                </span>
                                            </a>
                                        </div>
                                    </div>

                                    <div class="col-auto" style={{backgroundColor:"rgb(235, 241, 247)",borderTopRightRadius:"90px",borderBottomRightRadius:"90px" }}>
                                        <button class="btn btn-icon btn-primary rounded-circle ms-3">
                                            {/* @@include("assets/img/icons/send.svg") */}
                                            <img src={send} alt="..."></img>
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
            {/* @@include("partials/offcanvas/chat-more-group.html") */}

            {/* <!-- Chat: Add member --> */}
            {/* @@include("partials/offcanvas/members.html") */}
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
      {/* // @@include("partials/scripts/scripts.html" */}
    </div>
  );
};
export default ChatGroup;
