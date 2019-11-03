/* Author: Robert Steckroth, Bustout, <RobertSteckroth@gmail.com> -- MIT License

Copyright (c) 2020 Robert Steckroth <RobertSteckroth@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

  Brace Maybe adds the ability to selectively skip unit tests while the tests are processing.

  this file is a part of Brace maybe 

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE. */

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
