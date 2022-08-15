import axios from "axios";
import React, { useState, useEffect } from "react";
import "./Setup.css";
// import Dropdown from "react-dropdown-input";
// import "react-dropdown/style.css";

const Setup = () => {
  const [url, setUrl] = useState("");

  const handleUrl = () => {
    axios.post("http://localhost:3000/setup-url/627aaf70780f827c51e6f45a", {
      url,
    });
  };
  useEffect(async () => {
    const setupUrl = await axios.get(
      "http://localhost:3000/setup-url/627aaf70780f827c51e6f45a"
    );

    // console.log('url is', setupUrl.data.url);
    setUrl(setupUrl.data.url);
  }, [setUrl]);

  // const options = ["one", "two", "three"];
  // const defaultOption = options[0];
const [startDay,setStartDay]=useState("Monday")
const [endDay,setEndDay]=useState("Friday")
const [startTime,setStartTime]=useState("09:00")
const [endTime,setEndTime]=useState("18:00");

const startDayHandler=(e)=>{
  setStartDay(e.target.value);
}
const endDayHandler=(e)=>{
  setEndDay(e.target.value);
}
const startTimeHandler=(e)=>{
  setStartTime(e.target.value);
}
const endTimeHandler=(e)=>{
  setEndTime(e.target.value);
}
const saveHandler=()=>{
localStorage.setItem("Start Day",startDay);
localStorage.setItem("End Day",endDay);
localStorage.setItem("Start Time",startTime);
localStorage.setItem("End Time",endTime);

}

useEffect(()=>{
  localStorage.getItem("Start Day")?setStartDay(localStorage.getItem("Start Day")):setStartDay(startDay);
  localStorage.getItem("Start Day")? setEndDay(localStorage.getItem("End Day")):setEndDay(endDay);
  localStorage.getItem("Start Day")?setStartTime(localStorage.getItem("Start Time")):setStartTime(startTime);
  localStorage.getItem("Start Day")? setEndTime(localStorage.getItem("End Time")):setEndTime(endTime);

},[])

  return (
    <div
      style={{
        backgroundColor: "#ebf1f7",
        borderLeft: "2px solid white",
        width: "26vw",
        height: "97vh",
        padding: "14px",
        fontFamily: "Roboto",
      }}
    >
      <div>
        <h5 style={{ textAlign: "left" }}>Configure The Setup</h5>
        <label>
          <h6 style={{ textAlign: "left" }}>PayPal.Me URL</h6>
        </label>
        <input
          style={{
            padding: "10px 20px",
            display: "flex",
            width:"45vh",
            borderRadius: "10px",
            border: "none",
          }}
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        ></input>
        <p style={{ textAlign: "left", font:"14px Roboto", color:"#6c757d", padding:"4px 8px 0px" }}>
          If you are not enrolled get started
          <a style={{ color: "#2787f5", font:"14px Roboto" }}> here</a>
        </p>
        <button
          style={{
            color: "white",
            backgroundColor: "#2787f5",
            padding: "8px 10px",
            border: "0px",
            borderRadius: "10px",
            display: "flex",
            // margin: "10px 0",
          }}
          onClick={handleUrl}
        >
          Configure Payment
        </button>
      </div>
      <hr />
      <div>
        <h5 style={{ textAlign: "left" }}>Enable/Disable Mode</h5>
        <label class="switch" style={{ display: "flex" }}>
          <input type="checkbox" />
          <span class="slider round"></span>
        </label>
        <p style={{ textAlign: "left", font:"14px Roboto", color:"#6c757d", padding:"7px 8px" }}>Enable</p>
        <div>
          <h5 style={{ textAlign: "left" }}>
            Availability Window Setup(time Will Consider As UTC){" "}
          </h5>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div class="styled-select">
              <label htmlFor="days" style={{ textAlign: "left", font:"14px Roboto", color:"#6c757d", padding:"7px 8px" }}>
                Select Start Day
              </label>
              {/* <input
                style={{
                  padding: "4px 10px",
                  width: "25vw",
                  borderRadius: "10px",
                  border: "none",
                }}
                type="text"
                placeholder="Monday"
              ></input> */}
              {/* <Dropdown
                options={options}
                value={defaultOption}
                placeholder="Select an option"
              /> */}
              <select 
                onChange={startDayHandler}
              class="at"
              style={{
                padding: "10px 20px",
            borderRadius: "10px",
            border: "none",
                  // padding: "6px 10px",
                  width: "11vw",
                  // borderRadius: "10px",
                  // border: "none",
                }}>
        <option value="Monday">{startDay}</option>
        <option value="Monday">Monday</option>
        <option value="Tuesday">Tuesday</option>
        <option value="Wednesday">Wednesday</option>
        <option value="Thursday">Thursday</option>
        <option value="Friday">Friday</option>
        <option value="Saturday">Saturday</option>
        <option value="Sunday">Sunday</option>

      </select>
            </div>
            <div>
              <label style={{ textAlign: "left", font:"14px Roboto", color:"#6c757d", padding:"7px 20px" }}>Select End Day</label>
              {/* <input
                style={{
                  padding: "4px 10px",
                  width: "25vw",
                  borderRadius: "10px",
                  border: "none",
                }}
                type="text"
                placeholder="Tuesday"
              ></input> */}
              <select  style={{
                padding: "10px 20px",
                // padding:"20px 8px 7px",
                width: "11vw",
            borderRadius: "10px",
            border: "none",
                  // padding: "6px 10px",
                  // width: "25vw",
                  // borderRadius: "10px",
                  // border: "none",
                }}
                onChange={endDayHandler}>
                  <option>{endDay}</option>
        <option value="Monday">Monday</option>
        <option value="Tuesday">Tuesday</option>
        <option value="Wednesday">Wednesday</option>
        <option value="Thursday">Thursday</option>
        <option value="Friday">Friday</option>
        <option value="Saturday">Saturday</option>
        <option value="Sunday">Sunday</option>

      </select>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <label style={{ textAlign: "left", font:"14px Roboto", color:"#6c757d", padding:"20px 8px 7px" }}>Select Start time</label>
              <input
                style={{
                  padding: "10px 20px",
                width: "11vw",
            borderRadius: "10px",
            border: "none",
                  // padding: "4px 10px",
                  // width: "25vw",
                  // borderRadius: "10px",
                  // border: "none",
                }}
                value={startTime}
                placeholder={startTime}
                type="time"
                onChange={startTimeHandler}
              ></input>
            </div>
            <div>
              <label style={{ textAlign: "left", font:"14px Roboto", color:"#6c757d", padding:"20px 8px 7px" }}>Select End time</label>
              <input
                style={{
                  padding: "10px 20px",
                width: "11vw",
            borderRadius: "10px",
            border: "none",
                  // padding: "4px 10px",
                  // width: "25vw",
                  // borderRadius: "10px",
                  // border: "none",
                }}
                value={endTime}
                type="time"
                placeholder="12:00"
                onChange={endTimeHandler}
              ></input>
            </div>
          </div>
          <button
            style={{
              color: "white",
              backgroundColor: "#2787f5",
              padding: "8px 20px",
              border: "0px",
              borderRadius: "10px",
              display: "flex",
              margin: "10px 0",
            }}
          onClick={saveHandler}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
export default Setup;
