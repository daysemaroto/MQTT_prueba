var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://test.mosquitto.org')
const log = require('debug')('bcg:log');



const arrTopics = [
  `prueba/blueGateway/connection`,
];


const payload = JSON.stringify({
  farmId,
  bluegatewayName,
  connection: 'ONLINE',
  lastDate: dayjs().format('YYYY-MM-DD HH:mm:ss.SSS'),
});

client.on('connect', function () {
  client.subscribe(arrTopics, subsOptions, (err, granted) => {
    if (err) {
      log('subscribe error: ', err);
    } else {
      log('subscribe granted: %O', granted);
    }
  });
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log('topic:  ', topic, 'message:  ', message.toString())
  //   client.end()
})