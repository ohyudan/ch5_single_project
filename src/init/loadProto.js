import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import protobuf from 'protobufjs';
import { packetNames } from '../protobuf/response/packetName.js';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
const protoDir = path.join(__dirname, '../protobuf');
const getAllProtoFiles = (dir, fileList = []) => {
  const files = fs.readdirSync(dir);
  if (
    files.forEach((file) => {
      const filePath = path.join(dir, file);
      if (fs.statSync(filePath).isDirectory()) {
        getAllProtoFiles(filePath, fileList);
      } else if (path.extname(file) === '.proto') {
        fileList.push(filePath);
      }
    })
  ) {
  }
  return fileList;
};
const protoFiles = getAllProtoFiles(protoDir);
const protoMessages = {};
export const loadProtos = async () => {
  try {
    const root = new protobuf.Root();
    await Promise.all(protoFiles.map((file) => root.load(file)));

    for (const [packetName, types] of Object.entries(packetNames)) {
      protoMessages[packetName] = {};
      for (const [type, typeName] of Object.entries(types)) {
        protoMessages[packetName][type] = root.lookupType(typeName);
      }
    }
    console.log('Protobuf 파일이 로드되었습니다.');
  } catch (e) {
    console.error('Protobuf 파일 로드 중 오류가 발생하였습니다.' + e);
  }
};

//object freeze 기능 추가 필요
export const getProtoMessages = () => {
  return { ...protoMessages };
};