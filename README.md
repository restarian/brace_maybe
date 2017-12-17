# Brace Maybe
### Synopsis

----
### Document pages
* [License information](https://github.com/restarian/brace_maybe/blob/master/doc/license.md)

----

#### This module adds the ability to skip unit tests at run-time with the mocha testing framework to show failed tests that matter.

[![Build status](https://ci.appveyor.com/api/projects/status/8ou8s3c7ocq0972h/branch/master?svg=true)](https://ci.appveyor.com/project/restarian/brace-maybe/branch/master) [![Downloads](https://img.shields.io/npm/dm/brace_maybe.svg?svg=true)](https://npmjs.org/package/brace_maybe)


| A part of the [Brace suite](https://github.com/restarian/restarian/blob/master/brace/README.md)| Developed with Windows 10 and Ubuntu 16 
| ---- | ----
| ![Brace](https://raw.githubusercontent.com/restarian/restarian/master/brace/doc/image/brace_logo_small.png) | [![Ubuntu on Windows](https://raw.githubusercontent.com/restarian/restarian/master/doc/image/ubuntu_windows_logo.png)](https://github.com/Microsoft/BashOnWindows) | 


### Document pages
* [Licenses](https://github.com/restarian/brace_/blob/master/doc/license.md)

----

**Author: Robert Steckroth, _Bust0ut_ [<RobertSteckroth@gmail.com>](mailto:robertsteckroth@gmail.com)**

**Licensed under: MIT**

**Bonuses:**
* Finding what test failed is now possible in large unit test files.

**Caveats:**
  * Not unit tested (extensive use in many projects however).

Below is an example of how to use Brace maybe in unit tests.

```javascript


var maybe = require("brace_maybe"),
	expect = require("chai").expect,
	command_exist = require("command-exists"),
	path = require('path')


describe("Brace maybe unit testing - "+path.basename(__filename) , function() { 

	
	// The stop property of the first describe enclosure is used to control test skipping.
	var it_will = this
	it_will.stop = false
	var it_might = maybe(it_will)	

	describe("Checking test file dependencies..", function() { 

		it_might("finds r_js in the system as a program", function(done) {

			// this.stop needs to be de-scoped for use inside the command_exist enclosure.
			command_exist("r_js", function(err, success ) {
				if ( success ) {
					done()
				} else {
					// This will signal to that brace maybe that all the other unit tests using the "it" returned by the maybe function call, replacement should be ignored.
					it_will.stop = true 
					expect(false).to.equal(true)
					done()
				} 
			})
		})

		it_might("has all module dependencies available", function(done) {

			// Signal to stop all other tests first.
			it_will.stop = true 
			expect(require("requirejs"), "requirejs was not found on system").to.be.a("function").that.have.property("config")
			// If the above test succeeds than the signal to stop (this.stop), is turned back off. This commands below will not be reached if the expect
			// call is failed (the test is stopped by mocha).
			it_will.stop = false 
			done()
		})

		// All of the built-in mocha it functionality works the same way.
		//it_might.skip("This is a  skipped test", function(done) { })
		//it_might.only("This is the only test which will run", function(done) { })
	})
})

```
