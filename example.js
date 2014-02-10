var Board = require("./").Board

var board = new Board(5, 5)
board.at(1, 0).revive()
board.at(1, 1).revive()
board.at(1, 2).revive()
for (var i = 0; i < 10; i++) {
  board.print()
  board.step()
}

