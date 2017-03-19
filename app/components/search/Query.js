const React = require("react");

var Query = React.createClass({
	render: function() {
		return(
			<div className="row">
				<div className="col-sm-10">
					<h3>
						<span className="label label-primary">
							{this.props.index + 1}
						</span>
						<strong>
							{this.props.title}
						</strong>
					</h3>
					<h5>
						{this.props.date}
					</h5>
					<a href={this.props.url}>
						Link
					</a>
				</div>
				<div className="col-sm-2">
					<button className="saveBtn btn btn-primary btn-lg">
						Save
					</button>
				</div>
			</div>

		);
	}
});

module.exports = Query;
