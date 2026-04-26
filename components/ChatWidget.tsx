"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "bot";
  text: string;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = { role: "user", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "bot", text: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <style>{`
        .cw-wrap * {
          box-sizing: border-box;
          font-family: 'Satoshi', sans-serif;
        }
        .cw-fab {
          position: fixed; bottom: 24px; right: 24px;
          width: 52px; height: 52px; border-radius: 10px;
          border: 2px solid #000; cursor: pointer;
          background: #ffe17c; box-shadow: 4px 4px 0px 0px #000;
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.2s cubic-bezier(0.175,0.885,0.32,1.275), box-shadow 0.2s;
          z-index: 9999;
        }
        .cw-fab:hover {
          transform: translate(2px, 2px);
          box-shadow: 2px 2px 0px 0px #000;
        }
        .cw-fab-icon { width: 22px; height: 22px; transition: transform 0.3s; }
        .cw-fab-icon--chat { color: #000; }
        .cw-fab-icon--close { color: #000; }
        .cw-panel {
          position: fixed; bottom: 90px; right: 24px;
          width: 360px; height: 520px;
          background: #fff; border: 2px solid #000; border-radius: 12px;
          display: flex; flex-direction: column; overflow: hidden;
          z-index: 9998; box-shadow: 8px 8px 0px 0px #000;
          transform-origin: bottom right;
          animation: cw-panelIn 0.3s cubic-bezier(0.175,0.885,0.32,1.275) forwards;
        }
        .cw-panel--closing {
          animation: cw-panelOut 0.2s ease forwards;
        }
        @keyframes cw-panelIn {
          from { opacity:0; transform: scale(0.92) translateY(16px); }
          to   { opacity:1; transform: scale(1) translateY(0); }
        }
        @keyframes cw-panelOut {
          from { opacity:1; transform: scale(1) translateY(0); }
          to   { opacity:0; transform: scale(0.92) translateY(16px); }
        }
        .cw-header {
          padding: 14px 18px; background: #ffe17c;
          border-bottom: 2px solid #000;
          display: flex; align-items: center; gap: 10px; flex-shrink: 0;
        }
        .cw-avatar {
          width: 32px; height: 32px; border-radius: 6px;
          background: #000; color: #ffe17c;
          display: flex; align-items: center; justify-content: center;
          font-size: 14px; font-weight: 800; flex-shrink: 0; position: relative;
        }
        .cw-avatar::after {
          content: ''; position: absolute; bottom: -1px; right: -1px;
          width: 8px; height: 8px; border-radius: 50%;
          background: #28c840; border: 2px solid #ffe17c;
        }
        .cw-header-info { flex: 1; }
        .cw-header-name {
          font-size: 12px; font-weight: 800; color: #000;
          letter-spacing: 0.08em; text-transform: uppercase; line-height: 1;
        }
        .cw-header-status {
          font-size: 9px; color: #171e19aa; margin-top: 4px;
          letter-spacing: 0.1em; text-transform: uppercase; font-weight: 700;
        }
        .cw-messages {
          flex: 1; overflow-y: auto; padding: 16px 14px;
          display: flex; flex-direction: column; gap: 10px;
          scrollbar-width: thin; scrollbar-color: #ffe17c #f5f5f5;
        }
        .cw-messages::-webkit-scrollbar { width: 4px; }
        .cw-messages::-webkit-scrollbar-thumb { background: #ffe17c; border-radius: 0; }
        .cw-empty {
          flex: 1; display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 10px;
          color: #171e19aa; font-size: 11px; text-align: center;
          padding: 24px; font-weight: 600;
          animation: cw-fadeUp 0.4s ease forwards;
        }
        .cw-empty-icon { font-size: 28px; opacity: 0.5; }
        .cw-bubble-row {
          display: flex; opacity: 0;
          animation: cw-fadeUp 0.3s ease forwards;
        }
        .cw-bubble-row--user { justify-content: flex-end; }
        .cw-bubble-row--bot { justify-content: flex-start; }
        @keyframes cw-fadeUp {
          from { opacity:0; transform: translateY(8px); }
          to   { opacity:1; transform: translateY(0); }
        }
        .cw-bubble {
          max-width: 80%; padding: 10px 14px; border-radius: 8px;
          font-size: 12px; line-height: 1.6; word-break: break-word;
        }
        .cw-bubble--user {
          background: #000; color: #fff; font-weight: 500;
          border: 2px solid #000;
        }
        .cw-bubble--bot {
          background: #fff; color: #000;
          border: 2px solid #000; box-shadow: 2px 2px 0px 0px #000;
        }
        .cw-typing {
          display: flex; align-items: center; gap: 5px;
          padding: 12px 16px; background: #fff;
          border: 2px solid #000; box-shadow: 2px 2px 0px 0px #000;
          border-radius: 8px; width: fit-content;
          opacity: 0; animation: cw-fadeUp 0.3s ease forwards;
        }
        .cw-typing span {
          width: 5px; height: 5px; border-radius: 50%;
          background: #000; display: block;
          animation: cw-bounce 1.1s ease-in-out infinite;
        }
        .cw-typing span:nth-child(2) { animation-delay: 0.15s; background: #171e19aa; }
        .cw-typing span:nth-child(3) { animation-delay: 0.3s; }
        @keyframes cw-bounce {
          0%,60%,100% { transform: translateY(0); }
          30%          { transform: translateY(-4px); }
        }
        .cw-input-area {
          padding: 12px 14px; background: #ffe17c;
          border-top: 2px solid #000;
          display: flex; gap: 8px; align-items: center; flex-shrink: 0;
        }
        .cw-input {
          flex: 1; background: #fff; border: 2px solid #000;
          border-radius: 8px; padding: 9px 13px; color: #000;
          font-size: 12px; font-family: 'Satoshi', sans-serif;
          font-weight: 500; outline: none; transition: box-shadow 0.2s;
        }
        .cw-input::placeholder { color: #171e19aa; }
        .cw-input:focus { box-shadow: 2px 2px 0px 0px #000; }
        .cw-send {
          width: 36px; height: 36px; border-radius: 8px;
          border: 2px solid #000; cursor: pointer; background: #000;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; box-shadow: 2px 2px 0px 0px #000;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .cw-send:hover:not(:disabled) {
          transform: translate(2px, 2px); box-shadow: 0 0 0 0 #000;
        }
        .cw-send:disabled { opacity: 0.3; cursor: not-allowed; }
        .cw-send svg { color: #ffe17c; }
        @media (max-width: 400px) {
          .cw-panel { width: calc(100vw - 32px); right: 16px; }
        }
      `}</style>

      <div className="cw-wrap">
        <button className="cw-fab" onClick={() => setOpen((o) => !o)} aria-label={open ? "Close chat" : "Open chat"}>
          {open ? (
            <svg className="cw-fab-icon cw-fab-icon--close" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          ) : (
            <svg className="cw-fab-icon cw-fab-icon--chat" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
            </svg>
          )}
        </button>

        {open && (
          <div className="cw-panel">
            <div className="cw-header">
              <div className="cw-avatar">⚡</div>
              <div className="cw-header-info">
                <div className="cw-header-name">Kuntal&apos;s Assistant</div>
                <div className="cw-header-status">● online</div>
              </div>
            </div>
            <div className="cw-messages">
              {messages.length === 0 && !loading && (
                <div className="cw-empty">
                  <div className="cw-empty-icon">⚡</div>
                  <div>Ask me anything about<br /><strong style={{ color: "#000" }}>Kuntal Das</strong></div>
                </div>
              )}
              {messages.map((m, i) => (
                <div key={i} className={`cw-bubble-row cw-bubble-row--${m.role}`} style={{ animationDelay: `${i * 0.03}s` }}>
                  <div className={`cw-bubble cw-bubble--${m.role}`}>{m.text}</div>
                </div>
              ))}
              {loading && (
                <div className="cw-bubble-row cw-bubble-row--bot">
                  <div className="cw-typing"><span /><span /><span /></div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
            <div className="cw-input-area">
              <input ref={inputRef} className="cw-input" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKey} placeholder="Ask something…" disabled={loading} />
              <button className="cw-send" onClick={sendMessage} disabled={loading || !input.trim()} aria-label="Send">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}