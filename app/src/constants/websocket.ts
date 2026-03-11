export enum MessageType {
  JOINED_ROOM = 'joined_room',
  MESSAGE = 'message',
}

export type Data = {
  type: MessageType;
  payload: any;
  username: string;
  clientId: string;
  roomId: string;
};
