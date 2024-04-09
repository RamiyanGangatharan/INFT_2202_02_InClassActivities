"use strict";

import http from 'http'
import fs from 'fs'
import mime from 'mime-types'

let lookup = mime.lookup
const port = process.env.PORT || 3000;
const server = http.createServer((request, response) =>
{
    let path = request.url as string;
    if (path === "/" || path === "/home" || path === "") { path = "/index.ejs"; }

    let mime_type = lookup(path.substring(1));
    fs.readFile(__dirname + path, function (err, data)
    {
      if(err)
      {
          response.writeHead(404);
          response.end("error 404 - File Not Found!" + err.message);
          return;
      }
      if (!mime_type) { mime_type = 'text/plain'; }

      // set security headers and response within your file.
      response.setHeader("X-Content-Type-Options", "nosniff")
      response.writeHead(200,{'Content-Type' : mime_type});
      response.end(data);
    });
});

server.listen(port, () =>
{console.log(`Server running at http://localhost:${port}/`);})