import type { Message } from '../types';
import styles from './Messages.module.css';
import clsx from 'clsx';

const UserMessage = ({ message, className }: { message: Message, className: string }) => {
  return (
    
    <div key={message.id} 
        className={clsx(styles.userMessageContainer, className)}>
      <p className={styles.userProse}>
        {message.text}
      </p>
    </div>
  );
};

export default UserMessage;