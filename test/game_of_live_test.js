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
  var that = this
  var maxRowIndex = numRows - 1
  var maxColumnIndex = numColumns - 1

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

  this.assignNeighbourCount = function () {
    rows.forEach(function (row, x) {
      row.forEach(function (cell, y) {
        var neighbourCells = neighbourCellsFor(x, y)
        cell.neighbours = neighbourCells.reduce(function (acc, cell) {
          if (cell.isAlive()) acc++
          return acc
        }, 0)
      })
    })
  }

  function neighbourCellsFor(x, y) {
    var positionMap = [[-1, -1], [0, -1], [1, -1],
                       [-1, 0],           [1, 0],
                       [-1, 1],  [0, 1],  [1, 1]]
    var neighbourCells = []
    positionMap.forEach(function (posDelta) {
      var dx = x + posDelta[0]
      if (dx > maxRowIndex) {
        dx = 0
      } else if (dx < 0) {
        dx = maxRowIndex
      }
      var dy = y + posDelta[1]
      if (dy > maxColumnIndex) {
        dy = 0
      } else if (dy < 0) {
        dy = maxColumnIndex
      }
      neighbourCells.push(that.at(dx, dy))
    })
    return neighbourCells
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

    it("assigns living neighbours", function () {
      var board = new Board(3, 3)
      board.at(0, 0).revive()
      board.assignNeighbourCount()
      board.at(0, 0).neighbours.should.be.equal(0)
      board.at(1, 1).neighbours.should.be.equal(1)
      board.at(2, 2).neighbours.should.be.equal(1)
    })
  })
})

