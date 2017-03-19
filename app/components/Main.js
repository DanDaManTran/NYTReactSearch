const React = require("react");

var Main = React.createClass({
	render: function() {
		return (
			<div className="container">
				<div className="jumbotron">
					<h1>
						<i className="fa fa-newspaper-o"></i>
						New York Times Search
					</h1>
					<a href="#">
						Search
					</a>
					<a href="#">
						Saved
					</a>
				</div>
			</div>
		);
	}
});

module.exports = Main;
