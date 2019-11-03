# Brace Maybe
### Package Specifications

----

### Brace Maybe help pages
* [Synopsis](https://github.com/restarian/brace_maybe/blob/master/docs/synopsis.md)
* Specification
  * [License information](https://github.com/restarian/brace_maybe/blob/master/docs/specification/license_information.md)
  * **Package information**
----

**Version**: 0.1.4

**Description**: This module adds stop testing functionality to the mocha unit testing framework.

**Author**: [Robert Steckroth](mailto:RobertSteckroth@gmail.com)

**Development dependencies**: [mocha](https://npmjs.org/package/mocha) [chai](https://npmjs.org/package/chai)

**Package scripts**:

| Name | Action |
| ---- | ------ |
 | mocha | ```test``` |
 | make_docs | ```brace_document -i docs_raw -b docs -r --navlink --link --link-dest README.md --link-path docs/synopsis.md --force-title --title "Brace Maybe help pages" --sort depth``` |
 | make_docs_extra | ```npm run make_docs -- --specification``` |

**Keywords**: *mocha*, *skip*, *stop*

**Technologies used in development**:
  * [VIM](https://vim.org) As an IDE
  * [Windows 10](https://www.microsoft.com/en-us/software-download/windows10) For unit testing and as the base operating system
  * [Ubuntu on Windows](https://www.microsoft.com/en-us/store/p/ubuntu/9nblggh4msv6) As the development operating environment
  * [Git](https://git-scm.com) For repository management
  * [Github](https://github.com) For repository storage
  * [NPM](https://npmjs.org) For module storage
  * [Blender](https://blender.org) For logo design and rendering