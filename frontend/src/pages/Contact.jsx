import React, { useState, useEffect } from "react";
import "../css/Contact.css";
import Nav from "../components/Nav.jsx";
import Footer from "../components/Footer.jsx";
import axios from "axios";
import { apiUrl } from "./Home.jsx";
import Loader from "../components/Loader.jsx";

export default function Contact() {
   useEffect(() => {
        let scrolly = window.scrollY;
        if (scrolly > 0) {
            window.scrollTo({
                top: 0
            });
        }
    }, []);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        msg: ""
    });
    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    async function handleSubmit(e) {
        setLoading(true);
        e.preventDefault();
        const { name, email, msg } = formData;
        if (name && email && msg) {
            try {
                const res = await axios.post(
                    `${apiUrl}/api/contact`,
                    { name, email, msg },
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                );
                if (res.data) {
                    alert(res.data.resp);
                }
                setLoading(false);
            } catch (err) {
                alert("An error occurred while sending your message.");
                console.error(err);
                setLoading(false);
            }
        }
    }

    return (
        <>
            <Nav />
            <div className="contact-box">
                <div className="bgblue">
                    <h1>About us</h1>
                    <div className="card">
                        <span className="colored">Welcome to Ultra AI</span> —
                        your all-in-one AI assistant hub powered by ChatGPT,
                        DeepSeek, and Gemini. We provide cutting-edge AI
                        services including AI chat for smart conversations and
                        AI image generation for stunning visuals. Whether you're
                        creating, learning, or exploring, Ultra AI Power
                        delivers fast, intelligent, and creative solutions with
                        the power of the world's top AI models.
                    </div>
                </div>
                <form className="form" id="form" onSubmit={handleSubmit}>
                    <h1>Message us</h1>
                    <input
                        name="name"
                        value={formData.name}
                        onInput={handleChange}
                        className="input"
                        type="text"
                        placeholder="Name"
                        required
                    />
                    <input
                        name="email"
                        value={formData.email}
                        onInput={handleChange}
                        className="input"
                        type="email"
                        placeholder="E-Mail"
                        required
                    />
                    <textarea
                        name="msg"
                        value={formData.msg}
                        onInput={handleChange}
                        className="textarea"
                        placeholder="Enter message"
                        required
                    ></textarea>
                    <center>
                        {loading ? (
                            <Loader position={{}} />
                        ) : (
                            <button className="button" type="submit">
                                Submit
                            </button>
                        )}
                    </center>
                </form>
            </div>
            <Footer />
        </>
    );
}
