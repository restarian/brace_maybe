/* MIT License
Copyright (c) 2018 Robert Steckroth <RobertSteckroth@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

  Mocha maybe adds the ability to selectively skip unit tests while the tests are processing.

  this file is a part of Mocha maybe 

 Author: Robert Edward Steckroth II, Bustout, <RobertSteckroth@gmail.com> */
  
module.exports = function(instance) {
	// The argument (instance), is either the prototype of a mocha describe statement or the global object.
	// Note: The use if the Function constructor is sub-optimal in javascript because the engine has a hard time pre-compiling code with string based
	// functions but it is fine for use in unit tests where performance is not a significant concern.
	var it_might = (function(label, fn) {
		// A new Function is used so that the function arguments (which mocha identifies and inserts), can be created. The done
		// argument that mocha uses will be the second argument if one was used in the caller function. Mocha inserts the asynchronouse done
		// function as the last argument of the provided it callback internally. The fn (callback), also needs to be bound as an argument
		// because of how the Function constructor looses all scoping and thusly fn argument of the parent enclosure would not be available.
		it(label, new Function("fn" + (fn.length&&",done"||""), "if ( this.stop ) { if ( !this.quiet ) console.log(' -X- skipping test: "+label+"'); "+
			// arguments[1] (the done function mocha inserts), may be undefined if it was not included in the original (fn), but
			// it is ok to pass undefined into the fn.call function anyways. It is called if the signal to stop is set however if 
			// it is inserted so that testing flow resumes. If stop is set, the function returns as if it was nothing more
			// than an empty it statement. I.g. it(label, function(){}) 
			"if ( typeof arguments[1] === 'function' ) arguments[1]() } else fn.call(this, arguments[1])").bind(this, fn))

	}).bind(instance)

	// The built-in mocha it members are proxied to the it_might Object via a getter loop.
	for ( var member in it )
		it_might.__defineGetter__(member, (function(key) {
			
			return function(label, fn) { 
			 // This function is the same as the one defined in the constructor. It is call through any members of the mocha it Object first however.
			 it[key](label, new Function("fn" + (fn.length&&",done"||""), "if ( this.stop ) { if ( !this.quiet ) console.log(' -X- skipping test: "+label+"');"+
					"if ( typeof arguments[1] === 'function' ) arguments[1]() } else fn.call(this, arguments[1])").bind(this, fn))
				}

		// The member value needs to be bound to the getter function or the value of key will not be saved though out the iteration. In ECMA6 
		// the let keyword is used to avoid this but the instance needs to be bound to the getter anyways so the old technique is used still.
		}).bind(instance, member))

	return it_might
}
