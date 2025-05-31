import type { Message } from '../types';

const BotMessage = ({ message, className }: { message: Message, className: string }) => {
  return (
    <div key={message.id} className={`relative flex flex-col gap-2 self-start p-3 max-w-[98%] rounded-2xl ${className}`}>
      <p className="text-gray-800 dark:text-gray-300">{message.text}</p>
    </div>
  );
};

export default BotMessage;