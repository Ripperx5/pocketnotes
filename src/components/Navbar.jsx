import React from 'react';
import '../styles/navbar.css';

const Navbar = ({ onAddClick, groups, onGroupSelect, activeGroup }) => {
  return (
    <div className="navbar-container">
      <h1 className="navbar-title">Pocket Notes</h1>

      <div className="notes-list" role="list">
        {groups.map(group => (
          <div
            key={group.id}
            className={`note-item ${activeGroup?.id === group.id ? "active" : ""}`}
            onClick={() => onGroupSelect(group)}
            role="listitem"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") onGroupSelect(group);
            }}
          >
            <div
              className="note-avatar"
              style={{ backgroundColor: group.color }}
            >
              {group.initials}
            </div>
            <span className="note-text">{group.name}</span>
          </div>
        ))}
      </div>

      <div className="navbar-footer">
        <button className="add-button" onClick={onAddClick} aria-label="Create new group">
          +
        </button>
      </div>
    </div>
  );
};

export default Navbar;
