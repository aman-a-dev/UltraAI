import Nav from "../components/Nav.jsx";
import Footer from "../components/Footer.jsx";
import { SiAndroid, SiApple } from "react-icons/si";
import React, { useEffect } from "react";
export default function Download() {
   useEffect(() => {
        let scrolly = window.scrollY;
        if (scrolly > 0) {
            window.scrollTo({
                top: 0
            });
        }
    }, []);
    const btn = {
        backgroundColor: "var(--shadow)",
        padding: "10px 50px",
        borderRadius: "10px",
        color: "var(--text)",
        border: "2px solid var(--primary)"
    };

    const img = {
        padding: "10px",
        borderRadius: "10px",
        boxShadow: "0 0 10px var(--shadow)",
        aspectRatio: "1/1"
    };
    return (
        <>
            <Nav />
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "20px",
                    margin: "100px 5%",
                    gap: "20px ",
                    alignItems: "center"
                }}
            >
                <h1
                    style={{ textAlign: "center", textDecoration: "underline" }}
                >
                    Download The App
                </h1>
                <hr
                    style={{
                        border: "1.5px solid var(--accent)",
                        width: "100%",
                        margin: "30px 0"
                    }}
                />
                <img
                    style={img}
                    src="/img/favicon.png"
                    alt="app-icon"
                    width="100px"
                />
                <a
                    onClick={() =>
                        alert(
                            "Android app is no available we will send you email when it ready. "
                        )
                    }
                >
                    <button style={btn}>
                        <SiAndroid /> <span>Android</span>
                    </button>
                </a>
                {/* <a href="/app/ultraAI.apk">
                    <button style={btn}>
                        <SiAndroid /> <span>Android</span>
                    </button>
                </a>*/}
                <a
                    onClick={() =>
                        alert(
                            "IOS app is no available we will send you email when it ready. "
                        )
                    }
                >
                    <button style={btn}>
                        <SiApple /> <span>IOS</span>
                    </button>
                </a>
                <hr
                    style={{
                        border: "1.5px solid var(--accent)",
                        width: "100%",
                        margin: "30px 0"
                    }}
                />
            </div>
            <Footer />
        </>
    );
}
