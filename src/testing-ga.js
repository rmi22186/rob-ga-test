/* eslint-disable no-undef */
var isobject = require("isobject");

var name = "robtest",
  version = "1.0.0";

function register() {
  console.log("registered");
}

module.exports = {
  register: register,
};
