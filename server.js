const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);

const { PORT, HOST } = require('./config');

require('./src/app')(app);

server.listen(PORT, HOST, () => console.log(`Server running on http://${HOST}:${PORT}`)); // eslint-disable-line
