#!/usr/bin/env node

/**
 * Module dependencies.
 */
import debug from 'debug';
import http from 'http';
import app from './config/app';
import {AddressInfo, Server} from "node:net";

// Setup debug with a specific namespace, e.g., 'your-app-name:server'
const debugLog = debug('your-app-name:server');

const port: string | number | boolean = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server: Server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val: string) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

function onError(error: { syscall: string; code: any; }) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr: AddressInfo | string | null = server.address();
  const bind: string = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + port;
  debugLog('Listening on ' + bind);
}

export default server;