const { message } = import("./main.js");
// import { message } from "./main.js";
// export const count = 5;
exports.count = 5;
setTimeout(() => {
  console.log("message", message);
}, 0);
