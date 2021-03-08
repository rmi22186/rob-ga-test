Object.defineProperty(exports, '__esModule', { value: true });

/*!
 * isobject <https://github.com/jonschlinkert/isobject>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

function isObject(val) {
  return val != null && typeof val === 'object' && Array.isArray(val) === false;
}

var isobject = /*#__PURE__*/Object.freeze({
  'default': isObject
});

function getCjsExportFromNamespace (n) {
	return n && n['default'] || n;
}

getCjsExportFromNamespace(isobject);

function register() {
  console.log("registered");
}

var testingGa = {
  register: register,
};
var testingGa_1 = testingGa.register;

exports.default = testingGa;
exports.register = testingGa_1;
