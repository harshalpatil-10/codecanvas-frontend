import React, { useRef, useState, useEffect } from 'react'
import { canvasAiService } from '../../services/canvasAiService.js'
import { SparkleIcon } from '../shared/Icons.jsx'
import styles from './CanvasAiWidget.module.css'

export default function CanvasAiWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  async function handleSend(e) {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMsg = { role: 'user', content: input.trim() }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setLoading(true)
    setError('')

    try {
      const historyForApi = messages.map(m => ({ role: m.role, content: m.content }))
      const result = await canvasAiService.chat(userMsg.content, historyForApi)
      setMessages([...newMessages, { role: 'assistant', content: result.answer, sources: result.sources }])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button className={styles.launcher} onClick={() => setOpen(o => !o)}>
        {open ? '✕' : <SparkleIcon />}
      </button>

      {open && (
        <div className={styles.panel}>
          <div className={styles.header}>
            <span className={styles.headerTitle}><SparkleIcon /> Canvas AI</span>
            <span className={styles.headerSub}>Ask anything about your saved content</span>
          </div>

          <div className={styles.messages}>
            {messages.length === 0 && (
              <div className={styles.emptyState}>
                Try asking: <i>"What did I save about JWT?"</i> or <i>"Explain binary search"</i>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`${styles.bubble} ${m.role === 'user' ? styles.userBubble : styles.aiBubble}`}>
                <p>{m.content}</p>
                {m.sources && m.sources.length > 0 && (
                  <div className={styles.sources}>
                    {m.sources.map((s, j) => <span key={j} className={styles.sourceTag}>{s}</span>)}
                  </div>
                )}
              </div>
            ))}
            {loading && <div className={`${styles.bubble} ${styles.aiBubble}`}><p className={styles.typing}>Thinking...</p></div>}
            {error && <p className="error" style={{ padding: '0 4px' }}>{error}</p>}
            <div ref={bottomRef} />
          </div>

          <form className={styles.inputRow} onSubmit={handleSend}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask Canvas AI..."
              disabled={loading}
            />
            <button type="submit" className="btn btn-primary" disabled={loading || !input.trim()} style={{ padding: '10px 16px' }}>
              →
            </button>
          </form>
        </div>
      )}
    </>
  )
}
