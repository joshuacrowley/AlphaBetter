// Box component - represents a box on the gameboard
Box = React.createClass({

	boxType() {
		if(this.props.box.hidden){
			var guess = numberAlpha(this.props.box.guess)
			return (<span className="center guess animated julse">{guess}</span>)
		}else{
			var content = numberAlpha(this.props.box.content);
			return (<span className="center bounceIn animated {gameOver}" data-content={this.props.box.content} >{content}</span>)
		};
	},

	tileTime() {

		if (Session.get("tile") === "none"){
      		Session.set("outcome", "Select a tile from the list on the far right. Then click on a box.");
      		analytics.track("No placement");
    	}else{

    		var tiles  = $('div.handTile')
    		var selected = tiles.filter('.highlight')
    		var highlightedTile = tiles.index(selected) + 1;
    		console.log(highlightedTile);
      		placeTile(highlightedTile, this.props.box.boxOrder);
      		$( "li" ).removeClass("highlight");
    	};

	},

	attempted() {

		if(this.props.box.hidden){		
			return this.props.box.guess != "" ? "attempted" : ""
		};
	},

	gameOver() {
		return this.props.gameData.endGame === true && this.props.box.hidden === false ? "box white" : "box"
	},

	numberAlpha(number) {
		switch (number) {
			case 1:
				return "A";
			case 2:
			    return "B";
			case 3:
			    return "C";
			case 4:
			    return "D";
			case 5:
			    return "E";
			case 6:
			    return "F";
			case 7:
			    return "G";
			case 8:
			    return "H";
			case 9:
			    return "I";
			case 10:
			    return "J";
	    }
	},

	render() {
		return(
		<div key={this.props.box._id} className={this.gameOver()} id={this.attempted()} data-boxorder={this.props.box.boxOrder} onClick={this.tileTime}>
			{this.boxType()}
		</div>
		);
	}
});