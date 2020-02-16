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

      const subscription = consumerClient.subscribe(
        {
          // The callback where you add your code to process incoming events
          processEvents: async (events, context) => {
            for (const event of events) {
              console.log(
                `Received event: '${event.body}' from partition: '${context.partitionId}' and consumer group: '${context.consumerGroup}'`
              );
            }
          },
          processError: async (err, context) => {
            console.log(`Error : ${err}`);
          }
        },
        { startPosition: earliestEventPosition }
      );
    
      // Wait for a bit before cleaning up the sample
      setTimeout(async () => {
        await subscription.close();
        await consumerClient.close();
        console.log(`Exiting receiveEvents sample`);
      }, 30 * 1000);
    } catch (ex) {
      console.error(ex.message || ex);
    }
  }
}

module.exports = EventHubReader;
