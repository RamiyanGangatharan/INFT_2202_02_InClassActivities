"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hello_1 = require("./hello");
const users_data_1 = require("./users.data");
(0, users_data_1.getData)().then(function (data) {
    (0, hello_1.sayHello)();
    (0, hello_1.sayGoodbye)();
}).catch(function (err) {
    console.error("ERROR: user data not returned");
});
//# sourceMappingURL=server.js.map