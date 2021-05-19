const mqtt = require('mqtt');


exports.connectmqtt = () => {

    this.mqttClient = mqtt.connect('mqtt://144.91.113.92:1883', { username: 'siti', password: 'siti@2021' });

    this.mqttClient.on('error', (err) => {
        console.log("Error MQTT : " + err);
        this.mqttClient.end();
    });

    this.mqttClient.on('connect', () => {
        console.log(`mqtt client connected`);
    });

    this.mqttClient.subscribe('#');

    this.mqttClient.on('message', function (topic, message) {
        console.log(topic + " : " + message.toString());
    });

    this.mqttClient.on('close', () => {
        console.log(`mqtt client disconnected`);
    });
}

//   Sends a mqtt message to topic: mytopic
//    sendMessage(message) {
//      this.mqttClient.publish('F01/R01/M03/flow', message);   }


