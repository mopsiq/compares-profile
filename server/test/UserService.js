const CustomerService = require("./CustomerService");
console.log("Before read UserService code", CustomerService);
class UserService {
  create() {
    let customer = CustomerService.get();
    console.log("Create user");
  }

  get() {
    console.log("get userservice");
    let customer = CustomerService.get();
    console.log({ customer });
  }
}
console.log("before export UserService");
module.exports = new UserService();
