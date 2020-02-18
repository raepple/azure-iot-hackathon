/* eslint-disable max-classes-per-file */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
$(document).ready(() => {
    // if deployed to a site supporting SSL, use wss://
    const protocol = document.location.protocol.startsWith('https') ? 'wss://' : 'ws://';
    const webSocket = new WebSocket(protocol + location.host);
  
    // A class for holding the last N points of telemetry for a device
    class DeviceData {
      constructor(deviceId) {
        this.deviceId = deviceId;
        this.maxLen = 50;
        this.timeData = new Array(this.maxLen);
        this.temperatureData = new Array(this.maxLen);
        this.humidityData = new Array(this.maxLen);
      }
  
      addData(time, temperature, humidity) {
        this.timeData.push(time);
        this.temperatureData.push(temperature);
        this.humidityData.push(humidity || null);
  
        if (this.timeData.length > this.maxLen) {
          this.timeData.shift();
          this.temperatureData.shift();
          this.humidityData.shift();
        }
      }
    }
  
    // When a web socket message arrives:
    // 1. Unpack it
    // 2. Validate it has date/time and temperature
    // 3. Find or create a cached device to hold the telemetry data
    // 4. Append the telemetry data
    // 5. Update the chart UI
    webSocket.onmessage = function onMessage(message) {
      try {
        const messageData = JSON.parse(message.data);
        console.log(messageData);
  
        // time and either temperature or humidity are required
        if (!messageData.MessageDate || (!messageData.IotData.temperature && !messageData.IotData.humidity)) {
          return;
        }
      } catch (err) {
        console.error(err);
      }
    };
  });