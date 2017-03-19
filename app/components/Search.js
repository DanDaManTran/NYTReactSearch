const React = require("react");
const Query = require("./search/Query")

var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=b9f91d369ff59547cd47b931d8cbc56b:0:74623931&q=";

var Search = React.createClass({
	getInitialState: function() {
		return { term: "", numRec: 5, sYear: "", eYear: "", articles: []};
	},

	displayResult: function() {
		return this.state.articles.map(function(art, index){

			return <Query index={index} title={art.headline.main} url={art.web_url} date={art.pub_date} />
		});
	},

	handleChange: function(event) {
		var newState = {};
		newState[event.target.id] = event.target.value;
		this.setState(newState);
	},

	handleClear: function() {
		this.setState({articles: []});
	},

	handleSearch: function (){
		var url = queryURLBase + this.state.term;

		if(this.state.sYear){
			url = url + "&begin_date=" + this.state.sYear + "0101";
		}
		if(this.state.eYear){
			url = url + "&end_date=" + this.state.eYear + "0101";
		}

		if(this.state.term){
			var that = this;

			// $.ajax({ url: url, method: "GET" }).done(function(NYTData) {
			// 	var sortedNews = [];
			// 	console.log(url);
			// 	for(var i = 0; i<that.state.numRec; i++){
			// 		sortedNews.push(NYTData.response.docs[i]);
			// 	}
			//
			// 	that.setState({articles: sortedNews});
			// });
			$.ajax({ url: url, method: "GET" }).done( (NYTData) => {
				var sortedNews = [];

				for(var i = 0; i<this.state.numRec; i++){
					sortedNews.push(NYTData.response.docs[i]);
				}

				this.setState({articles: sortedNews});
			});
		}
		
	},

	render: function() {
		return (
			<div>
			<div className="panel panel-primary">
				<div className="panel-heading">
					<h3 className="panel-title">
						<strong>
							<i className="fa fa-newspaper-o"></i>
							Search Parameters
						</strong>
					</h3>
				</div>
				<div className="panel-body">
					{/* <form role="form" action="#"> */}
						<form action="#">

						<div className="form-group">
							<h4>
								<strong>Search Term: {this.state.term}</strong>
							</h4>
							<input
								type="string"
								value={this.state.term}
								className="form-control"
								id="term"
								onChange={this.handleChange}
								required
							/>
							<h4>
								<strong>Number of Records to Retrieve: {this.state.numRec}</strong>
							</h4>
							<select value={this.state.numRec} className="form-control" id="numRec" onChange={this.handleChange}>
		            <option value="1">1</option>
		            <option value="5">5</option>
		            <option value="10">10</option>
		          </select>
							<h4>
								<strong>Start Year (Optional): {this.state.sYear}</strong>
							</h4>
							<input
								type="number"
								value={this.state.sYear}
								className="form-control"
								id="sYear"
								onChange={this.handleChange}
							/>
							<h4>
								<strong>End Year (Optional): {this.state.eYear}</strong>
							</h4>
							<input
								type="number"
								value={this.state.eYear}
								className="form-control"
								id="eYear"
								onChange={this.handleChange}
							/>
						</div>
						<button className="btn btn-primary btn-lg" onClick={this.handleSearch}><i className="fa fa-search"></i>Search</button>

						<button className="btn btn-primary btn-lg" onClick={this.handleClear}><i className="fa fa-trash"></i>Clear Results</button>

					</form>
				</div>
			</div>

			<div className="panel panel-primary">
				<div className="panel-heading">
					<h3 className="panel-title">
						<strong>
							<i className="fa fa-table"></i>
							Top Articles
						</strong>
					</h3>
				</div>
				<div className="panel-body">
					{this.displayResult()}
				</div>
			</div>
		</div>
		);
	}
});

module.exports = Search;
