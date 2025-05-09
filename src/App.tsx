import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { jsPDF } from 'jspdf';
import './App.css';

// Define types for component state
const App: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>(''); // State to store markdown input

  // Handle markdown input change
  const handleMarkdownChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(e.target.value);
  };

  // Export markdown content to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.html(document.getElementById('markdown-preview') as HTMLElement, {
      callback: function (doc) {
        doc.save('markdown.pdf');
      },
    });
  };

  // Copy the rendered rich text (HTML) to the clipboard
  const copyToClipboard = () => {
    const previewElement = document.getElementById('markdown-preview') as HTMLElement;
    if (previewElement) {
      const range = document.createRange();
      range.selectNodeContents(previewElement);
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand('copy'); // Execute the copy command
      }
    }
  };

  return (
    <div className="app">
      {/* Editor Pane */}
      <div className="editor-pane">
        <textarea
          value={markdown}
          onChange={handleMarkdownChange}
          placeholder="Type markdown here"
        />
      </div>

      {/* Preview Pane */}
      <div className="preview-pane">
        <div id="markdown-preview" className="preview-content">
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
        
        {/* Controls */}
        <div className="controls">
          <button onClick={exportToPDF}>Export PDF</button>
          
          {/* Copy to Clipboard */}
          <button onClick={copyToClipboard}>Copy</button>
        </div>
      </div>
    </div>
  );
};

export default App;
