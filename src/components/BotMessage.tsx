import type { Message } from '../types';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import styles from './Messages.module.css';
import clsx from 'clsx';

const BotMessage = ({ message, className }: { message: Message, className: string }) => {
  return (
    <div key={message.id} className={clsx(styles.botMessageContainer, className)}>
      <article className={styles.botProse}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.text}</ReactMarkdown>
      </article>
    </div>
  );
};

export default BotMessage;