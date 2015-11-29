startGame = function (){

  var gridWidth = 10;
  var gridHeight = 10;
  var token = Random.id([8]);
  
  rangeCorrect = function (num){
    if(num < 0 || num > gridHeight*gridHeight){
      return 0;
    }else{
      return num;
    }
  };

  var sequence = [9,2,5,8,4,10,1,3,6,7,7,10,3,6,2,8,9,1,4,5,6,9,2,5,1,7,8,10,3,4,5,8,1,4,10,6,7,9,2,3,4,7,10,3,9,5,6,8,1,2,8,1,4,7,3,9,10,2,5,6,1,4,7,10,6,2,3,5,8,9,10,3,6,9,5,1,2,4,7,8,2,5,8,1,7,3,4,6,9,10,3,6,9,2,8,4,5,7,10,1];

  var n = 10;
  var rows = _.groupBy(sequence, function(element, index){
      return Math.floor(index/n);
  });

  rows = _.shuffle(rows);
  sequence = _.flatten(rows);

  var columns = _.groupBy(sequence, function(element, index){
    return index%n;
  });

  columns = _.shuffle(columns);
  fixedSequence = _.flatten(columns);

  var tilesToHide = _.sample(_.range(0,100),50);

  Games.insert({
    gameToken: token,
    createdAt: new Date(),
    finished: false,
    endGame: false,
    player: []
  });

  tilesToHide.forEach(function (tile) {
        Tiles.insert({
          "gameToken": token,
          tileState: "unplayed",
          owner : "none",
          spot: tile,
          content: fixedSequence[tile],
          createdAt: new Date()
        });
  });

  var i = 0;

  fixedSequence.forEach(function (box) {

      var hidden = false

      if (_.contains(tilesToHide, i)){
        var hidden = true
      };

      Boxes.insert({
        "boxOrder" : i++,
        "gameToken": token,
        "guess": "",
        "createdAt": new Date(),
        "content": box,
        "hidden": hidden,
        "special" : "none"
      });

  });

    return token;
};