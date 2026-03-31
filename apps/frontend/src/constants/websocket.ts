export enum SignalType {
  JOINED_ROOM = 'joined_room',
  MESSAGE = 'message',
  ERROR = "error",
}

export type Signal = {
  type: SignalType;
  payload: any;
  sender: string;
  senderId: number;
  roomId: number;
};
