// inspired from : creating production deployment using create react app documentation
// express server to handle routes in production
// https://create-react-app.dev/docs/deployment/

const express = require('express');
const path = require('path');
const static_server = express();

static_server.use(express.static(path.join(__dirname, 'build')));

static_server.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

static_server.listen(process.env.PORT || 8080);