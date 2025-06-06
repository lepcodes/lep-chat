import type { Message } from '../types';

const UserMessage = ({ message, className }: { message: Message, className: string }) => {
  return (
    
    <div key={message.id} 
        className={`relative flex flex-col gap-2 self-end p-3 max-w-[98%] bg-[#dbdbdb91] dark:bg-[#414e625e] rounded-xl ${className} overflow-x-auto`}>
      <p className="prose dark:prose-invert">{message.text}</p>
    </div>
  );
};

export default UserMessage;