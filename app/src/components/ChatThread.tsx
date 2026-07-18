import React from 'react';
import { Button } from './Button';
import { Icon } from './Icon';
import { store } from '../lib/store';
import type { ChatMessage } from '../lib/types';

/**
 * Coach ↔ client message thread. `as` decides which side this user writes as;
 * their bubbles sit right in brand purple. Polls for new messages while open.
 */
export function ChatThread({ clientId, as, height = 380 }: { clientId: string; as: 'coach' | 'client'; height?: number | string }) {
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [draft, setDraft] = React.useState('');
  const [sending, setSending] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const countRef = React.useRef(0);

  const reload = React.useCallback(async () => {
    try {
      const list = await store.listMessages(clientId);
      setMessages(list);
    } catch (e) {
      console.error('messages load failed', e);
    }
  }, [clientId]);

  React.useEffect(() => {
    void reload();
    const t = setInterval(() => void reload(), 15000);
    return () => clearInterval(t);
  }, [reload]);

  // pin to bottom when new messages arrive
  React.useEffect(() => {
    if (messages.length !== countRef.current) {
      countRef.current = messages.length;
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
    }
  }, [messages]);

  const send = async () => {
    const body = draft.trim();
    if (!body || sending) return;
    setSending(true);
    setDraft('');
    try {
      await store.sendMessage({ clientId, from: as, body });
      await reload();
    } catch (e) {
      console.error('send failed', e);
      setDraft(body); // give the text back
    } finally {
      setSending(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height, minHeight: 0 }}>
      <div ref={scrollRef} className="screen-scroll" style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8, padding: '4px 2px' }}>
        {messages.length === 0 && (
          <div style={{ margin: 'auto', textAlign: 'center', color: 'var(--gray-500)', fontSize: 13, fontWeight: 600, padding: 20 }}>
            No messages yet — say hi 👋
          </div>
        )}
        {messages.map((m) => {
          const mine = m.from === as;
          return (
            <div key={m.id} style={{ display: 'flex', justifyContent: mine ? 'flex-end' : 'flex-start' }}>
              <div
                style={{
                  maxWidth: '78%',
                  background: mine ? 'var(--grad-brand)' : 'var(--ink-800)',
                  color: 'var(--white)',
                  borderRadius: mine ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                  padding: '9px 13px',
                }}
              >
                <div style={{ fontSize: 13.5, lineHeight: 1.45, overflowWrap: 'break-word' }}>{m.body}</div>
                <div style={{ fontSize: 10, fontWeight: 600, opacity: 0.6, marginTop: 3, textAlign: 'right' }}>
                  {new Date(m.createdAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ display: 'flex', gap: 8, paddingTop: 10 }}>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              void send();
            }
          }}
          placeholder="Message…"
          aria-label="Message"
          style={{
            flex: 1,
            minWidth: 0,
            height: 44,
            background: 'var(--ink-800)',
            border: '2px solid var(--border-dark)',
            borderRadius: 'var(--radius-pill)',
            outline: 'none',
            color: 'var(--white)',
            fontSize: 14,
            fontWeight: 600,
            padding: '0 16px',
          }}
        />
        <Button variant="primary" size="md" disabled={!draft.trim() || sending} onClick={() => void send()} aria-label="Send" style={{ borderRadius: 'var(--radius-pill)', padding: '0 16px' }}>
          <Icon name="send" size={17} />
        </Button>
      </div>
    </div>
  );
}
