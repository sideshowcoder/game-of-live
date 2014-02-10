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

}

describe("Game of Life", function () {
  describe("Cell", function () {
    var cell

    beforeEach(function () {
      cell = new Cell()
    })

    it("is dead when new", function () {
      cell.isAlive().should.not.be.true
    })

    it("is alive after being revived", function () {
      cell.revive()
      cell.isAlive().should.be.true
    })
  })
})

