var mqtt = require('mqtt')
const farmId = 1;
var client = mqtt.connect('mqtt://test.mosquitto.org')

client.on('connect', function () {
  client.publish('blueGateway/connection/fct2', null, { qos: 2, retain: true });
  console.log('ya publique');
})
