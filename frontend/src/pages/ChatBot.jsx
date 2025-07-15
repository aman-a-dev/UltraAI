import "../css/ChatBot.css"
import React, { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import {
    FiFile,
    FiSend,
    FiPlus,
    FiEdit,
    FiFlag,
    FiDownload,
    FiSettings
} from "react-icons/fi"
import { FaRegCopy } from "react-icons/fa"
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai"
import { MdImage } from "react-icons/md"
import { FaBars } from "react-icons/fa"
import Loader from "../components/Loader.jsx"
import axios from "axios"
import { marked } from "marked"
import * as math from "mathjs"

const API_URL = import.meta.env.VITE_GEMINI_URL
const API_KEY = import.meta.env.VITE_API_KEY

// Configure marked.js
marked.setOptions({
    breaks: true,
    gfm: true,
    highlight: (code, lang) => {
        if (lang === "latex") {
            try {
                return math.parse(code).toTex()
            } catch (e) {
                return code
            }
        }
        return code
    }
})

export default function Chatbot() {
    useEffect(() => {
        window.scrollTo({ top: 0 })
    }, [])

    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="chatbot">
            <NavBar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
            <SideBar
                isOpen={sidebarOpen}
                closeSidebar={() => setSidebarOpen(false)}
            />
            <Bot />
        </div>
    )
}

function NavBar({ toggleSidebar }) {
    const [width, setWidth] = useState(window.innerWidth)

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth)
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
        <div className="botnavbar">
            {width < 600 && (
                <button
                    onClick={toggleSidebar}
                    aria-label="Toggle sidebar"
                    className="icon-button"
                >
                    <FaBars />
                </button>
            )}
            <span>
                Ultra<span className="colored">AI</span>
            </span>
            <button className="icon-button" aria-label="New chat">
                <FiPlus />
            </button>
        </div>
    )
}

function SideBar({ isOpen, closeSidebar }) {
    const [width, setWidth] = useState(window.innerWidth)
    const sidebarRef = useRef(null)

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth)
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    useEffect(() => {
        if (width < 600 && isOpen) {
            const handleClickOutside = e => {
                if (
                    sidebarRef.current &&
                    !sidebarRef.current.contains(e.target)
                ) {
                    closeSidebar()
                }
            }
            document.addEventListener("mousedown", handleClickOutside)
            return () => {
                document.removeEventListener("mousedown", handleClickOutside)
            }
        }
    }, [isOpen, width, closeSidebar])

    return (
        <div
            className={`sidebar ${width > 600 || isOpen ? "open" : ""}`}
            ref={sidebarRef}
        >
            <center className="brand">
                <img src="/img/favicon.png" alt="logo" />
                <Link
                    to="/ImgGen"
                    onClick={() => width < 600 && closeSidebar()}
                >
                    <h3>
                        <MdImage size={30} /> <b>AI Image Generator</b>
                    </h3>
                </Link>
                <Link
                    to="/Setting"
                    onClick={() => width < 600 && closeSidebar()}
                >
                    <h3>
                        <FiSettings size={30} /> <b>Settings</b>
                    </h3>
                </Link>
                <hr style={{ border: "1px dashed var(--primary)" }} />
            </center>
            <div className="history"></div>
        </div>
    )
}

function Bot() {
    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: "bot",
            text: "Hello! I'm UltraAI. How can I assist you today?"
        }
    ])
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    // Parse markdown and LaTeX
    const parseContent = text => {
        try {
            // First process LaTeX between \( \) and \[ \]
            let processedText = text.replace(
                /\$\$([^$]+)\$\$|\$([^$]+)\$/g,
                (match, p1, p2) => {
                    const latexContent = p1 || p2
                    try {
                        return math.parse(latexContent).toTex()
                    } catch (e) {
                        return match
                    }
                }
            )

            // Then process with marked.js
            return { __html: marked(processedText) }
        } catch (error) {
            console.error("Content parsing error:", error)
            return { __html: text }
        }
    }

    const handleSubmit = async e => {
        e.preventDefault()
        const trimmedInput = input.trim()
        if (!trimmedInput || isLoading) return

        const userMessage = {
            id: Date.now(),
            sender: "user",
            text: trimmedInput
        }
        setMessages(prev => [...prev, userMessage])
        setInput("")
        setIsLoading(true)

        try {
            const response = await axios.post(
                `${API_URL}${API_KEY}`,
                {
                    contents: [{ parts: [{ text: trimmedInput }] }]
                },
                {
                    headers: { "Content-Type": "application/json" },
                    timeout: 30000
                }
            )

            const botResponse =
                response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
                "I couldn't process your request. Please try again."

            const botMessage = {
                id: Date.now() + 1,
                sender: "bot",
                text: botResponse
            }
            setMessages(prev => [...prev, botMessage])
        } catch (error) {
            console.error("Error fetching AI response:", error)
            const errorMessage = {
                id: Date.now() + 1,
                sender: "bot",
                text: `Error: ${
                    error.message || "Failed to get response from AI"
                }`
            }
            setMessages(prev => [...prev, errorMessage])
        } finally {
            setIsLoading(false)
        }
    }

    const handleCopy = text => {
        navigator.clipboard.writeText(text).catch(err => {
            console.error("Failed to copy text: ", err)
        })
    }

    return (
        <div className="bot">
            <div className="result">
                {messages.map(message => (
                    <div key={message.id} className={`${message.sender}-msg`}>
                        <div
                            className="msg"
                            dangerouslySetInnerHTML={parseContent(message.text)}
                        />
                        <div className={`${message.sender}-tool`}>
                            {message.sender === "bot" ? (
                                <>
                                    <button
                                        onClick={() => handleCopy(message.text)}
                                        aria-label="Copy message"
                                        className="icon-button"
                                    >
                                        <FaRegCopy />
                                    </button>
                                    <button
                                        onClick={() => prompt("What's wrong?")}
                                        className="icon-button"
                                        aria-label="Report"
                                    >
                                        <FiFlag />
                                    </button>
                                    <button
                                        className="icon-button"
                                        aria-label="Like"
                                        onClick={() =>
                                            alert(
                                                "Thank you for your feedback."
                                            )
                                        }
                                    >
                                        <AiOutlineLike />
                                    </button>
                                    <button
                                        className="icon-button"
                                        aria-label="Dislike"
                                        onClick={() =>
                                            alert(
                                                "Thank you for your feedback We will improve the ai response in the future. "
                                            )
                                        }
                                    >
                                        <AiOutlineDislike />
                                    </button>
                                </>
                            ) : (
                                <>
                                    <span></span>
                                    <span></span>
                                    <button
                                        onClick={() => handleCopy(message.text)}
                                        aria-label="Copy message"
                                        className="icon-button"
                                    >
                                        <FaRegCopy />
                                    </button>
                                    <button
                                        onClick={() => {
                                            setInput(message.text)
                                            document
                                                .querySelector("textarea")
                                                .focus()
                                        }}
                                        aria-label="Edit message"
                                        className="icon-button"
                                    >
                                        <FiEdit />
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="bot-msg">
                        <div className="msg">
                            <Loader size="small" />
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSubmit}>
                <textarea
                    placeholder="Ask me anything..."
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    disabled={isLoading}
                    aria-label="Message input"
                />
                <div className="chat-btns">
                    <button
                        type="button"
                        className="icon-button"
                        aria-label="Attach file"
                    >
                        <label htmlFor="file-input">
                            <FiFile />
                        </label>
                        <input
                            type="file"
                            id="file-input"
                            style={{ display: "none" }}
                        />
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        aria-label="Send message"
                    >
                        {isLoading ? <Loader size="small" /> : <FiSend />}
                    </button>
                </div>
            </form>
        </div>
    )
}
