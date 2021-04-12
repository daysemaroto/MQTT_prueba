var mqtt = require('mqtt')
const farmId = 1;
var client = mqtt.connect('mqtt://test.mosquitto.org')

client.on('connect', function () {
  client.publish('blueGateway/5e87be15a21fe64c3bfa828e/conection/fct', null, { qos: 2, retain: true });
  console.log('ya publique');
})
