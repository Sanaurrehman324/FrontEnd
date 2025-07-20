import React from 'react';
import { FaEnvelope, FaFacebook, FaInstagram } from 'react-icons/fa'; // Import icons from react-icons
import './Footer.css'; // Import the CSS file for styling

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="pages-column">
                    <h4>Pages</h4>
                    <a href="/">Home</a>
                    <a href="/interior">Interior Design</a>
                    <a href="/exterior">Exterior Design</a>
                    <a href="/contact">Contact</a>
                </div>
                <div className="social-column">
                    <h4>Social Links</h4>
                    <a href="mailto:info@buildsmart.com"><FaEnvelope /> info@buildsmart.com </a>

                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <FaFacebook />  facebook.com
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <FaInstagram />  instagram.com
                    </a>

                </div>
            </div>
        </footer>
    );
};

export default Footer;