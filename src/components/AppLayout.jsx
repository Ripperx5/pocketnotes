import React, { useState, useEffect } from 'react';
import Navbar from './Navbar.jsx';
import MainSection from './MainSection.jsx';
import CreateGroupModal from './CreateGroupModal.jsx';

const AppLayout = () => {
  const [groups, setGroups] = useState([]);
  const [activeGroup, setActiveGroup] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCreateGroup = (group) => {
    const initials = group.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
    const newGroup = { id: Date.now(), name: group.name, color: group.color, initials, notes: [] };
    setGroups([...groups, newGroup]);
    setActiveGroup(newGroup);
  };

  const addNoteToGroup = (note) => {
    setGroups(prev => {
      const updated = prev.map(g =>
        g.id === activeGroup.id ? { ...g, notes: [...g.notes, note] } : g
      );
      const active = updated.find(g => g.id === activeGroup.id);
      setActiveGroup(active);
      return updated;
    });
  };

  return (
    <div className="app-layout">
      {isMobile ? (
        activeGroup ? (
          <MainSection
            group={activeGroup}
            addNote={addNoteToGroup}
            onBack={() => setActiveGroup(null)}
          />
        ) : (
          <Navbar
            groups={groups}
            onAddClick={() => setShowModal(true)}
            onGroupSelect={setActiveGroup}
            activeGroup={activeGroup}
          />
        )
      ) : (
        <>
          <Navbar
            groups={groups}
            onAddClick={() => setShowModal(true)}
            onGroupSelect={setActiveGroup}
            activeGroup={activeGroup}
          />

          <MainSection
            group={activeGroup}
            addNote={addNoteToGroup}
          />
        </>
      )}

      {showModal && (
        <CreateGroupModal
          onClose={() => setShowModal(false)}
          onCreate={handleCreateGroup}
        />
      )}
    </div>
  );
};

export default AppLayout;
