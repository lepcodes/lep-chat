import type { Message } from '../types';

const BotMessage = ({ message, className }: { message: Message, className: string }) => {
  return (
    <div key={message.id} className={`relative flex flex-col gap-2 self-start py-3 px-1 max-w-[98%] rounded-2xl ${className} overflow-x-auto`}>
      <p className="text-gray-800 dark:text-gray-300">{message.text}</p>
    </div>
  );
};

export default BotMessage;