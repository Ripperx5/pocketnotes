import React, { useRef, useEffect, useState } from 'react';
import main from '../assets/main.png';
import '../styles/mainsection.css';

const MainSection = ({ group, addNote }) => {
  const [text, setText] = useState("");
  const inputRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    if (group && inputRef.current) inputRef.current.focus();
  }, [group]);

  const handleAdd = () => {
    if (!text.trim()) return;

    const now = new Date();

    addNote({
      content: text,
      createdAt: now.toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    });

    setText("");
  };

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTo({
        top: listRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [group?.notes?.length]);

  if (!group) {
    return (
      <div className="main-container">
        <div className="welcome-section">
          <img src={main} className="welcome-img" />
          <h2>Pocket Notes</h2>
          <p>Send and receive messages securely.</p>
          <span className="encrypted-text">🔒 end-to-end encrypted</span>
        </div>
      </div>
    );
  }

  return (
    <div className="main-container">
      <div
        className="notes-header"
        style={{ backgroundColor: group.color }}
      >
        <div className="note-avatar">{group.initials}</div>
        <h3>{group.name}</h3>
      </div>

      <div className="notes-area" ref={listRef}>
        {group.notes.map((note, i) => (
          <div key={i} className="note-card">
            <p className="note-text">{note.content}</p>
            <span className="note-time">{note.createdAt}</span>
          </div>
        ))}
      </div>


      <div
        className="input-area"
        style={{ backgroundColor: group.color }}
      >
        <textarea
          ref={inputRef}
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Enter your text here..."
        />
        <button
          className="send-btn"
          onClick={handleAdd}
          disabled={!text.trim()}
          aria-disabled={!text.trim()}
          aria-label="Add note"
        >
          ➤
        </button>
      </div>
    </div>
  );
};

export default MainSection;
