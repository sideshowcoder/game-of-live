"use strict";

var should = require('should')

function Cell() {

  var alive = false

  this.isAlive = function () {
    return alive
  }

  this.revive = function () {
    alive = true
  }

  this.die = function () {
    alive = false
  }

}

Cell.prototype.applyRules = function () {
  if (this.neighbours < 2) return this.die()
  if (this.neighbours === 3) return this.revive()
  if (this.neighbours > 3) return this.die()
}

function Board(numRows, numColumns) {
  var rows = []

  function createRow() {
    var row = []
    for (var i = 0; i < numColumns; i++) {
      row.push(new Cell())
    }
    return row
  }

  for (var i = 0; i < numRows; i++) {
    rows.push(createRow())
  }

  this.at = function (x, y) {
    return rows[x][y]
  }
}

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
    it("is filled with dead cell at start", function () {
      var board = new Board(3, 3)
      board.at(0, 0).isAlive().should.not.be.true
    })
  })
})

