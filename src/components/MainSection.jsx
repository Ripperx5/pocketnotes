import React, { useRef, useEffect, useState } from 'react';
import main from '../assets/main.png';
import lock from '../assets/lock.png';
import '../styles/mainsection.css';

const MainSection = ({ group, addNote, onBack }) => {
  const [text, setText] = useState('');
  const inputRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    if (group && inputRef.current) inputRef.current.focus();
  }, [group]);

  const handleAdd = () => {
    if (!text.trim()) return;

    const now = new Date();

    const date = now.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    const time = now.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });

    addNote({
      content: text,
      date: date,
      time: time,
    });

    setText("");
  };

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [group?.notes?.length]);

  if (!group) {
    return (
      <div className="main-container">
        <div className="welcome-section">
          <img src={main} className="welcome-img" />
          <h2>Pocket Notes</h2>
          <p>
            <span>Send and receive messages without keeping your phone online.</span>
            <br />
            <span className="second-line">
              Use Pocket Notes on up to 4 linked devices and 1 mobile phone.
            </span>
          </p>
          <span className="encrypted-text"><img src={lock} alt="lock" className="lock-icon" />end-to-end encrypted
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="main-container">
      <div className="notes-header">
        {onBack && (
          <button
            type="button"
            className="back-btn"
            onClick={onBack}
            aria-label="Back to groups"
          >
            ←
          </button>
        )}
        <div className="note-avatar" style={{ backgroundColor: group.color }}>{group.initials}</div>
        <h3>{group.name}</h3>
      </div>

      <div className="notes-area" ref={listRef}>
        {group.notes.map((note, i) => (
          <div key={i} className="note-card">
            <p className="note-text">{note.content}</p>
            <span className="note-time">{note.date} <span className="note-separator">•</span> {note.time}</span>
          </div>
        ))}
      </div>


      <div className="input-area">
        <textarea
          ref={inputRef}
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Enter your text here..."
        />
        <button className="send-btn" onClick={handleAdd} disabled={!text.trim()} aria-label="Add note">
          ➤
        </button>
      </div>
    </div>
  );
};

export default MainSection;
