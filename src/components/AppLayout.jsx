import React, { useState } from 'react';
import Navbar from './Navbar.jsx';
import MainSection from './MainSection.jsx';
import CreateGroupModal from './CreateGroupModal.jsx';

const AppLayout = () => {
  const [groups, setGroups] = useState([]);
  const [activeGroup, setActiveGroup] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleCreateGroup = (group) => {
    const initials = group.name
      .split(" ")
      .map(w => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    const newGroup = {
      id: Date.now(),
      name: group.name,
      color: group.color,
      initials,
      notes: []
    };

    setGroups([...groups, newGroup]);
    setActiveGroup(newGroup);
  };

  const addNoteToGroup = (note) => {
  setGroups(prevGroups => {
    const updatedGroups = prevGroups.map(g =>
      g.id === activeGroup.id
        ? { ...g, notes: [...g.notes, note] }
        : g
    );


    const updatedActive = updatedGroups.find(
      g => g.id === activeGroup.id
    );
    setActiveGroup(updatedActive);

    return updatedGroups;
  });
};

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
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
