import React, { useState } from "react";
import {
    FaBars, FaBath, FaBed,
    FaCouch, FaKitchenSet,
    FaLeaf, FaLightbulb, FaRug, FaTable, FaTv
} from "react-icons/fa6";
import { FiDownload } from "react-icons/fi";
import sofa3Model from './models/3Sofa.glb';
import chandelierModel from './models/Chandelier.glb';
import chandelier2Model from './models/Chandelier2.glb';
import classicBedModel from './models/Classic Bed.glb';
import classicKitchenModel from './models/Classic Kitchen.glb';
import classicBed2Model from './models/ClassicalBed.glb';
import coffeeTableModel from './models/CoffeeTable.glb';
import couchModel from './models/Couch.glb';
import curtainModel from './models/Curtain.glb';
import curtain2Model from './models/Curtain2.glb';
import dinningTableModel from './models/Dinning Table.glb';
import diningTableModel from './models/Dinning.glb';
import dressingTableModel from './models/DressingTable.glb';
import fireplaceModel from './models/Fireplace Builtin.glb';
import kitchenIslandModel from './models/Kitchen-Island.glb';
import kitchenModel from './models/Kitchen.glb';
import lKitchenModel from './models/L-Kitchen.glb';
import modernBedModel from './models/ModernBed.glb';
import pendantLightModel from './models/PendantLight.glb';
import planterModel from './models/Planter.glb';
import portraitModel from './models/Portraits.glb';
import roundDiningModel from './models/RoundDinning.glb';
import roundRugModel from './models/Round_Rug.glb';
import rugModel from './models/Rug.glb';
import sofaModel from './models/SofaChair.GLB';
import sofaSetModel from './models/SofaSet.glb';
import tvConsole2Model from './models/TV Console2.glb';
import tvConsoleModel from './models/TV-Console.glb';
import tableModel from './models/Table.glb';
import vanityModel from './models/Vanity.glb';
import woodBed2Model from './models/WoodBed.glb';
import woodenBedModel from './models/WoodenBed.glb';
// import chairModel from './models/furniture_sofa.glb';
import kingBedModel from './models/king_bed.glb';



const furnitureItems = [
    { name: "Bed", path: kingBedModel, icon: <FaBed /> },
    { name: "Wood-Bed", path: woodenBedModel, icon: <FaBed /> },
    { name: "Wood-Bed2", path: woodBed2Model, icon: <FaBed /> },
    { name: "ModernBed", path: modernBedModel, icon: <FaBed /> },
    { name: "Classic Bed", path: classicBedModel, icon: <FaBed /> },
    { name: "Classic Bed-2", path: classicBed2Model, icon: <FaBed /> },
    { name: "FirePlace Built-in", path: fireplaceModel, icon: <FaBed /> },
    { name: "Chandelier", path: chandelierModel, icon: <FaLightbulb /> },
    { name: "Chandelier2", path: chandelier2Model, icon: <FaLightbulb /> },
    // { name: "Chair", path: chairModel, icon: <FaChair /> },
    { name: "Planter", path: planterModel, icon: <FaLeaf /> },
    { name: "Kitchen", path: kitchenModel, icon: <FaKitchenSet /> },
    { name: "Classic Kitchen", path: classicKitchenModel, icon: <FaKitchenSet /> },
    { name: "Kitchen Island", path: kitchenIslandModel, icon: <FaKitchenSet /> },
    { name: "L Kitchen", path: lKitchenModel, icon: <FaKitchenSet /> },
    { name: "3 Seater Sofa", path: sofa3Model, icon: <FaCouch /> },
    { name: "Tv-Console", path: tvConsoleModel, icon: <FaTv /> },
    { name: "Tv-Console2", path: tvConsole2Model, icon: <FaTv /> },
    { name: "Pendant-Light", path: pendantLightModel, icon: <FaLightbulb /> },
    { name: "Sofa", path: sofaModel, icon: <FaCouch /> },
    { name: "Couch", path: couchModel, icon: <FaCouch /> },
    { name: "SofaSet", path: sofaSetModel, icon: <FaCouch /> },
    { name: "CoffeeTable", path: coffeeTableModel, icon: <FaTable /> },
    { name: "Table", path: tableModel, icon: <FaTable /> },
    { name: "Rug", path: rugModel, icon: <FaRug /> },
    { name: "Round Rug", path: roundRugModel, icon: <FaRug /> },
    { name: "Curtain", path: curtainModel, icon: <FaRug /> },
    { name: "Curtain2", path: curtain2Model, icon: <FaRug /> },
    { name: "DinningTable", path: dinningTableModel, icon: <FaTable /> },
    { name: "Dining Table", path: diningTableModel, icon: <FaTable /> },
    { name: "Round Dining Table", path: roundDiningModel, icon: <FaTable /> },
    { name: "DressingTable", path: dressingTableModel, icon: <FaTable /> },
    { name: "Vanity", path: vanityModel, icon: <FaBath /> },
    { name: "Image Portrait", path: portraitModel, icon: <FaBath /> },
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
