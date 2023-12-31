/* eslint-disable no-undef */
import { app } from './app.js';
// const debug = require("debug")("node-angular");
import * as http from 'http';

const normalizePort = val =>
{
    var port = parseInt(val, 10);

    if (isNaN(port))
    {
        // named pipe
        return val;
    }

    if (port >= 0)
    {
        // port number
        return port;
    }

    return false;
};

const onError = error =>
{
    console.error(error);
    if (error.syscall !== 'listen') 
    {
        throw error;
    }
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + port;
    switch (error.code) 
    {
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
};

const onListening = () =>
{
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + port;
    console.log('Listening on ' + bind);
};


const port = normalizePort(process.env.PORT || '3339');

app.set('port', port);

app.get('*', function(req, res)
{
    res.status(404).send('what???: ' + req.path);
});

const server = http.createServer(app);
server.on('error', onError);
server.on('listening', onListening);

server.listen(port);
