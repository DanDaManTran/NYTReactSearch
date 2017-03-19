// Include the Main React Dependencies
var React = require("react");
var ReactDOM = require("react-dom");

// We need to include all of the components we're utilizing
var Main = require("./components/Main");
var Search = require("./components/Search");
var Saved = require("./components/Saved");

ReactDOM.render(
  <div className="container container-fluid">
    <Main />
    <Search />
    {/* <Saved /> */}
  </div>
  , document.getElementById("app")
);
