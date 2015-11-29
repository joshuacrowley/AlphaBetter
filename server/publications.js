Meteor.publish("boxes", function (gameToken) {
	return Boxes.find({gameToken: gameToken});
});

Meteor.publish("tiles", function (gameToken) {
	return Tiles.find({gameToken: gameToken});
});

Meteor.publish("games", function () {
	return Games.find({});
});