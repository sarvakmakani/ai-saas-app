const express = require('express');
const http = require('http');
const { app } = require('./app');

const server = http.createServer(app);

server.listen(process.env.PORT || 5000, () => { 
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});