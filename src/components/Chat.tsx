import { useRef, useEffect, useState } from 'react';
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

export default function Chat( {onGetResponse} : {onGetResponse: (message: string) => Promise<string>}) {
  const [waitingResponse, setWaitingResponse] = useState<boolean>(false);
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [messageHistory, setMessageHistory] = useState<MessageHistory>(messages);
  const [firstMessage, setFirstMessage] = useState<boolean>(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    e.preventDefault();
    if (currentMessage.length > 0) {
      if (firstMessage) {
        messageTimeout()
      }
      else {
        addQuestionToHistory()
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
          addQuestionToHistory()
        }
      }
    }
  };

    const messageTimeout = () => {
      setFirstMessage(false)
      setTimeout(() => {
        addQuestionToHistory()
      }, 1500)
    }

  const addQuestionToHistory = () => {
      setMessageHistory((prevHistory) => {
        return ([...prevHistory, {id: prevHistory.length + 1, text: currentMessage, isUser: true }])
      })
      setCurrentMessage("")
      handleWaitingResponse(currentMessage)
  }

  const handleWaitingResponse = async (message: string) => {
    try {
      setWaitingResponse(true)
      const response = await onGetResponse(message)
      setMessageHistory((prevHistory) => {
        return ([...prevHistory, {id: prevHistory.length + 1, text: response, isUser: false }])
      }) 
      setWaitingResponse(false)
    }
    catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (scrollRef.current) {
      const scrollElement = scrollRef.current;
      scrollElement.scroll({
        top: scrollElement.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messageHistory])

  return (  
    <>
    <div className={`flex-1 w-full flex flex-col min-h-0 items-center justify-center`}>
      {
        messageHistory.length == 0
        ?
        <div className={`flex flex-col items-center justify-center w-full max-w-[800px] mb-10 ${firstMessage ? '' : 'flex-out'}`}>
          <ChatHeader className={`${firstMessage ? 'chat-header-in' : 'chat-header-out'}`}/>
        </div>
        :
        <div className={`flex-out flex flex-col items-center w-full md:min-w-[400px] overflow-auto mt-8 px-4 md:px-0
                        [mask-image:linear-gradient(to_bottom,transparent_0%,black_20%)]
                        [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_20%)]
                        ${firstMessage ? 'justify-center' : 'justify-start'}`}
          style={{ scrollbarGutter: 'stable both-edges' }}
          ref={scrollRef}
        >
          {
            messageHistory.length >= 1 &&
            <>
              <div className='flex h-25 flex-shrink-0'/>
              <div className='flex flex-col justify-end h-fit w-full max-w-[48rem] gap-4 pb-30 mb-8'>
                {messageHistory.map((message, index) => {
                  if (message.isUser) {
                    console.log(index)
                    return <UserMessage message={message} className={`message-in`}/>
                  }
                  else {
                    return <BotMessage message={message} className={`message-in`}/>
                  }
                })}
                {waitingResponse && 
                  <div className='flex justify-start items-center pl-3 pb-1 fade-in'>
                    <PulseLoader color='#37545c' size={7}/>
                  </div>
                }
              </div>
            </>
          }
        </div>
      }
        <div className='flex w-full justify-center px-5 md:px-0 px-4 md:px-0'>
          <form className={`flex relative sm:chat-box-in md:chat-box-in ${firstMessage ? 'max-w-[400px]' : 'sm:chat-box-down md:chat-box-down'} md:max-w-[48rem] h-26 mb-4 items-start rounded-2xl bg-[#fff] dark:bg-[rgb(45,53,54)] border border-gray-300 dark:border-transparent overflow-x-auto shadow-lg`}>
            <textarea id="name" placeholder="Any doubts or questions? Ask away!"
                  className="text-area-in w-[90%] text-[15px] focus:outline-none h-full resize-none p-4 pl-4 dark:text-gray-200 placeholder:text-gray-450 dark:placeholder:text-gray-400"
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyDown={handleKeyDown}/>
            
            <button className={`absolute right-2 bottom-2  rounded-sm p-1.5 hover:cursor-pointer focus:outline-none 
            ${currentMessage.length > 0 ? 'hover:bg-gray-300 hover:cursor-none dark:hover:bg-gray-500' : ''}`}
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