const PipeLine = () => {
  
  return (
    <div
      style={{ width: "65vw", padding: "30px", backgroundColor: "#ebf1f7",borderLeft:"2px solid white",fontFamily:"roboto" }}
    >
      <h4 style={{ textAlign: "left" }}>Pipeline</h4>
      <button
        style={{
          color: "white",
          backgroundColor: "#2787f5",
          padding: "6px 14px",
          border: "0px",
          borderRadius: "10px",
          display: "flex",
          margin: "10px 0px",
        }}
      >
        Export Pipeline
      </button>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex" }}>
          <label style={{ padding: "4px 0",paddingRight:"6px" }}>Show </label>
          <input style={{ width: "50px",borderRadius:"10px",border:"0.3px solid #2787f5" }} type="number" step="1"></input>
          <label style={{ padding: "4px 0",paddingLeft:"6px" }}> entries</label>
        </div>
        <div style={{ display: "flex", paddingTop: "4px" }}>
          <label style={{paddingRight:"10px"}}>Search</label>
          <input style={{ width: "120px",borderRadius:"10px",border:"0.3px solid #2787f5" }} type="text"></input>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p>Name</p>
        <p>E-mail</p>
        <p>Phone</p>
        <p></p>
      </div>
      <div
        style={{
          height: "33px",
          padding: "5px",
          borderRadius: "10px",
          backgroundColor: "#fff",
          marginBottom: "8px",
        }}
      >
        No data available in table
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", paddingTop:"20px" }}>
        <div>
          <p>Showing 0 to 0 of 0 entries</p>
        </div>
        <div style={{ display: "flex", borderRadius: "10px" }}>
          <p
            style={{
              padding: "5px 8px",
              border: "0.3px solid grey",
              borderTopLeftRadius: "10px",
              borderBottomLeftRadius: "10px",
              backgroundColor: "#fff",
            }}
          >
            First
          </p>
          <p
            style={{
              padding: "5px 8px",
              border: "0.3px solid grey",
              backgroundColor: "#fff",
            }}
          >
            Previous
          </p>
          <p
            style={{
              padding: "5px 8px",
              border: "0.3px solid grey",
              backgroundColor: "#fff",
            }}
          >
            Next
          </p>
          <p
            style={{
              padding: "5px 8px",
              border: "0.3px solid grey",
              borderTopRightRadius: "10px",
              borderBottomRightRadius: "10px",
              backgroundColor: "#fff",
            }}
          >
            last
          </p>
        </div>
      </div>
    </div>
  );
};
export default PipeLine;
