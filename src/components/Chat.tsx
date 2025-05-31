import { useEffect, useState } from 'react';
import '../style.css';

import SendIcon from '../icons/SendIcon';
import ChatHeader from './ChatHeader';

import UserMessage from './UserMessage';
import BotMessage from './BotMessage';
import type { Message, MessageHistory } from '../types';
import PulseLoader from 'react-spinners/PulseLoader';

const messages: Message[] = [
  // { id: 1, text: 'Hello', isUser: true },
  // { id: 2, text: 'Hi', isUser: false },
  // { id: 3, text: 'How are you?', isUser: true },
  // { id: 4, text: 'I am fine, thank you', isUser: false },
  // { id: 5, text: 'What is your name?', isUser: true },
  // { id: 6, text: 'My name is Luis', isUser: false },
  // { id: 7, text: 'Nice to meet you', isUser: true },
  // { id: 8, text: 'I am a web developer', isUser: false },
  // { id: 9, text: 'I am a web developer', isUser: true },
  // { id: 10, text: 'I am a web developer', isUser: false },
  // { id: 1, text: 'Hello', isUser: true },
  // { id: 2, text: 'Hi', isUser: false },
  // { id: 3, text: 'How are you?', isUser: true },
  // { id: 4, text: 'I am fine, thank you', isUser: false },
  // { id: 5, text: 'What is your name?', isUser: true },
  // { id: 6, text: 'My name is Luis', isUser: false },
  // { id: 7, text: 'Nice to meet you', isUser: true },
  // { id: 8, text: 'I am a web developer', isUser: false },
  // { id: 9, text: 'I am a web developer', isUser: true },
  // { id: 10, text: 'I am a web developer', isUser: false },
];

export default function Chat() {
  const [waitingResponse, setWaitingResponse] = useState<boolean>(false);
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [messageHistory, setMessageHistory] = useState<MessageHistory>(messages);
  const [firstMessage, setFirstMessage] = useState<boolean>(true);

  const updateMessageState = () => {
      setMessageHistory((prevHistory) => [
        {id: prevHistory.length + 1, text: currentMessage, isUser: true },
        ...prevHistory
      ])
      setCurrentMessage("")
      setWaitingResponse(true)
  }

  const messageTimeout = () => {
    setFirstMessage(false)
    setTimeout(() => {
      updateMessageState()
    }, 600)
  }

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    e.preventDefault();
    if (currentMessage.length > 0) {
      if (firstMessage) {
        messageTimeout()
      }
      else {
        updateMessageState()
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (currentMessage.length > 0) {
        if (firstMessage) {
          messageTimeout()
        }
        else {
          updateMessageState()
        }
      }
    }
  };

  useEffect(() => {
    if (waitingResponse) {
      // Here it will be handle the fetching of the data
      setTimeout(() => {
        setMessageHistory((prevHistory) => [
          {id: prevHistory.length + 1, text: "There was an error, please try again later", isUser: false },
          ...prevHistory
        ])
        setCurrentMessage("")
        setWaitingResponse(false)
      }, 5000)
    }
  }, [waitingResponse])
  
  return (  
    <>
      <div className="flex-1 overflow-auto">
        <div className={`h-full w-full relative flex flex-col gap-5 items-center justify-center`}>
          {
            messageHistory.length == 0
            ?
            <div className={`flex flex-col items-center justify-center w-[100%] max-w-[800px] mb-10 ${firstMessage ? '' : 'flex-out'}`}>
              <ChatHeader className={`${firstMessage ? 'chat-header-in' : 'chat-header-out'}`}/>
            </div>
            :
            <div className={`flex flex-out gap-4 w-[100%] max-w-[48rem] min-w-[400px] justify-start overflow-auto flex-col-reverse mt-6
                            [mask-image:linear-gradient(to_bottom,transparent_0%,black_20%)]
                            [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_20%)]`}>
              {waitingResponse && 
                <div className='flex justify-start items-center pl-3 pb-1 fade-in'>
                  <PulseLoader color='#37545c' size={7}/>
                </div>
              }
              {messageHistory.map((message, index) => {
                if (message.isUser) {
                  console.log(index)
                  return <UserMessage message={message} className={`${index === 0 ? 'message-in' : ''}`}/>
                }
                else {
                  return <BotMessage message={message} className={`${index === 0 ? 'message-in' : ''}`}/>
                }
              })}
              {messageHistory.length >= 1 && 
                <div className='flex h-15 flex-shrink-0'/>
              }
            </div>
          }
                
          <form className={`flex ${firstMessage ? 'chat-box-in h-22' : 'chat-box-down max-w-[48rem] mb-8'} items-start relative rounded-xl bg-[#ebebeb70] dark:bg-[#1c2b2fa0] border border-gray-600`}>
            <textarea id="name"  placeholder="Any doubts or questions? Ask away!"
                  className="w-[90%] text-[15px] focus:outline-none h-full resize-none p-3 pl-4 dark:text-gray-200 placeholder:text-gray-450 dark:placeholder:text-gray-400"
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyDown={handleKeyDown}/>
            
            <button className={`absolute right-2 bottom-2  rounded-sm p-1.5 hover:cursor-pointer focus:outline-none 
            ${currentMessage.length > 0 ? 'hover:bg-gray-500 hover:cursor-none' : ''}`}
                    onClick={handleSendMessage}
                    disabled={currentMessage.length === 0}>
              <SendIcon className={`h-6 w-6 
                ${currentMessage.length > 0 ? 'text-gray-700 dark:text-gray-100 stroke-2' : 'text-gray-500 stroke-1'}`}/>
            </button>
          </form>
        </div>
      </div>
    </>
  )
}