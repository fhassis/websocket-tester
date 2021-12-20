import { WebSocket, WebSocketServer } from 'ws';

// defines ip and port
const port = 8000;
const host = '0.0.0.0';

// creates websocket server
const wss = new WebSocketServer({ host, port });

wss.on('connection', function connection(ws) {
	// print when connecting
	console.log('connection opened');

    // handle received messages
	ws.on('message', function echo(data) {
        // print message received
		console.log('received: %s', data);

        // send the message back
        ws.send(data);
	});

    // handles pong messages
    ws.on('pong', () => console.log('pong received'));

    // handles disconnection
    ws.on('close', () => console.log('connection closed'))

    // sends a ping message every 3 seconds
    let pingInterval = setInterval(() => ws.ping(), 3000);

    // sends a message every 1 second
    let counter = 0;
    let msgInterval = setInterval(() => ws.send(`counter: ${counter++}`), 1000);

    // disconnects after 30 seconds
    setTimeout(() => {
        // clear intervals
        clearInterval(msgInterval);
        clearInterval(pingInterval);

        // sends a disconnect message
        ws.close();
    }, 30000);
	
});

console.log(`ws server started at ${host}:${port} ...`);