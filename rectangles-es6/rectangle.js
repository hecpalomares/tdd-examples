class Rectangle {

	// Constructor of the Class
	constructor(width, height) {
		this.width = width;
		this.height = height;
	}	

	// Getters of the property
	get width() {
		return this._width;
	}

	get height() {
		return this._height;
	}

	// Setters
	set width(value) {
		if(typeof value !== "number") {
			throw new Error('Width must be a number');
		}
		this._width = value;
	}

	set height(value) {
		if(typeof value !== "number") {
			throw new Error('Height must be a number');
		}
		this._height = value;
	}

	// Getters as functions
	get area() {
		return this.width * this.height;
	}

	get perimeter() {
		return (2 * this.width) + (2 * this.height);
	}

}

// Exporting the Rectangle class to be used with require() by another file.
module.exports = Rectangle;