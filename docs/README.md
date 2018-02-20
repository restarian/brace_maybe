# Brace Maybe
### Synopsis

#### Brace maybe adds the ability to skip unit tests at run-time with the mocha testing framework to only show failed tests which matter.

[![Build status](https://ci.appveyor.com/api/projects/status/8ou8s3c7ocq0972h/branch/master?svg=true)](https://ci.appveyor.com/project/restarian/brace-maybe/branch/master) [![Downloads](https://img.shields.io/npm/dm/brace_maybe.svg?svg=true)](https://npmjs.org/package/brace_maybe)


| A part of the [Brace suite](https://github.com/restarian/restarian/blob/master/brace/README.md)| Developed with Windows 10 and Ubuntu 16 
| ---- | ----
| ![Brace](https://raw.githubusercontent.com/restarian/restarian/master/brace/doc/image/brace_logo_small.png) | [![Ubuntu on Windows](https://raw.githubusercontent.com/restarian/restarian/master/doc/image/ubuntu_windows_logo.png)](https://github.com/Microsoft/BashOnWindows) | 

---
### Document pages
* **Synopsis**
* [License information](https://github.com/restarian/brace_maybe/blob/master/docs/license.md)
* [Project specification data](https://github.com/restarian/brace_maybe/blob/master/docs/specification.md)

---

**Author: Robert Steckroth, _Bust0ut_ [<RobertSteckroth@gmail.com>](mailto:robertsteckroth@gmail.com)**

**Licensed under: MIT**

**Bonuses:**
* Finding what test failed is now possible in large unit test files.

**Caveats:**
  * Not unit tested (extensive use in many projects however).

Below is an example of how to use Brace maybe in unit tests.

```javascript
var maybe = require("brace_maybe")
var it_will = global

describe("Using stop further progression methodology for dependencies in: "+path.basename(__filename), function() { 

	// The it property is mutated by brace_maybe to allow for other functionality. It still has the same functionality as the original however.
	var it = maybe(it_will)	
	it_will.stop = !!process.env.DRY_RUN  
	it_will.quiet = !!process.env.QUIET

	it("r_js in the system as a program", function(done) {
		it_will.stop = true 
		expect((function() {try { require("requirejs"); return true; } catch(e) { return e;}})(), "could not find r.js dependency").to.be.true
		// This is the only way to proceed with the other tests.
		it_will.stop = false 
		done()
	})

	describe("Running unit tests", function() { 
		var requirejs
		beforeEach(function() {
			remove_cache()
			requirejs = require("requirejs")
			requirejs.config({baseUrl: path.join(__dirname, "..", "lib"), nodeRequire: require})

		})

		// This test will never run if the requirejs module is not available above.
		it("can load the module", function(done) {

			requirejs(["yourModule"], function(mod) { 
				expect(true).to.be.true
				done()
			})
		})

		// All of the built-in mocha it functionality works the same way.
		//it.skip("This is a skipped test", function(done) { })
		//it.only("This is the only test which will run", function(done) { })
	})
})

```
