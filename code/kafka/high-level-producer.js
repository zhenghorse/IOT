var kafka = require('kafka-node');
var HighLevelProducer = kafka.HighLevelProducer;
var Client = kafka.Client;
var client = new Client('192.168.51.13:2181');
var argv = require('optimist').argv;
var topic = argv.topic || 'mqtt-topic';
var count = 10, rets = 0;
var producer = new HighLevelProducer(client);

producer.on('ready', function () {
    setInterval(send, 1000);
});

producer.on('error', function (err) {
    console.log('error', err)
})

function send() {
    var message = new Date().toString();
    producer.send([
      {topic: topic, messages: [message] }
    ], function (err, data) {
        if (err) console.log(err);
        else console.log('send %d messages', ++rets);
        if (rets === count) process.exit();
    });
}
