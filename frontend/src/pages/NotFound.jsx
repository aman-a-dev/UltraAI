import Nav from "../components/Nav.jsx";
import Footer from "../components/Footer.jsx";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";

export default function NotFound() {
   useEffect(() => {
        let scrolly = window.scrollY;
        if (scrolly > 0) {
            window.scrollTo({
                top: 0
            });
        }
    }, []);
    const header = {
        color: "var(--text)",
        fontSize: "4em"
    };
    const box = {
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "60px",
        margin: "50px 0 150px 0"
    };
    const btn = {
        textAlign: "center",
        padding: "10px 50px",
        background: "var(--card)",
        border: "3px solid var(--shadow)",
        color: "var(--text)"
    };

    return (
        <>
            <Nav />
            <div style={box}>
                <h1 style={header}>
                    4<img src="/img/favicon.png" width="100px" />4
                </h1>
                <p>Page not found</p>
                <Link to="/">
                    <button style={btn}>Home</button>
                </Link>
            </div>
            <Footer />
        </>
    );
}
