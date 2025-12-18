# Lep-Chat

**Lep-Chat** is a high-performance, modular React component library engineered to provide a seamless chat interface for AI-driven applications. Built with **React 19** and **TypeScript**, it abstracts the complexities of state management, message rendering, and UI responsiveness, allowing developers to integrate a professional-grade LLM chat experience into any application with minimal configuration.

## Features & Technical Highlights

- **Library-First Architecture:** Architected as a distributable package using **Rollup** to output optimized ESM and CommonJS bundles along with full type definitions.
- **Modern React 19 Engine:** Leverages the latest React 19 features and functional patterns for optimal performance and state management.
- **Advanced Styling:** A hybrid styling approach using **Tailwind CSS** for rapid UI development and **CSS Modules** to ensure zero style leakage when integrated into external projects.
- **Rich Markdown Support:** Integrated `react-markdown` and `remark-gfm` for professional-grade rendering of code blocks, tables, and formatted text.
- **Type Safety:** Full **TypeScript** implementation providing a robust developer experience and predictable API contracts.
- **Customizable & Backend Agnostic:** Designed with flexibility in mind, allowing easy connection to any AI backend (Google Gemini, OpenAI, etc.) via a clean props-based API.

## Tech Stack

- **Framework:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS + CSS Modules
- **Bundling:** Rollup
- **Markdown:** react-markdown, remark-gfm

## Getting Started

### Installation

```bash
npm install lep-chat
```

### Basic Usage

```tsx
import { Chat } from 'lep-chat';

function App() {
  const handleSendMessage = async (message: string) => {
    // Integrate your AI logic here
    const response = await myAiService.ask(message);
    return response;
  };

  return (
    <div style={{ height: '600px' }}>
      <Chat 
        sendMessage={handleSendMessage} 
        chatHeaderTitle="AI Assistant"
      />
    </div>
  );
}
```