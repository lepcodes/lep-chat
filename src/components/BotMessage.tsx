import type { Message } from '../types';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const BotMessage = ({ message, className }: { message: Message, className: string }) => {
  return (
    <div key={message.id} className={`relative flex flex-col gap-2 self-start py-3 px-1 w-full rounded-2xl ${className} overflow-x-auto`}>
      <article className="prose dark:prose-invert max-w-full">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.text}</ReactMarkdown>
      </article>
    </div>
  );
};

export default BotMessage;