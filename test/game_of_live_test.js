"use strict";

var Cell = require("../").Cell
var Board = require("../").Board

var should = require('should')

describe("Game of Life", function () {
  describe("Cell rules", function () {
    var cell

    beforeEach(function () {
      cell = new Cell()
    })

    it("dies with less then 2 living neighbors", function () {
      cell.revive()
      cell.neighbours = 1
      cell.applyRules()
      cell.isAlive().should.be.not.be.true
    })

    it("is revived with exactly 3 living neighbours", function () {
      cell.neighbours = 3
      cell.applyRules()
      cell.isAlive().should.be.true
    })

    it("dies with more than 3 living neighbours", function () {
      cell.revive()
      cell.neighbours = 4
      cell.applyRules()
      cell.isAlive().should.not.be.true
    })
  })

  describe("Board", function () {
    it("applies next step", function () {
      var board = new Board(3, 3)
      board.at(0, 0).revive()
      board.at(1, 1).revive()
      board.at(1, 2).revive()
      board.step()
      board.at(0, 0).isAlive().should.be.true
      board.at(1, 1).isAlive().should.be.true
      board.at(2, 2).isAlive().should.be.true
    })
  })
})


var board = new Board(5, 5)
board.at(1, 0).revive()
board.at(1, 1).revive()
board.at(1, 2).revive()
for (var i = 0; i < 10; i++) {
  board.print()
  board.step()
}

