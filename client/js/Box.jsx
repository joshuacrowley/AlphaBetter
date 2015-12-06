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

	    var tiles  = $('div.handTile')
		var selected = tiles.filter('.highlight')    
		var number = $(selected).data("spot");	

		if (typeof number === 'number'){

			placeTile(number, this.props.box.boxOrder);
    		//var highlightedTile = tiles.index(selected) + 1;
      		$( "li" ).removeClass("highlight");

    	}else{
      		Session.set("outcome", "Select a tile from the list on the far right. Then click on a box.");
      		analytics.track("No placement");
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
