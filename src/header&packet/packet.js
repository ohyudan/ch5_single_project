class Packet {
  packet_Resive = (data) => {
    console.log('data:' + data.subarray(5, data.length));
    return data.subarray(5, data.length);
  };

  packet_Response = (data) => {
    const result = Buffer.from(data);
    return result;
  };
}

const packet = new Packet();
export default packet;
