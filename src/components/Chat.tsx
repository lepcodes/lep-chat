import { useRef, useEffect, useState } from 'react';
import styles from './Chat.module.css';
import prefligth from './preFlight.module.css';
import clsx from 'clsx';

import SendIcon from '../icons/SendIcon';
import ChatHeader from './ChatHeader';

import UserMessage from './UserMessage';
import BotMessage from './BotMessage';
import type { Message, MessageHistory, ChatHeaderProps } from '../types';
import PulseLoader from 'react-spinners/PulseLoader';

const messages: Message[] = [];

type ChatProps = ChatHeaderProps & {
  onGetResponse: (message: string) => Promise<string>,
  placeHolder: string
};

export default function Chat({
  onGetResponse,
  placeHolder,
  className, 
  overline, 
  title, 
  highlightedText, 
  gradient, 
  subtitle
} : ChatProps) {
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
    <div className={clsx(styles.chatContainer, prefligth.preFlight)}>
      {
        messageHistory.length == 0
        ?
        <div className={clsx([styles.chatHeaderParent, { [styles.flexOut]: !firstMessage }])}>
          <ChatHeader
            className={clsx({[styles.chatHeaderIn]: firstMessage, [styles.chatHeaderOut]: !firstMessage})}
            overline={overline}
            title={title}
            highlightedText={highlightedText}
            gradient={gradient}
            subtitle={subtitle}
          />
        </div>
        :
        <div className={clsx(styles.chatMessageScroll, 
                             styles.flexOut,
                            { 
                              [styles.justifyCenter] : firstMessage, 
                              [styles.justifyStart] : !firstMessage 
                            })}
          style={{ scrollbarGutter: 'stable both-edges' }}
          ref={scrollRef}
        >
          {
            messageHistory.length >= 1 &&
            <>
              <div className={styles.chatInitialSpacer}/>
              <div className={styles.chatMessageContainer}>
                {messageHistory.map((message, index) => {
                  if (message.isUser) {
                    return <UserMessage message={message} className={styles.messageIn}/>
                  }
                  else {
                    return <BotMessage message={message} className={styles.messageIn}/>
                  }
                })}
                {waitingResponse && 
                  <div className={styles.pulseLoader}>
                    <PulseLoader color='#37545c' size={7}/>
                  </div>
                }
              </div>
            </>
          }
        </div>
      }
        <div className={styles.chatBoxContainer}>
          <form className={clsx(styles.chatBoxForm, firstMessage ? styles.formInitialState : styles.formDefaultState)}>
            <textarea id="name" placeholder={placeHolder}
                  className={styles.chatBoxTextArea}
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyDown={handleKeyDown}/>
            
            <button className={clsx(styles.chatBoxButton, {[styles.buttonActive] : (currentMessage.length > 0)})}
                    onClick={handleSendMessage}
                    disabled={currentMessage.length === 0}>
              <SendIcon className={clsx('h-6 w-6', (currentMessage.length > 0) ? styles.iconEnabled : styles.iconDisabled)}/>
            </button>
          </form> 
        </div>
      </div>
    </>
  )
}