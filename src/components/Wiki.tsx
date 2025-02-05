import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './Wiki.scss';

const Wiki: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>('');

  useEffect(() => {
    // 从GitHub获取README.md文件
    fetch('https://raw.githubusercontent.com/yougikou/custgmap/main/README.md')
      .then(response => response.text())
      .then(text => {
        setMarkdown(text);
      })
      .catch(error => {
        console.error('Error loading README.md:', error);
        setMarkdown('# Error\nFailed to load README.md file.');
      });
  }, []);

  return (
    <div className="wiki-container">
      <div className="markdown-content">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Wiki;
