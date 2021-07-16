var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://test.mosquitto.org', {
  clientId: `mqttjs_${Math.random().toString(16).substr(2, 8)}`,
  clean: false,
  reconnectPeriod: 15000,
  will: {
    topic: 'blueGateway/conection/fct',
    payload: JSON.stringify({
      farmId,
      bluegatewayName,
      connection: 'OFFLINE',
    }),
    qos: 2,
    retain: true,
  },
})
const dayjs = require('dayjs');

const farmId = 1;

const payload = JSON.stringify({
  connection: 'ONLINE',
  lastDate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
});

client.on('connect', function () {
  client.publish('prueba/blueGateway/connection', payload, { qos: 2, retain: true });
})
