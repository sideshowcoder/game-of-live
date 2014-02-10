"use strict";

var should = require('should')

function Cell() {

  this.isAlive = function () {
    return false
  }

}

describe("Game of Life", function () {
  describe("Cell", function () {
    it("is dead when new", function () {
      var cell = new Cell()
      cell.isAlive().should.not.be.true
    })
  })
})

