import React, { useState } from 'react';
import '../styles/modal.css';

const COLORS = ['#B197FC', '#FF6FD8', '#3DDCFF', '#FFA36C', '#0047FF', '#6C8CFF'];
const CreateGroupModal = ({ onClose, onCreate }) => {
    const [groupName, setGroupName] = useState("");
    const [selectedColor, setSelectedColor] = useState(COLORS[0]);

    const handleCreate = () => {
        if (!groupName.trim()) {
            alert("Please enter group name");
            return;
        }

        onCreate({ name: groupName, color: selectedColor });

        onClose();
    };
    return (
        <div className="modal-overlay">
            <div className="modal-box">
                <h2>Create New group</h2>

                <div className="form-group">
                    <label>Group Name</label>
                    <input
                        type="text"
                        placeholder="Enter group name"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Choose colour</label>
                    <div className="color-options">
                        {COLORS.map((color) => (
                            <span
                                key={color}
                                className={'color-circle' + (selectedColor === color ? ' active' : '')}
                                style={{ backgroundColor: color }}
                                onClick={() => setSelectedColor(color)}
                            />
                        ))}
                    </div>
                </div>

                <button className="create-btn" onClick={handleCreate}>
                    Create
                </button>
            </div>
        </div>
    );
}

export default CreateGroupModal;
