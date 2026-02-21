import '../styles/notecard.css';

function NoteCard({ text, date }) {
  return (
    <div className="note-card">
      <p className="note-text">{text}</p>
      <span className="note-date">{date}</span>
    </div>
  );
}

export default NoteCard;
