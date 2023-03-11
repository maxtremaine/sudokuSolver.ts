interface Array<number> {
	getMissingDigits(): Array<number>;
}

Array.prototype.getMissingDigits = function() {
	return [...Array(10).keys()].slice(1) // Range from 1 to 9, inclusive.
		.filter(x => !this.includes(x))
}