import moreVertical from '../../../Images/icons/more-vertical.svg';
import i4 from '../../../Images/icons/4.jpg';
import { useState } from 'react';
import EditAgent from '../editAgent';
const Friend = ({
  image,
  name,
  abbr,
  avatar,
  status,
  online,
  setIsOpen,
  isOpen,
  data,
}) => {
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  console.log("status",status);

  const handleEdit = () => {
    localStorage.setItem('editUserId', data._id);
    localStorage.setItem('email', data.email);
    localStorage.setItem('name', data.name);
    localStorage.setItem('phoneNo', data.phoneNo);
    localStorage.setItem('department', data.department);
    localStorage.setItem('address', data.address);
    togglePopup();
  };

  return (
    <div>
      <div
        class="card border-0"
        style={{
          margin: '10px 0',
          backgroundColor: 'white',
          height: '12vh',
          borderRadius: '14px',
          paddingTop:status? '13px':"25px",
          paddingLeft: '14px',
          verticalAlign:"center"
        }}
      >
        <div class="card-body pt-0 mt-0" style={{marginTop:status===undefined?"0":"40px"}}>
          <div class="row align-items-center gx-2">
            <div class="col-auto">
              <a href="#" class="avata">
                {/* if (context.avatar != "") */}
                {avatar && (
                  <img
                    style={{ marginBottom: '22px' }}
                    class="avatar-img"
                    src={i4}
                    alt="."
                  />
                )}
                {/* if(props.abbr != "") { */}
                {abbr && (
                  <span
                    style={{
                      color: '#ffffff',
                      textDecoration: 'none',
                      backgroundColor: 'rgb(101, 182, 253)',
                      padding: '16px 20px',
                      textAlign: 'center',
                      borderRadius: '100px',
                      position: 'relative',
                      top: '-9px',
                      marginRight: '18px',
                    }}
                    class="avatar-tex"
                  >

                    {abbr}
                  </span>
                )}
                {/* } */}
              </a>
            </div>

            <div style={{ textAlign: 'left' }} class="col">
              <h5>
                <a
                  style={{
                    color: '#293951',
                    font: '18px Roboto',
                    textDecoration: 'none',
                  }}
                  href="#"
                >
                  {name}
                </a>
              </h5>
              <p style={{ color: '#95aac9', font: '18px Roboto' }}>{status}</p>
            </div>

            <div style={{ marginBottom: '20px' }} class="col-auto">
              {/* <!-- Dropdown --> */}
              <div class="dropdown">
                <a
                  class="icon text-muted"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {/* @@include("../../assets/img/icons/more-vertical.svg") */}
                  <img src={moreVertical} alt="..."></img>
                </a>

                <ul class="dropdown-menu">
                  <li>
                    <a
                      class="dropdown-item"
                      style={{ color: '#95aac9' }}
                      href="#"
                    >
                      New message
                    </a>
                  </li>
                  <li>
                    <a
                      class="dropdown-item"
                      style={{ color: '#95aac9' }}
                      href="#"
                      // data-bs-toggle="modal"
                      // data-bs-target="#modal-edit-agent"
                      onClick={handleEdit}
                    >
                      Edit contact
                    </a>
                  </li>

                  <li>
                    <hr class="dropdown-divider" />
                  </li>
                  <li>
                    <a
                      class="dropdown-item text-danger"
                      style={{ color: '#95aac9' }}
                      href="#"
                    >
                      Block user
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Friend;
