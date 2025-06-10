import type { ChatHeaderProps } from '../types';
import styles from './ChatHeader.module.css';
import clsx from 'clsx';

export default function ChatHeader( {className, overline, title, highlightedText, gradient, subtitle} : ChatHeaderProps) {

  const gradientStyle = () => {
    if (!gradient) return {};
    if (gradient.length === 2) {
      return {
        backgroundImage: `linear-gradient(45deg, ${gradient[0]}, ${gradient[1]})`,
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        WebkitBackgroundClip: 'text'
      }
    }
    else {
      return {
        backgroundImage: `linear-gradient(45deg, ${gradient[0]}, ${gradient[1]}, ${gradient[2]})`,
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        WebkitBackgroundClip: 'text'
      }
    }
  }

  return (
    <div className={clsx(styles.chatHeaderContainer, className)}>
      <h2 className={styles.chatHeaderOverline}>
        {overline}
      </h2>
      <h1 className={styles.chatHeaderTitle}>
        {title}<br/> 
        <span className={styles.chatHeaderHighlightedText}
              style={gradientStyle()}
        >
          {highlightedText}
        </span>
      </h1>
      <p className={styles.chatHeaderSubtitle}>
        {subtitle}
      </p>
    </div>
  )
}