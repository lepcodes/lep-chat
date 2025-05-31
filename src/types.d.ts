export type Message = {
  id: number;
  text: string;
  isUser: boolean;
}

export type MessageHistory = Message[];