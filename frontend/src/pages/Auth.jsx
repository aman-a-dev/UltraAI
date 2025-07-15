import React, { useState, useEffect } from "react";
import { FaGoogle, FaTwitter, FaGithub } from "react-icons/fa";

import axios from "axios";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "../css/Auth.css";
// components
import Nav from "../components/Nav.jsx";
import Footer from "../components/Footer.jsx";
const Loader = React.lazy(() => import("../components/Loader.jsx"));
// api

import { apiUrl } from "./Home.jsx";

export default function Auth() {
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
            <div className="auth">
                <div className="tab-container">
                    <Link to="SignIn">
                        <input type="radio" id="tab1" name="auth" />
                        <label className="tab_label" htmlFor="tab1">
                            Sign in
                        </label>
                    </Link>
                    <Link to="LogIn">
                        <input type="radio" id="tab2" name="auth" />
                        <label className="tab_label" htmlFor="tab2">
                            Log in
                        </label>
                    </Link>
                </div>
                <Outlet />
            </div>
            <Footer />
        </>
    );
}
export function LogIn() {
    const [form, setForm] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();

    const [error, setError] = useState([]);
    const [loading, setLoading] = useState(false);

    function handleInput(e) {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const { email, password } = form;
        const errors = [];
        if (!email.trim()) errors.push("Email is required");
        if (!email.includes("@")) errors.push("Email must include @");
        if (!password.trim()) errors.push("Password is required");
        if (password.length < 6)
            errors.push("Password must be greater than 6 characters");
        if (errors.length > 0) {
            setError(errors);
            return;
        }
        setError([]);
        setLoading(true);
        try {
            const res = await axios.post(
                `${apiUrl}/api/login`,
                {
                    email,
                    password
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            if (res.data.success == true) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                alert("Login successfully");
                navigate("/Chatbot");
                window.location.reload()
            }
        } catch (err) {
            setError([
                "Login failed. Please try again. Check password or email."
            ]);
        } finally {
            setLoading(false);
        }
    }
    axios.interceptors.request.use(
        config => {
            const token = localStorage.getItem("token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    );
    return (
        <div className="signup">
            <div className="form-container">
                <p className="title">Login</p>

                {error.length > 0 && (
                    <div
                        className="err"
                        style={{
                            border: "1px solid var(--error)",
                            padding: "10px"
                        }}
                    >
                        {error.map((val, index) => (
                            <p key={index}>
                                <b style={{ color: "var(--error)" }}>{val}</b>
                            </p>
                        ))}
                    </div>
                )}

                <form className="form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="example@gmail.com"
                            value={form.email}
                            onChange={handleInput}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="●●●●●●"
                            value={form.password}
                            onChange={handleInput}
                            required
                        />
                        <div className="forgot">
                            <Link to="/Contact">Forgot Password?</Link>
                        </div>
                    </div>

                    {loading ? (
                        <Loader position={{ left: "45%", right: "45%" }} />
                    ) : (
                        <button className="sign" type="submit">
                            Log in
                        </button>
                    )}
                </form>
                {loading ? (
                    <div></div>
                ) : (
                    <div className="social-message">
                        <div className="line"></div>
                        <p className="message">Login to continue 🟣</p>
                        <div className="line"></div>
                    </div>
                )}
            </div>
        </div>
    );
}

export function SignIn() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const [error, setError] = useState([]);
    const [loading, setLoading] = useState(false);

    function handleInput(e) {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const { name, email, password } = form;
        const errors = [];
        if (!name.trim()) errors.push("Name is required");
        if (!email.trim()) errors.push("Email is required");
        if (!email.includes("@")) errors.push("Email must include @");
        if (!password.trim()) errors.push("Password is required");
        if (password.length < 6)
            errors.push("Password must be greater than 6 characters");
        if (errors.length > 0) {
            setError(errors);
            return;
        }
        setError([]);
        setLoading(true);
        try {
            const res = await axios.post(
                `${apiUrl}/api/signin`,
                {
                    name,
                    email,
                    password
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            if (res.data.success == true) {
                alert("You successfully created account");
                navigate("/Auth/LogIn");
            } else {
            }
        } catch (err) {
            setError(["signin failed. Please try again."]);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="signup">
            <div className="form-container">
                <p className="title">Sign up</p>

                {error.length > 0 && (
                    <div
                        className="err"
                        style={{
                            border: "1px solid var(--error)",
                            padding: "10px"
                        }}
                    >
                        {error.map((val, index) => (
                            <p key={index}>
                                <b style={{ color: "var(--error)" }}>{val}</b>
                            </p>
                        ))}
                    </div>
                )}

                <form className="form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Chose a username to use"
                            value={form.name}
                            onChange={handleInput}
                            required
                        />
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="example@gmail.com"
                            value={form.email}
                            onChange={handleInput}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="●●●●●●"
                            value={form.password}
                            onChange={handleInput}
                            required
                        />
                    </div>

                    {loading ? (
                        <Loader position={{ left: "45%", right: "45%" }} />
                    ) : (
                        <button className="sign" type="submit">
                            Sign up
                        </button>
                    )}
                </form>
                {loading ? (
                    <div></div>
                ) : (
                    <div className="social-message">
                        <div className="line"></div>
                        <p className="message">Create account 🟣</p>
                        <div className="line"></div>
                    </div>
                )}
            </div>
        </div>
    );
}
