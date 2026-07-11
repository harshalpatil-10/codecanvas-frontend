import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import oneLight from 'react-syntax-highlighter/dist/esm/styles/prism/one-light.js'
import vscDarkPlus from 'react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus.js'
import { useTheme } from '../../context/ThemeContext.jsx'

// Maps our free-text "language" field to the identifiers Prism expects.
const LANG_MAP = {
  java: 'java',
  python: 'python',
  javascript: 'javascript',
  js: 'javascript',
  sql: 'sql',
  'c++': 'cpp',
  cpp: 'cpp',
}

export default function CodeBlock({ code, language, maxHeight = 220 }) {
  const { theme } = useTheme()
  const normalized = LANG_MAP[(language || '').toLowerCase()] || 'text'

  return (
    <div style={{ borderRadius: 8, overflow: 'hidden', maxHeight, overflowY: 'auto' }}>
      <SyntaxHighlighter
        language={normalized}
        style={theme === 'dark' ? vscDarkPlus : oneLight}
        customStyle={{
          margin: 0,
          padding: '12px 14px',
          fontSize: '12px',
          background: 'var(--paper-2)',
        }}
        wrapLongLines
      >
        {code || ''}
      </SyntaxHighlighter>
    </div>
  )
}
