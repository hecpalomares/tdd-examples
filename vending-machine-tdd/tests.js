 // This is what a simple unit test looks like:
test('getChange(1, 1) should equal [] - and empty array', function(assert) {
	let result = getChange(1, 1); // no change/coins just and empty array
	let expected = [];
	assert.deepEqual(result, expected);
});