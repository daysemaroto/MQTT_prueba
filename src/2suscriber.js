var mqtt = require('mqtt')
const dayjs = require('dayjs');
const farmId = 2;
const clientId =`mqttjs_${Math.random().toString(16).substr(2, 8)}`;

// docker localmente
// var client = mqtt.connect('mqtt://localhost:1883', {

// docker localmente con direccion ip
var client = mqtt.connect('mqtt://192.168.0.105:1883', {


// var client = mqtt.connect('mqtt://broker-mqtt.bluesensor.io', {
  // var client = mqtt.connect('mqtt://test.mosquitto.org', {
  clientId,
  clean: false,
  reconnectPeriod: 15000,
  will: {
    topic: `prueba/blueGateway/v2/connection/${farmId}`,
    payload: JSON.stringify({
      farmId,
      connection: 'OFFLINE',
      lastDate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    }),
    qos: 2,
  },
})


const subsOptions = {
  qos: 2,
};
// const arrTopics = [
//   `blueGateway/${farmId}/feeder/diable/set`,
//   `blueGateway/${farmId}/feeder/dayProgram/set`,
//   `blueGateway/${farmId}/feeder/emptyDayProgram/set`,
//   `blueGateway/${farmId}/feeder/battery/get`,
//   `blueGateway/${farmId}/feeder/testFeeding`,
// ];

const arrTopics = [
  'prueba/blueGateway/1/feeder/diable/set',
];


const payload = JSON.stringify({
  farmId,
  connection: 'ONLINE',
  lastDate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
});

client.on('connect', function () {
  client.publish(`prueba/blueGateway/v2/connection/${farmId}`, payload, { qos: 2 });
  console.log("ya publique");
  client.subscribe(arrTopics, subsOptions, (err, granted) => {
    if (err) {
      console.log('subscribe error: ', err);
    } else {
      console.log('subscribe granted: %O', granted);
    }
  });
})

client.on('offline', () => {
  console.log('offline');
  // process.exit();
});

client.on('error', (err) => {
  console.log('err: ', err);
  client.end();
});

client.on('message', function (topic, message) {
  // message is Buffer
  console.log('topic:  ', topic, 'message:  ', message.toString())
  //   client.end()
})

client.on('close', function () {
  console.log(clientId + ' disconnected')
})