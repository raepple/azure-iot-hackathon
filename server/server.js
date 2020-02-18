const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');
const EventHubReader = require('./scripts/event-hub-reader.js');

const iotHubConnectionString = 'Endpoint=sb://iothub-ns-iot-hub-ha-2914707-0e84ea5949.servicebus.windows.net/;SharedAccessKeyName=iothubowner;SharedAccessKey=/OcmYiar28Y/0WslL7MOzlp4Jvh1nJ6bG8/gG5/FNfo=;EntityPath=iot-hub-hackathon-smbsumm';
const eventHubConsumerGroup = 'weatherdatacg';

// Redirect requests to the public subdirectory to the root
const app = express();
app.use(express.static(path.join(__dirname, 'www')));
app.use((req, res /* , next */) => {
  res.redirect('/');
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.broadcast = (data) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      try {
        console.log(`Broadcasting data ${data}`);
        client.send(data);
      } catch (e) {
        console.error(e);
      }
    }
  });
};

server.listen(process.env.PORT || '3000', () => {
  console.log('Listening on %d.', server.address().port);
});

const eventHubReader = new EventHubReader(iotHubConnectionString, eventHubConsumerGroup);

(async () => {
  await eventHubReader.startReadMessage((event) => {
    try {
      wss.broadcast(JSON.stringify(event));
    } catch (err) {
      console.error('Error broadcasting: [%s]', err);
    }
  });
})().catch();