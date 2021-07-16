var mqtt = require('mqtt')
const dayjs = require('dayjs');
const farmId = 3;
var client = mqtt.connect('mqtt://test.mosquitto.org', {
  clientId: `mqttjs_${Math.random().toString(16).substr(2, 8)}`,
  clean: false,
  reconnectPeriod: 15000,
  will: {
    topic: 'prueba/blueGateway/connection',
    payload: JSON.stringify({
      farmId,
      connection: 'OFFLINE',
    }),
    qos: 2,
    retain: true,
  },
})


const payload = JSON.stringify({
  farmId,
  connection: 'ONLINE',
  lastDate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
});

client.on('connect', function () {
  client.publish('prueba/blueGateway/connection', payload, { qos: 2, retain: true });
})
