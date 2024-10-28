class Header {
  header_Add = (datalength, handle_ID) => {
    const lengthBuffer = Buffer.alloc(4);
    lengthBuffer.writeInt32BE(datalength + 4, 0);
    const handle_IDBuffer = Buffer.alloc(1);
    handle_IDBuffer.writeInt32BE(handle_ID, 0);

    const resultBuffer = Buffer.concat([lengthBuffer, handle_IDBuffer]);
    return resultBuffer;
  };
  haeder_Resive_check = (data) => {
    const lengthBuffer = data.readInt32BE(0);
    const handle_ID = data.readInt8(4);
    const result = { lengthBuffer: lengthBuffer, handle_ID: handle_ID };
    return result;
  };
}

const header = new Header();

export default header;
