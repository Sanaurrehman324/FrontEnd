import React, { useState } from "react";
import {
    FaBars, FaBath, FaBed,
    FaLeaf, FaLightbulb, FaRug, FaTable, FaTv
} from "react-icons/fa6";
import { FiDownload } from "react-icons/fi";
// import chairModel from './models/furniture_sofa.glb';



const furnitureItems = [
    { name: "Wood-Bed", path: "https://res.cloudinary.com/dgnppjqah/image/upload/v1752264921/WoodBed_tgxanb.glb", icon: <FaBed /> },
    { name: "Classic Bed", path: "https://res.cloudinary.com/dgnppjqah/image/upload/v1752264940/Classic_Bed_ugz4ti.glb", icon: <FaBed /> },
    { name: "FirePlace Built-in", path: "https://res.cloudinary.com/dgnppjqah/image/upload/v1752264875/Fireplace_Builtin_nsde7p.glb", icon: <FaBed /> },
    { name: "Chandelier", path: "https://res.cloudinary.com/dgnppjqah/image/upload/v1752263323/Chandelier_sictva.glb", icon: <FaLightbulb /> },
    { name: "Chandelier2", path: "https://res.cloudinary.com/dgnppjqah/image/upload/v1752264918/Chandelier2_ukylhz.glb", icon: <FaLightbulb /> },
    { name: "Planter", path: "/https://res.cloudinary.com/dgnppjqah/image/upload/v1752264945/Planter_avfvdn.glb", icon: <FaLeaf /> },
    { name: "Tv-Console", path: "https://res.cloudinary.com/dgnppjqah/image/upload/v1752264940/TV_Console2_awwwxn.glb", icon: <FaTv /> },
    { name: "Pendant-Light", path: "https://res.cloudinary.com/dgnppjqah/image/upload/v1752264872/PendantLight_fg8ciu.glb", icon: <FaLightbulb /> },
    { name: "CoffeeTable", path: "https://res.cloudinary.com/dgnppjqah/image/upload/v1752264946/CoffeeTable_jp5unx.glb", icon: <FaTable /> },
    { name: "Rug", path: "/https://res.cloudinary.com/dgnppjqah/image/upload/v1752264872/Rug_qlkbkw.glb", icon: <FaRug /> },
    { name: "Round Rug", path: "https://res.cloudinary.com/dgnppjqah/image/upload/v1752264927/Round_Rug_mjfvtg.glb", icon: <FaRug /> },
    { name: "Curtain", path: "https://res.cloudinary.com/dgnppjqah/image/upload/v1752264944/Curtain2_lhqgim.glb", icon: <FaRug /> },
    { name: "DressingTable", path: "https://res.cloudinary.com/dgnppjqah/image/upload/v1752264874/Mirror_with_Table_syx36l.glb", icon: <FaTable /> },
    { name: "Vanity", path: "https://res.cloudinary.com/dgnppjqah/image/upload/v1752264911/Vanity_b7ohlw.glb", icon: <FaBath /> },
    { name: "Image Portrait", path: "https://res.cloudinary.com/dgnppjqah/image/upload/v1752264875/Portraits_upz3dr.glb", icon: <FaBath /> },

];

const Sidebar = ({ onAddFurniture, onCaptureScreenshot }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [hovered, setHovered] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredItems = furnitureItems.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            {isOpen && (
                <button onClick={onCaptureScreenshot} style={styles.exportButton}>
                    <FiDownload style={{ marginRight: "8px", fontSize: "18px" }} />
                    Export
                </button>
            )}

            <div style={{
                ...styles.sidebar,
                width: isOpen ? "300px" : "60px",
                padding: isOpen ? "20px" : "10px",
                alignItems: isOpen ? "flex-start" : "center"
            }}>
                <button style={styles.toggleButton} onClick={() => setIsOpen(!isOpen)}>
                    <FaBars />
                </button>

                {isOpen && <h2 style={styles.title}>Furniture Library</h2>}

                {isOpen && (
                    <input
                        type="text"
                        placeholder="Search furniture..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={styles.searchInput}
                    />
                )}

                {isOpen && (
                    <div style={styles.listContainer}>
                        {filteredItems.map(item => (
                            <div key={item.name} style={styles.itemWrapper}>
                                <button
                                    onClick={() => onAddFurniture(item.path)}
                                    onMouseEnter={() => setHovered(item.name)}
                                    onMouseLeave={() => setHovered(null)}
                                    style={{
                                        ...styles.itemButton,
                                        backgroundColor: hovered === item.name ? "#a8e6cf" : "#4e5a65",
                                        color: hovered === item.name ? "#333" : "#fff"
                                    }}
                                >
                                    <span style={styles.icon}>{item.icon}</span>
                                    {item.name}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

const styles = {
    sidebar: {
        position: "fixed",
        top: 0,
        left: 0,
        height: "100%",
        backgroundColor: "#f5f5f5",
        boxSizing: "border-box",
        overflowY: "auto",
        zIndex: 10,
        borderRight: "1px solid #ccc",
        boxShadow: "4px 0px 12px rgba(0, 0, 0, 0.05)",
        borderRadius: "0 10px 10px 0",
        fontFamily: "'Roboto', sans-serif",
        transition: "width 0.3s ease, padding 0.3s ease",
        padding: "20px"
    },
    title: {
        textAlign: "left",
        fontSize: "22px",
        marginBottom: "12px",
        fontWeight: "bold",
        color: "#333",
        paddingLeft: "10px"
    },
    toggleButton: {
        position: "absolute",
        top: "10px",
        right: "10px",
        background: "none",
        border: "none",
        color: "#333",
        fontSize: "22px",
        cursor: "pointer"
    },
    searchInput: {
        width: "90%",
        padding: "8px 12px",
        marginBottom: "16px",
        fontSize: "15px",
        borderRadius: "6px",
        border: "1px solid #ccc",
        outline: "none",
        boxShadow: "0px 2px 4px rgba(0,0,0,0.05)"
    },
    listContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "10px"
    },
    itemWrapper: {},
    itemButton: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        margin: "6px 0",
        padding: "12px",
        width: "100%",
        border: "none",
        borderRadius: "8px",
        fontSize: "15px",
        cursor: "pointer",
        transition: "background-color 0.3s ease, transform 0.2s ease",
        boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)"
    },
    icon: {
        fontSize: "18px"
    },
    exportButton: {
        position: "fixed",
        top: "15px",
        left: "320px",
        zIndex: 101,
        padding: "10px 18px",
        backgroundColor: "#10B981",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        fontSize: "15px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        boxShadow: "0px 3px 8px rgba(0,0,0,0.15)",
        transition: "background-color 0.3s ease"
    }
};

export default Sidebar;
