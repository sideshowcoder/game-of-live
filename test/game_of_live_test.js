"use strict";

var should = require('should')

function Cell(x, y) {
  this.x = x
  this.y = y

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

function overflowPosition(value, max) {
  if (value > max) {
    return 0
  } else if (value < 0) {
    return max
  } else {
    return value
  }
}

function Board(numRows, numColumns) {
  var rows = []
  var that = this

  function createRow(x) {
    var row = []
    for (var y = 0; y < numColumns; y++) {
      row.push(new Cell(x, y))
    }
    return row
  }

  for (var x = 0; x < numRows; x++) {
    rows.push(createRow(x))
  }

  this.at = function (x, y) {
    return rows[x][y]
  }

  var allCells = []
  allCells = [].concat.apply(allCells, rows);

  this.assignNeighbourCount = function () {
    allCells.forEach(function (cell) {
      cell.neighbours = neighbourCellsFor(cell).reduce(function (acc, cell) {
        if (cell.isAlive()) acc++
        return acc
      }, 0)
    })
  }

  this.applyRules = function () {
    allCells.forEach(function (cell) {
      cell.applyRules()
    })
  }

  function neighbourCellsFor(cell) {
    var maxRowIndex = numRows - 1
    var maxColumnIndex = numColumns - 1

    return Board.RELATIVE_NEIGHBOURS.reduce(function (neighbourCells, position) {
      var dx = overflowPosition(cell.x + position.x, maxRowIndex)
      var dy = overflowPosition(cell.y + position.y, maxColumnIndex)
      neighbourCells.push(that.at(dx, dy))
      return neighbourCells
    }, [])
  }
}

Board.prototype.step = function () {
  this.assignNeighbourCount()
  this.applyRules()
}

Board.RELATIVE_NEIGHBOURS = [
  {x: -1, y: -1}, {x: -1, y: 0}, {x: -1, y: 1},
  {x: 0, y: -1},                 {x: 0, y: 1},
  {x: 1, y: -1},  {x: 1, y: 0},  {x: 1, y: 1}
]


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

