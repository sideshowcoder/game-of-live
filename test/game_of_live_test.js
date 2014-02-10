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
    it("is dead when new", function () {
      var cell = new Cell()
      cell.isAlive().should.not.be.true
    })

    it("is alive after being revived", function () {
      var cell = new Cell()
      cell.revive()
      cell.isAlive().should.be.true
    })
  })
})

