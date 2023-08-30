import SockJS from 'sockjs-client';
import { Kafka, logLevel } from 'kafkajs';
import { KafkaTopics } from './topics';
import ip from 'ip';

// initialize kafka producer
const KAFKA_BROKER = process.env.KAFKA_BROKER!;
// const host = process.env.HOST_IP || ip.address();
const kafka = new Kafka({
  brokers: [KAFKA_BROKER],
  // brokers: [`${host}:9092`],
  // brokers: [`kafka-internal.io:9092`],
  logLevel: logLevel.ERROR,
});
const producer = kafka.producer();

// open seismic portal websocket connection
// TODO: type any - issues reconciling imported SockJS type with new sock object and added methods
const sock: any = new SockJS('https://www.seismicportal.eu/standing_order');

// connect the producer and wait for websocket messages
sock.onopen = () => {
  console.log('connected');
  publish();
};

// sock.onmessage = function (e) {
//   let msg = JSON.parse(e.data);
//   console.log('message received : ', msg);
// };

sock.onclose = () => {
  console.log('disconnected');
};

// publish messages from the websocket connection that relate to the US region
const publish = async () => {
  await producer.connect();

  // filter data stream messages for the ones related to the US region only
  sock.onmessage = e => {
    const msg = JSON.parse(e.data);
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
      return publishFilteredMsg(filteredMsg);
    }

    /*
    Seismic Portal message:
    {
      action: "update" | "create",
      data:
      {
        geometry:
        {
          type: 'Point', coordinates: [38.5708, 38.1867, -5] [LON, LAT DEPTH]
        }
        id: "20230829_0000190"
        properties:
      {
        auth:"KOERI"
        depth: 8.5
        evtype: "ke"
        flynn_region: "DODECANESE ISLANDS, GREECE"
        lastupdate: "2023-08-29T17:41:59.15364Z"
        lat: 37.8658
        lon: 26.9448
        mag: 2.5
        magtype: "m"
        source_catalog: "EMSC-RTS"
        source_id: "1546857"
        time: "2023-08-29T17:35:23.4Z"
        unid: "20230829_0000190"
      }
    type: "Feature"
  }

} 
    */
    /*
{
  data:
  {
    id: "20230829_0000190"
    properties:
      {
        depth: 8.5
        lat: 37.8658
        lon: 26.9448
        mag: 2.5
        magtype: "m"
        time: "2023-08-29T17:35:23.4Z"
      }
  }

} 
*/
  };

  const publishFilteredMsg = async filteredMsg => {
    await producer.send({
      topic: KafkaTopics.SeismicEventsUS,
      messages: [
        {
          key: filteredMsg.id,
          value: filteredMsg,
        },
      ],
    });
  };
};
