import React from 'react'
import '../styles/notecard.css';

const NoteCard = ({ text, date }) => {
  return (
     <div className="note-card">
      <p className="note-text">{text}</p>
      <span className="note-date">{date}</span>
    </div>
  )
}

export default NoteCard
