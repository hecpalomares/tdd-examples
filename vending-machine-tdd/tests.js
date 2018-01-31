 // This is what a simple unit test looks like:
test('getChange(215, 300) should equal [50, 20, 10, 5]', function(assert) {
	let result = getChange(215, 300); // no change/coins just and empty array
	let expected = [50, 20, 10, 5];
	assert.deepEqual(result, expected);
});

test('getChange(468, 600) should equal [100, 20, 10, 2]', function(assert) {
	let result = getChange(468, 600); // no change/coins just and empty array
	let expected = [100, 20, 10, 2];
	assert.deepEqual(result, expected);
});

test('getChange(112, 150) should equal [20, 10, 5, 2, 1]', function(assert) {
	let result = getChange(112, 150); // no change/coins just and empty array
	let expected = [20, 10, 5, 2, 1];
	assert.deepEqual(result, expected);
});

test('getChange(2, 5) should equal [2, 1]', function(assert) {
	let result = getChange(2, 5); // no change/coins just and empty array
	let expected = [2, 1];
	assert.deepEqual(result, expected);
});