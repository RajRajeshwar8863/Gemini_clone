// src/components/CodeBlock.jsx
import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'; // You can choose any theme

const CodeBlock = ({ className, children }) => {
  const [copied, setCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || ''); // Extract language from className
  const codeContent = String(children).replace(/\n$/, ''); // Get the actual code content

  const handleCopy = () => {
    navigator.clipboard.writeText(codeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset "Copied!" state after 2 seconds
  };

  return !inline && match ? (
    <div className="code-block-container">
      <div className="code-block-header">
        <span className="code-language">{match[1].toUpperCase()}</span> {/* Display language, e.g., JS, PYTHON */}
        <button className="copy-code-btn" onClick={handleCopy}>
          {copied ? 'Copied!' : 'Copy Code'}
        </button>
      </div>
      <SyntaxHighlighter
        style={dracula} // Apply the chosen theme
        language={match[1]} // Use the detected language
        PreTag="div" // Render as a div instead of a <pre> tag
      >
        {codeContent}
      </SyntaxHighlighter>
    </div>
  ) : (
    // Fallback for inline code or if no language is detected
    <code className={className}>{children}</code>
  );
};

// Add prop types for better development (optional, but good practice)
CodeBlock.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  inline: PropTypes.bool,
};

CodeBlock.defaultProps = {
  className: '',
  inline: false,
};


export default CodeBlock;