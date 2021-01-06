Object.defineProperty(exports, '__esModule', { value: true });

function register() {
  console.log("registered");
}

var testingGa = {
  register: register,
};
var testingGa_1 = testingGa.register;

exports.default = testingGa;
exports.register = testingGa_1;
