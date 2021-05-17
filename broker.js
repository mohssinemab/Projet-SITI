var mqtt = require('mqtt');

settings = {    
    username: "siti",
    password: "siti@2021",
};
var client = mqtt.connect("mqtt://144.91.113.92:1883", settings)



client.on("connect", () => {
    console.log("---Connected !!");
})

client.subscribe('#');


client.on('message', (path, value) => {

    console.log('received message %s ----- %s   ', path, value)
})

client.on("error", (error) => {
    console.log("Not connected : " + error);
})
