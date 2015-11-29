Meteor.startup(function() {

    Tracker.autorun(function() {

    mixpanel.identify(Session.get("playerToken"));
	    mixpanel.people.set({
	        "$created": new Date()
	    });
    });

    mixpanel.track("Visitor");
});		




Template.gameboard.onRendered(function () {

		if (Meteor.isClient) {
			Meteor.startup(function () {
				React.render(<Gameboard />, document.getElementById("classicBoard"));
			});
		};

});


numberAlpha = function(number) {
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
	};


placeTile = function(tile, spot) {

	var tileHand = Tiles.find({gameToken : Session.get("gameToken"), tileState: "unplayed"}).fetch();
	var tileToMove = tileHand[tile-1];
	var BoxToPlace = Boxes.findOne({gameToken : Session.get("gameToken"), boxOrder : spot});

	if(BoxToPlace.content === tileToMove.content && BoxToPlace.hidden === true){
		
		Meteor.call('moveTileDiscardTile', BoxToPlace, tileToMove, Session.get("gameToken"), function (error, result) {
			if(!error){

				Session.set("outcome", "Nice move, you've gained two points. Pick another tile.");
				Meteor.call('updateScore', Session.get("gameToken"), Session.get("playerToken"), 2);
				$('#outcome').addClass('animated pulse').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', 
					function(){
						$(this).removeClass('animated pulse');
				});
				analytics.track("Placed Tile", {
		  			correct: true
		  		});

		  		Session.set("tile", "none");

		};

	});


	}else if(BoxToPlace.content === tileToMove.content && BoxToPlace.hidden === false){

		Session.set("outcome", "Nope, that spot has already been answered correctly. Pick another spot.");
		analytics.track("Placed Tile", {
  			correct: false
  		});
	
	}else{
		
		addGuess(BoxToPlace, tileToMove);
		Session.set("outcome", "Nope, that letter doesn't fit there – other players can see your guess and you've lost a point.");
		Meteor.call('updateScore', Session.get("gameToken"), Session.get("playerToken"), -1);

		$('#instructions').addClass('animated flash').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', 
			function(){
				$(this).removeClass('animated flash');
		});

		analytics.track("Placed Tile", {
  			correct: false
  		});
	}
};


var addGuess = function(BoxToPlace, tileToMove){
	Boxes.update({_id : BoxToPlace._id}, {$set : {guess : tileToMove.content}});
};
