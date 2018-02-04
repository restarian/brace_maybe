
// This module can be required by mocha itself and overrides the it method to always use the brace_maybe method.

global._proxy = function(title) {
	this._it(title, function(){ })	
}

global._proxy.__defineGetter__("skip", function() {
	return function() {}		
})

global._proxy.__defineSetter__("skip", function() {
	return function() {}		
})

global._proxy.__defineGetter__("only", function() {
	console.log("Brace override does not work with the mocha it.only command.")
	return function() {}		
})

global._proxy.__defineSetter__("only", function(val) {
	return function() {}		
})

global.__defineGetter__("it", function() {
	return this._proxy		
})

global.__defineSetter__("it", function(val) {
	this._it = val
})
