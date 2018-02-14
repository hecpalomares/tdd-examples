let chai = require('chai');
let path = require('path');

// Tell chai to use "should" style assertions
chai.should();

let Rectangle = require(path.join(__dirname, '..', 'rectangle'));

describe('Rectangle', () => {
  describe('#width', () => {
    let rectangle;

    beforeEach(() => {
      // Create a new Rectangle object before every test.
      rectangle = new Rectangle(10, 20);
    });

    it('returns the width', () => {
      rectangle.width.should.equal(10);
    });

    it('can be changed', () => {
      // Assert that the width can be changed.
      rectangle.width = 30;
      rectangle.width.should.equal(30);
    });
  });

  describe('#height', () => {
    let rectangle;

    beforeEach(() => {
      // Create a new Rectangle object before every test.
      rectangle = new Rectangle(10, 20);
    });

    it('returns the height', () => {
      rectangle.height.should.equal(20);
    });

    it('height can be changed', () => {
      // Assert that the height can be changed.
      rectangle.height = 15;
      rectangle.height.should.equal(15);
    });
  });

  describe('#formulas', () => {
  	let rectangle;

    beforeEach(() => {
      // Create a new Rectangle object before every test.
      rectangle = new Rectangle(10, 15);
    });

    it('returns the area of the rectangle', () => {
    	rectangle.area.should.equal(150);
    });

    it('returns the perimeter of the rectangle', () => {
    	rectangle.perimeter.should.equal(50);
    });

  });

});