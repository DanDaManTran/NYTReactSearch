const React = require("react");
const Data = require("./grandchildren/Data")


var Saved = React.createClass({
	getInitialState: function() {
		return { data: [] };
	},

	componentDidMount: function() {
		$.get("/api/saved").done( (result) => {
			this.setState({data: result});
		});
	},

	deleteBtn: function(){
		$.ajax({url: "/api/saved/" + this.props.id, type: 'DELETE', success: (result)	=> {
			this.setState({data: result});
	  }});
	},

	displayData: function() {
		return this.state.data.map((sArt, index) => {

			return <Data key={index} index={index} title={sArt.title} url={sArt.url} date={sArt.date} id={sArt._id} setParent={this.setParent}/>
		});
	},

	setParent: function(data) {
		this.setState({data: data});
	},

	render: function() {
		return (
			<div className="panel panel-primary">
				<div className="panel-heading">
					<h3 className="panel-title">
						<strong>
							<i className="fa fa-table"></i>
							Save Articles
						</strong>
					</h3>
				</div>
				<div className="panel-body">
					{this.displayData()}
				</div>
			</div>
		);
	}
});

module.exports = Saved;
