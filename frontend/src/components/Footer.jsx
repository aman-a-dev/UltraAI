import React from "react";
import { SiDiscord, SiTelegram, SiAndroid, SiApple } from "react-icons/si";
import { FaTwitter, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import "../css/Footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                {/* Logo Section */}
                <div className="logo-section">
                    <div className="logo-container">
                        <img
                            src="/img/favicon.svg"
                            alt="UltraAi Logo"
                            className="logo-img"
                        />
                        <h1 className="logo-text">UltraAi</h1>
                    </div>
                    <p className="tagline">Empowering creativity with AI</p>
                </div>

                {/* Quick Links */}
                <div className="links-section">
                    <h3 className="section-title">Quick Links</h3>
                    <ul className="links-list">
                        <li>
                            <Link to="/About" className="nav-link">
                                About
                            </Link>
                        </li>
                        <li>
                            <Link to="/Chatbot" className="nav-link">
                                ChatBot
                            </Link>
                        </li>
                        <li>
                            <Link to="/Setting" className="nav-link">
                                Settings
                            </Link>
                        </li>
                        <li>
                            <Link to="/ImgGen" className="nav-link">
                                Image Generator
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Download App */}
                <div className="download-section">
                    <h3 className="section-title">Download App</h3>
                    <div className="download-buttons">
                        <Link to="/Download" className="download-btn" target="_blank">
                            <SiAndroid className="download-icon" />
                            <span>Android</span>
                        </Link>
                        <Link to="/Download"  className="download-btn" target="_blank">
                            <SiApple className="download-icon" />
                            <span>iOS</span>
                        </Link>
                    </div>
                </div>

                {/* Contact Section */}
                <div className="contact-section">
                    <h3 className="section-title">Connect With Us</h3>
                    <div className="social-icons">
                        <a
                            href="https://discord.com/users/1337498418167414875"
                            rel="noopener noreferrer"
                            className="social-icon"
                            target="_blank"
                        >
                            <SiDiscord />
                        </a>
                        <a
                            href="https://x.com/Aman_A_Dev"
                            rel="noopener noreferrer"
                            className="social-icon"
                            target="_blank"
                        >
                            <FaTwitter />
                        </a>
                        <a
                            href="https://t.me/aman_a_dev"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-icon"
                            
                        >
                            <SiTelegram />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/amanuel-antenh-20657436a"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-icon"
                            
                        >
                            <FaLinkedin />
                        </a>
                        <a
                            href="mailto:amanuelantenha@gmail.com"
                            className="social-icon"
                            target="_blank"
                        >
                            <MdEmail />
                        </a>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="copyright-section">
                <p>
                    &copy; {new Date().getFullYear()} UltraAi. All rights
                    reserved.
                </p>
            </div>
        </footer>
    );
}
