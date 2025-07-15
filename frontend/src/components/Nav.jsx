import React, { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import {
    FiMenu,
    FiX,
    FiHome,
    FiUser,
    FiSettings,
    FiBriefcase,
    FiMail
} from "react-icons/fi"
import { FaRobot } from "react-icons/fa6"
import { AuthContext } from "../context/AuthContext"
import "../css/Nav.css"

const Navbar = () => {
    const { isAuthenticated, user, logout } = useContext(AuthContext)
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const navItems = [
        {
            id: 1,
            name: "Home",
            link: "/",
            icon: <FiHome className="nav-icon" />
        },
        {
            id: 5,
            name: "Contact",
            link: "/Contact#form",
            icon: <FiMail className="nav-icon" />
        },
        {
            id: 3,
            name: "Setting",
            link: "/Setting",
            icon: <FiSettings className="nav-icon" />
        },
        {
            id: 2,
            name: "About us",
            link: "/Contact",
            icon: <FiUser className="nav-icon" />
        },
        {
            id: 4,
            name: "AI ChatBot",
            link: "/Chatbot",
            icon: <FaRobot className="nav-icon" />
        }
    ]

    return (
        <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <span className="logo-text">Ultra</span>
                    <span className="logo-dot">AI.</span>
                </Link>

                <div
                    className="navbar-toggle"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? (
                        <FiX className="toggle-icon" />
                    ) : (
                        <FiMenu className="toggle-icon" />
                    )}
                </div>

                <ul className={`navbar-menu ${isOpen ? "active" : ""}`}>
                    {navItems.map(item => (
                        <li className="navbar-item" key={item.id}>
                            <Link
                                to={item.link}
                                className="navbar-link"
                                onClick={() =>
                                    window.innerWidth <= 768 && setIsOpen(false)
                                }
                            >
                                <span className="link-content">
                                    {item.icon}
                                    <span className="link-text">
                                        {item.name}
                                    </span>
                                </span>
                                <span className="link-underline"></span>
                            </Link>
                        </li>
                    ))}
                    {isAuthenticated ? (
                        <div className="profile">
                            <span></span>
                            <span>id : {user.id}</span>
                            <span>name: {user.name}</span>
                            <span>email : {user.email}</span>
                        </div>
                    ) : (
                        <div class="auth-btns">
                            <Link to="/Auth/LogIn">
                                <button>Login</button>
                            </Link>
                            <Link to="/Auth/SignIn">
                                <button>Signup</button>
                            </Link>
                        </div>
                    )}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
