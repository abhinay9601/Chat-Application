import Icon from "../../../Images/icon.jpeg";
import Pic from "../../../Images/7-copy.jpg";
import user from "../../../Images/profilePic.jpg";
import "./Navbar.css";
import Profile from "../Profile";
const Navbar = ({setUserProfile}) => {
const profileHandler=()=>{
setUserProfile(true);
}
  return (
    <div class="main" style={{display:"flex",justifyContent:"space-between"}}>
      <div style={{ margin: "0 1rem" }} class="icon">
        <img src={Icon} alt="..." height="50px"></img>
      </div>
      <div>
              <div style={{ margin: "0 3rem",display: "flex", justifyContent: "space-between" ,alignItems:"center" }}>
        <div style={{ margin:"0 1rem" }}>
          <label class="switch">
            <input type="checkbox" />
            <span class="slider round"></span>
          </label>
        </div>
        <nav style={{marginBottom:"8px", marginRight:"-18px"}} class="nav-item">
            <a
            onClick={profileHandler}
              href="#"
              class="nav-link p-0 mt-lg-2"
              data-bs-toggle="modal"
              data-bs-target="#modal-profile"
            >
              <div class="avatar avatar-online mx-auto d-none d-xl-block"
              style={{boxShadow: "rgba(9, 30, 66, 0.25) 0px 0px 0px, rgba(9, 30, 66, 0.13) 0px 0px 1px 0.5px"}}>
                <img class="avatar-img" src={user} width={"60px"} height={"60px"} alt="" />
              </div>
              
              {/* <div class="avatar avatar-online avatar-xs d-xl-none">
                <img class="avatar-img" style={{width:"50px"}} src={Pic} alt="" />
              </div> */}
            </a>
          </nav>
          {/* <Profile setClickSetting={setClickSetting}></Profile> */}
        </div>
      </div>
    </div>
  );
};
export default Navbar;
