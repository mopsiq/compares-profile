const CustomerService = require("./CustomerService");
const UserService = require("./UserService");

console.log("Before call CustomService.create");
CustomerService.create();
console.log("Before call UserService.get");
UserService.get();
