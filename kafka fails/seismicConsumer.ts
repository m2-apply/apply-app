import { v4 as uuidv4 } from 'uuid';
import { Kafka, logLevel } from 'kafkajs';
import { KafkaTopics } from './topics';
import ip from 'ip';

// initialize consumer
const KAFKA_BROKER = process.env.KAFKA_BROKER!;
// const host = process.env.HOST_IP || ip.address();
const kafka = new Kafka({
  brokers: [KAFKA_BROKER],
  //   brokers: [`${host}:9092`],
  //   brokers: [`kafka-internal.io:9092`],
  logLevel: logLevel.ERROR,
});
const consumer = kafka.consumer({ groupId: `seismic-${uuidv4()}` });

const run = async () => {
  await consumer.connect();

  // subscribe to seismic events topic
  await consumer.subscribe({
    topic: KafkaTopics.SeismicEventsUS,
    fromBeginning: false,
  });

  await consumer.run({
    eachMessage: async ({ message }) => {
      //   const parsedMsg = JSON.parse(message);
      //   console.log(parsedMsg);
      console.log(message);
    },
  });
};

run();
