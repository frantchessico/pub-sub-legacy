import { Timestamp } from 'firebase/firestore';

export interface Message {
  message: string;
  timestamp: Timestamp;
  read: boolean;
  subscriber: string;
}
