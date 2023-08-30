import SockJS from 'sockjs-client';
import { Kafka, logLevel } from 'kafkajs';
import { KafkaTopics } from './topics';
import db from './server/src/config/postgresSchema';

// initialize producer and consumer
const KAFKA_BROKER_ADDRESS = process.env.KAFKA_BROKER!;
const kafka = new Kafka({
  brokers: [KAFKA_BROKER_ADDRESS],
  logLevel: logLevel.ERROR,
});
const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'seismic-consumer' });

// open seismic portal websocket connection
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

// filter data stream messages for the messages related to the US region only and publish
const publish = async msg => {
  console.log('message received : ', msg);
  const latitude = msg.data.properties.lat;
  const longitude = msg.data.properties.lon;

  if (
    latitude >= 20 &&
    latitude <= 60 &&
    longitude <= -50 &&
    longitude >= -140
  ) {
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
  }
};

// connect consumer and subscribe to seismic topic
const run = async () => {
  await consumer.connect();

  await consumer.subscribe({ topic: KafkaTopics.SeismicEventsUS });

  await consumer.run({
    eachMessage: async ({ message }) => {
      console.log({
        offset: message.offset,
        value: message.value?.toString(),
        key: message.key?.toString(),
      });
      if (message.value !== undefined) {
        const data: any = message.value?.toString();
        const obj = JSON.parse(data);
        const values = Object.values(obj);
        console.log('values', values);
        // check if this is a newly reported earthquake or an update
        let exists: boolean = false;
        db.query(
          `SELECT EXISTS (SELECT sp_id FROM earthquakes WHERE sp_id = $1)`,
          [values[0]],
        )
          .then(data => {
            console.log('exists', exists);
            console.log('data', data);
            exists = data;
            // update table if the message contains earthquake updates
            if (exists) {
              // update created_at column to reflect the update time
              const date = new Date();
              values.push(date.toISOString());
              db.query(
                'UPDATE earthquakes SET depth = $2, lat = $3, lon = $4, mag = $5, magtype = $6, time = $7, created_at = $8 WHERE sp_id = $1',
                values,
              )
                .then(data => console.log('update', data.rows[0]))
                .catch(err =>
                  console.log('error updating earthquake table', err),
                );
            }
            // add earthquake to table if new earthquake report was received
            else {
              db.query(
                'INSERT INTO earthquakes (sp_id, depth, lat, lon, mag, magtype, time) VALUES ($1, $2, $3, $4, $5, $6, $7)',
                values,
              )
                .then(data => console.log('insert', data.rows[0]))
                .catch(err =>
                  console.log('error inserting data into db: ', err),
                );
            }
          })
          .catch(err => console.log('error checking earthquake table:', err));
      }
    },
  });
};

run();
