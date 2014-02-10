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
})

