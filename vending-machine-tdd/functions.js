'use strict';

/**
 * getChange accepts two parameters (price and paid) and calculates
 * the change in "coins" that needs to be returned.
 * @param {number} price the integer amount (in pennies) to be paid
 * @param {number} paid the integer amount (in pennies) the person paid
 * @returns {array} list of coins we need to dispense to the person as change
 * @example
 * getChange(215, 300); // returns [50, 20, 10, 5]
 */
function getChange(price, paid) {

	const COINS = [200, 100, 50, 20, 10, 5, 2, 1];

	let totalDifference = paid - price;
	let change = [];

	COINS.forEach(function(coin) {
		// Keep adding the current coin until the coin is larger than the difference
		while(totalDifference >= coin){
			change.push(coin);
			totalDifference = totalDifference - coin;
		}
	});

	return change;
}