interface Message {
  recipients: string | string[];
  text: string;
}

// TODO: add support for images, audio, video, etc
interface MessageContent {
  text: string;
}

export type { Message, MessageContent };
