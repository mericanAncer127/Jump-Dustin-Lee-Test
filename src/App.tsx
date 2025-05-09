import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { jsPDF } from 'jspdf';
import './App.css';

// Define types for component state
const App: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>('');  // State to store markdown input

  // Handle markdown input change
  const handleMarkdownChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(e.target.value);
  };

  // Export markdown content to PDF
  const exportToPDF = () => {
    const doc = new jsPDF({
      unit: 'px', // Units for margins, dimensions, etc.
      format: 'a4', // A4 paper size (210mm x 297mm)
    });

    // Create a temporary div with alternative styles for the PDF
    const previewElement = document.getElementById('markdown-preview') as HTMLElement;
    
    if (previewElement) {
      // Create a temporary container to apply PDF styles
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = previewElement.innerHTML; // Copy the content
      tempDiv.style.fontFamily = 'Arial, sans-serif'; // Font family for PDF
      tempDiv.style.color = 'black'; // Text color for PDF
      tempDiv.style.backgroundColor = 'white'; // Background color for PDF
      tempDiv.style.padding = '20px'; // Padding for content
      tempDiv.style.borderRadius = '8px';
      tempDiv.style.fontSize = '16px'; // Set font size for PDF
      tempDiv.style.lineHeight = '1.5'; // Line height for better readability

      // Append the temporary div to the body for rendering
      document.body.appendChild(tempDiv);

      // Generate the PDF from the temporary div
      doc.html(tempDiv, {
        callback: function (doc) {
          doc.save('markdown.pdf');
          // Clean up by removing the temporary div
          document.body.removeChild(tempDiv);
        },
        margin: [10, 10, 10, 10], // 10mm margin on all sides
        autoPaging: true, // Ensure content is split into multiple pages if needed
        width: 180, // Width for scaling, leave room for margins (210mm A4 width - 10mm left margin - 10mm right margin = 180mm content width)
      });
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
          <CopyToClipboard text={markdown}>
            <button>Copy</button>
          </CopyToClipboard>
        </div>
      </div>
    </div>
  );
};

export default App;
