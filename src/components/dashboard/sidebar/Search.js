import search from "../../../Images/icons/search.svg";
import "./Search.css";
const Search = (props) => {
console.log("chat",props.chat)
const inputHandler=(e)=>{
props.setSearch(e.target.value)
}

  return (
    <div>
      <form
        action="#"
        style={{ marginLeft: "1px", width: "28vw" }}
      >
        <div
          class="input-group"
          style={{
            borderRadius: "10px",
            color: "#95aac9",
            backgroundColor: "#ebf1f7",
          }}
        >
          <div
            class="input-group-text"
            style={{
              borderTopLeftRadius: "10px",
              borderBottomLeftRadius: "10px",
              color: "#95aac9",
              backgroundColor: "white",
              border: "0px",
            }}
          >
            <div class="icon icon-lg ">
              {/* @@include("../../assets/img/icons/search.svg") */}
              <img src={search} alt="..."></img>
            </div>
          </div>
          <input
            style={{
              color: "#95aac9",
              margin: "0px 0px 0px -2px",
              backgroundColor: "white",
              padding: "14px 18px 14px 0px",
              width: props.chat ? "21.5vw":"23.2vw",
              border: "none",
              borderTopRightRadius: "10px",
              borderBottomRightRadius: "10px",
              font: "18px Roboto",
            }}
            type="text"
            class="form-contro form-control-lg ps-3 sewid"
            placeholder="Search messages or agents"
            aria-label="Search for messages or users..."
            onChange={inputHandler}
          />
        </div>
      </form>
    </div>
  );
};
export default Search;