const http = require('http');
const path = require('path');

const express = require('express');

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 3010;
const HOST = process.env.IP || '0.0.0.0';

require('./src/app')(app);

app.use(express.static(path.resolve(__dirname, 'public'))); // configure static directory

server.listen(PORT, HOST, () => console.log(`Server running on http://${HOST}:${PORT}`));
