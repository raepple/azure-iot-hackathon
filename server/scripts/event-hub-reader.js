/*
 * IoT Gateway BLE Script - Microsoft Sample Code - Copyright (c) 2019 - Licensed MIT
 */

const { EventHubConsumerClient, EventPosition } = require('@azure/event-hubs');

class EventHubReader {
  constructor(connectionString, consumerGroup) {
    this.connectionString = connectionString;
    this.consumerGroup = consumerGroup;
    this.eventHubClient = undefined;
    this.receiveHandlers = undefined;
  }

  async startReadMessage(startReadMessageCallback) {
    try {
      console.log('Start read message');
      const client = new EventHubConsumerClient(this.consumerGroup, this.connectionString);
    
      this.eventHubClient = client;

      const partitionIds = await this.eventHubClient.getPartitionIds();
      console.log('The partition ids are: ', partitionIds);

      const onError = (err) => {
        console.error(err.message || err);
      };

      const onMessage = (message) => {
        const deviceId = message.annotations['iothub-connection-device-id'];
        console.log("onMessage reveived from device id [%s]", deviceId);
        return startReadMessageCallback(message.body, message.enqueuedTimeUtc, deviceId);
      };

      this.receiveHandlers = partitionIds.map(id => this.eventHubClient.receive(id, onMessage, onError, {
        eventPosition: EventPosition.fromEnqueuedTime(Date.now()),
        consumerGroup: this.consumerGroup,
      }));
    } catch (ex) {
      console.error(ex.message || ex);
    }
  }

  // Close connection to Event Hub.
  async stopReadMessage() {
    const disposeHandlers = [];
    this.receiveHandlers.forEach((receiveHandler) => {
      disposeHandlers.push(receiveHandler.stop());
    });
    await Promise.all(disposeHandlers);

    this.eventHubClient.close();
  }
}

module.exports = EventHubReader;