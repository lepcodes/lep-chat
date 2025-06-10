export type Message = {
  id: number;
  text: string;
  isUser: boolean;
}

interface   ChatHeaderProps {
  className: string,
  overline?: string,
  title?: string,
  highlightedText?: string,
  theme?: string,
  gradient?: [string, string, string?],
  subtitle?: string
}

export type MessageHistory = Message[];
export type ChatHeaderProps = ChatHeaderProps;
