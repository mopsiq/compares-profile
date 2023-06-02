const UserService = require("./UserService");
console.log("Before read CustomService code", UserService);
class CustomerService {
  create() {
    UserService.create();
    console.log("Create Customer");
  }

  get() {
    return {
      name: "test",
    };
  }
}
console.log("before export CustomService");
module.exports = new CustomerService();
