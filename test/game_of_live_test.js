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
  if (this.neighbours < 2) {
    this.die()
  } else if (this.neighbours === 3) {
    this.revive()
  }
}

describe("Game of Life", function () {
  describe("Cell rules", function () {
    var cell

    beforeEach(function () {
      cell = new Cell()
    })

    it("dies with less then 2 living neighbors if alive", function () {
      cell.revive()
      cell.neighbours = 1
      cell.applyRules()
      cell.isAlive().should.be.not.be.true
    })

    it("is revived with exactly 3 living neighbours if dead", function () {
      cell.neighbours = 3
      cell.applyRules()
      cell.isAlive().should.be.be.true
    })
  })
})

