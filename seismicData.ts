import fs from 'fs';
import path from 'path';
// import { fileURLToPath } from 'url';
// const __dirname = path.dirname(fileURLToPath(import.meta.url));
import SockJS from 'sockjs-client';
import { Kafka, logLevel } from 'kafkajs';
import { KafkaTopics } from './topics';

//! initialize producer and consumer
const KAFKA_BROKER_ADDRESS = process.env.KAFKA_BROKER!;
const kafka = new Kafka({
  brokers: [KAFKA_BROKER_ADDRESS],
  logLevel: logLevel.ERROR,
});
const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'seismic-consumer' });

//! open seismic portal websocket connection
const sock: any = new SockJS('https://www.seismicportal.eu/standing_order');

// connect producer when connecting to websocket interface
sock.onopen = async () => {
  console.log('connected');
  await producer.connect();
};
// publish messages related to the US region
sock.onmessage = function (e) {
  const msg = JSON.parse(e.data);
  console.log('message received : ', msg);
  publish(msg);
};
sock.onclose = () => {
  console.log('disconnected');
};

//! filter data stream messages for the messages related to the US region only and publish
const publish = async msg => {
  console.log('message received : ', msg);
  const latitude = msg.data.properties.lat;
  const longitude = msg.data.properties.lon;

  //   if (
  //     latitude >= 20 &&
  //     latitude <= 60 &&
  //     longitude <= -50 &&
  //     longitude >= -140
  //   ) {
  const filteredMsg = {
    id: msg.data.id,
    depth: msg.data.properties.depth,
    lat: latitude,
    lon: longitude,
    mag: msg.data.properties.mag,
    magtype: msg.data.properties.magtype,
    time: msg.data.properties.time,
  };
  console.log('filteredMsg', filteredMsg);

  await producer.send({
    topic: KafkaTopics.SeismicEventsUS,
    messages: [
      {
        key: filteredMsg.id,
        value: JSON.stringify(filteredMsg),
      },
    ],
  });
  //   }
};

// connect consumer and subscribe to seismic topic
const run = async () => {
  //   await producer.connect();
  await consumer.connect();

  await consumer.subscribe({ topic: KafkaTopics.SeismicEventsUS });

  await consumer.run({
    eachMessage: async ({ message }) => {
      console.log({
        offset: message.offset,
        value: message.value?.toString(),
        key: message.key?.toString(),
      });
      //   ! connect to external db
      fs.writeFileSync(
        // path.resolve(__dirname, '/seismicDataUS.json'),
        './seismicDataUS.json',
        JSON.stringify(message.value),
      );
    },
  });
};

run();
