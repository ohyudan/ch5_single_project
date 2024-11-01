import { CLIENT_VERSION } from '../constants/env.js';
import { getProtoTypeNameByHandlerID } from '../handle/index.js';
import { getProtoMessages } from '../init/loadProto.js';
export const packetParser = (data) => {
  const protoMessages = getProtoMessages();

  const commonPacket = protoMessages.common.Packet;

  let packet;

  try {
    packet = commonPacket.decode(data);
  } catch (e) {
    console.error(e);
  }
  const handlerId = packet.handlerId;
  const userId = packet.userId;
  const clientVersion = packet.version;

  if (clientVersion !== CLIENT_VERSION) {
    throw Error();
  }
  const protoTypeName = getProtoTypeNameByHandlerID(handlerId);

  if (!protoTypeName) {
    throw Error();
  }

  const [namespace, typeName] = protoTypeName.split('.');
  const payloadType = protoMessages[namespace][typeName];

  try {
    payload = payloadType.decode(packet.payload);
  } catch (e) {
    console.error(e);
  }

  const expectedFieIds = Object.keys(payloadType.fields);
  const actualFields = Object.keys(payload);
  const missingFields = expectedFieIds.filter(
    (field) => !actualFields.includes(field)
  );
  if (missingFields > 0) {
    throw Error();
  }
  return { handlerId, userId, payload };
};
