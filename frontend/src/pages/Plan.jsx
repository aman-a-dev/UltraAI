import React, { useState, useEffect } from "react";
import "../css/Plan.css";
import { Link } from "react-router-dom";
// components
import Nav from "../components/Nav.jsx";
import Footer from "../components/Footer.jsx";

export default function Plan() {
    const [visaCard, setVisaCard] = useState(false);
    useEffect(() => {
        let scrolly = window.scrollY;
        if (scrolly > 0) {
            window.scrollTo({
                top: 0
            });
        }
    }, []);
    return (
        <>
            <Nav />
            <div className="plan-box">
                <div className="plans">
                    <div className="card">
                        <span className="title">
                            Free
                            <p className="pricing">
                                $0 <span className="pricing-time">/ month</span>
                            </p>
                            <span className="sub-title">
                                Everything on{" "}
                                <span className="colored">Free</span> plan
                                <ul className="list">
                                    <li className="list-item">
                                        <span className="check">✓</span> Chat
                                        with AI
                                    </li>
                                    <li className="list-item">
                                        <span className="check">✓</span> Limited
                                        file upload
                                    </li>
                                    <li className="list-item">
                                        <span className="check">✓</span> Limited
                                        image upload
                                    </li>
                                    <li className="list-item">
                                        <span className="check">✓</span> Limited
                                        image generation
                                    </li>
                                    <li className="list-item">
                                        <span className="check">✓</span> limited
                                        chat history database
                                    </li>
                                </ul>
                                <Link to="/Chatbot">
                                    <button className="button">
                                        <span className="text-button">
                                            Free trial
                                        </span>
                                    </button>
                                </Link>
                            </span>
                        </span>
                    </div>
                    <div className="card">
                        <span className="title">
                            Pro
                            <p className="pricing">
                                $50{" "}
                                <span className="pricing-time">/ annually</span>
                            </p>
                            <span className="sub-title">
                                Everything on{" "}
                                <span className="colored">pro</span> plus:
                                <ul className="list">
                                    <li className="list-item">
                                        <span className="check">✓</span>{" "}
                                        Unlimited chat
                                    </li>
                                    <li className="list-item">
                                        <span className="check">✓</span>{" "}
                                        Unlimited file upload
                                    </li>
                                    <li className="list-item">
                                        <span className="check">✓</span>{" "}
                                        Unlimited image upload
                                    </li>
                                    <li className="list-item">
                                        <span className="check">✓</span>{" "}
                                        Unlimited image generation
                                    </li>
                                    <li className="list-item">
                                        <span className="check">✓</span>{" "}
                                        Unlimited chat history database
                                    </li>
                                </ul>
                                <button
                                    className="button"
                                    onClick={() => setVisaCard(!visaCard)}
                                >
                                    <span className="text-button">
                                        Get pro now
                                    </span>
                                </button>
                            </span>
                        </span>
                    </div>
                </div>
                <div
                    className="visa-card"
                    style={{ display: visaCard ? "flex" : "none" }}
                >
                    <div className="logoContainer">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="23"
                            height="23"
                            viewBox="0 0 48 48"
                            className="svgLogo"
                        >
                            <path
                                fill="#ff9800"
                                d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z"
                            ></path>
                            <path
                                fill="#d50000"
                                d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z"
                            ></path>
                            <path
                                fill="#ff3d00"
                                d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z"
                            ></path>
                        </svg>
                    </div>
                    <div className="number-container">
                        <label className="input-label" htmlFor="cardNumber">
                            CARD NUMBER
                        </label>
                        <input
                            className="inputstyle"
                            id="cardNumber"
                            placeholder="XXXX XXXX XXXX XXXX"
                            name="cardNumber"
                            type="text"
                        />
                    </div>

                    <div className="name-date-cvv-container">
                        <div className="name-wrapper">
                            <label className="input-label" htmlFor="holderName">
                                CARD HOLDER
                            </label>
                            <input
                                className="inputstyle"
                                id="holderName"
                                placeholder="NAME"
                                type="text"
                            />
                        </div>

                        <div className="expiry-wrapper">
                            <label className="input-label" htmlFor="expiry">
                                VALID THRU
                            </label>
                            <input
                                className="inputstyle"
                                id="expiry"
                                placeholder="MM/YY"
                                type="text"
                            />
                        </div>
                        <div className="cvv-wrapper">
                            <label className="input-label" htmlFor="cvv">
                                CVV
                            </label>
                            <input
                                className="inputstyle"
                                placeholder="***"
                                maxLength="3"
                                id="cvv"
                                type="password"
                            />
                        </div>
                    </div>
                </div>

                <button
                    style={{ display: visaCard ? "flex" : "none" }}
                    className="pay-btn"
                    onClick={() =>
                        alert("⚠️ The primum pro is not available ⚠️")
                    }
                >
                    <span className="btn-text">Pay Now</span>
                    <div className="icon-container">
                        <svg viewBox="0 0 24 24" className="icon card-icon">
                            <path
                                d="M20,8H4V6H20M20,18H4V12H20M20,4H4C2.89,4 2,4.89 2,6V18C2,19.11 2.89,20 4,20H20C21.11,20 22,19.11 22,18V6C22,4.89 21.11,4 20,4Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                        <svg viewBox="0 0 24 24" className="icon payment-icon">
                            <path
                                d="M2,17H22V21H2V17M6.25,7H9V6H6V3H18V6H15V7H17.75L19,17H5L6.25,7M9,10H15V8H9V10M9,13H15V11H9V13Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                        <svg viewBox="0 0 24 24" className="icon dollar-icon">
                            <path
                                d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"
                                fill="currentColor"
                            ></path>
                        </svg>

                        <svg
                            viewBox="0 0 24 24"
                            className="icon wallet-icon default-icon"
                        >
                            <path
                                d="M21,18V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5A2,2 0 0,1 5,3H19A2,2 0 0,1 21,5V6H12C10.89,6 10,6.9 10,8V16A2,2 0 0,0 12,18M12,16H22V8H12M16,13.5A1.5,1.5 0 0,1 14.5,12A1.5,1.5 0 0,1 16,10.5A1.5,1.5 0 0,1 17.5,12A1.5,1.5 0 0,1 16,13.5Z"
                                fill="currentColor"
                            ></path>
                        </svg>

                        <svg viewBox="0 0 24 24" className="icon check-icon">
                            <path
                                d="M9,16.17L4.83,12L3.41,13.41L9,19L21,7L19.59,5.59L9,16.17Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                    </div>
                </button>
            </div>
            <Footer />
        </>
    );
}
