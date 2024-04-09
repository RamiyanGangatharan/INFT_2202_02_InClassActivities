"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const fs_1 = __importDefault(require("fs"));
const mime_types_1 = __importDefault(require("mime-types"));
let lookup = mime_types_1.default.lookup;
const port = process.env.PORT || 3000;
const server = http_1.default.createServer((request, response) => {
    let path = request.url;
    if (path === "/" || path === "/home" || path === "") {
        path = "/index.ejs";
    }
    let mime_type = lookup(path.substring(1));
    fs_1.default.readFile(__dirname + path, function (err, data) {
        if (err) {
            response.writeHead(404);
            response.end("error 404 - File Not Found!" + err.message);
            return;
        }
        if (!mime_type) {
            mime_type = 'text/plain';
        }
        response.setHeader("X-Content-Type-Options", "nosniff");
        response.writeHead(200, { 'Content-Type': mime_type });
        response.end(data);
    });
});
server.listen(port, () => { console.log(`Server running at http://localhost:${port}/`); });
//# sourceMappingURL=server.js.map