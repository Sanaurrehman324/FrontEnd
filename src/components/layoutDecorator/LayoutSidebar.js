import React, { useState } from "react";
import "./LayoutSidebar.css"; // ✅ Optional

const layouts = [
    {
        name: "Evergreen Duplex Residence",
        modelPath: "https://res.cloudinary.com/dgnppjqah/image/upload/v1752264946/jaime_fgzsc2.glb",
        icon: "🏠",
    },
    {
        name: "Luxury Classical Villa",
        modelPath: "/models/mdab.glb",
        icon: "🏡",
    },
    {
        name: "Modern Appartment Interior Layout",
        modelPath: "https://res.cloudinary.com/dgnppjqah/image/upload/v1752264872/Hamisha_vvmn2q.glb",
        icon: "🏢",
    },
    {
        name: "Contemporary House Layout",
        modelPath: "https://res.cloudinary.com/dgnppjqah/image/upload/v1752263471/Allysa_j6siev.glb",
        icon: "🏢",
    },
];


const LayoutSidebar = ({ onSelectLayout }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    // Filter layouts based on search query (case-insensitive)
    const filteredLayouts = layouts.filter((layout) =>
        layout.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className={`layout-sidebar ${isOpen ? "open" : "closed"}`}>
            <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? "→" : "←"}
            </button>

            {isOpen && (
                <div className="sidebar-content">
                    <h3>🗂 Choose a Layout</h3>
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="Search layouts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <ul className="layout-list">
                        {filteredLayouts.map((layout) => (
                            <li
                                key={layout.name}
                                className="layout-item"
                                onClick={() => onSelectLayout(layout.modelPath)}
                            >
                                <span className="icon">{layout.icon}</span>
                                <span>{layout.name}</span>
                            </li>
                        ))}
                        {filteredLayouts.length === 0 && (
                            <li className="no-results">No layouts found.</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default LayoutSidebar;
