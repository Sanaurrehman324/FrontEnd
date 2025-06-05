import React from "react";

const DimensionsCard = ({ dimensions }) => {
    if (!dimensions) return null;

    const { width, height, depth } = dimensions;

    return (
        <div style={{
            position: "fixed",
            top: "80px",
            right: "20px",
            backgroundColor: "#2c3e50",
            color: "#fff",
            padding: "16px",
            borderRadius: "8px",
            fontFamily: "sans-serif",
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
        }}>
            <h3 style={{ marginBottom: "10px" }}>Dimensions</h3>
            <p>Width: {(dimensions.width).toFixed(2)} ft</p>
            <p>Height: {(dimensions.height).toFixed(2)} ft</p>
            <p>Depth: {(dimensions.depth).toFixed(2)} ft</p>
        </div>
    );
};

export default DimensionsCard;