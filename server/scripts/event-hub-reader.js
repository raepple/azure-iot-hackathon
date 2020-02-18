/*
 * IoT Gateway BLE Script - Microsoft Sample Code - Copyright (c) 2019 - Licensed MIT
 */

const { EventHubConsumerClient, latestEventPosition } = require('@azure/event-hubs');

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
      const subscription = client.subscribe(
        {
          // The callback where you add your code to process incoming events
          processEvents: async (events, context) => {
            for (const event of events) {
              const message =  JSON.stringify(event.body);
              console.log(
                `Received event #: '${event.sequenceNumber}' from partition: '${context.partitionId}' and consumer group: '${context.consumerGroup}' with message: '${message}'`
              );
              console.log("Temperature: %s", event.body.temperature);
              console.log("Humidity: %s", event.body.humidity);              
            
              return startReadMessageCallback(event.body);
            }
          },
          processError: async (err, context) => {
            console.log(`Error : ${err}`);
          }
        },
        { startPosition: latestEventPosition }
      );
    } catch (ex) {
      console.error(ex.message || ex);
    }
  }
}

module.exports = EventHubReader;
