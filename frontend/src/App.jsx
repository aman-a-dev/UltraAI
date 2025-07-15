// library
import React from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
// css
import "./App.css";
// pages
import Home from "./pages/Home.jsx";
import ChatBot from "./pages/ChatBot.jsx";
import Plan from "./pages/Plan.jsx";
import Contact from "./pages/Contact.jsx";
import Setting from "./pages/Setting.jsx";
import Auth from "./pages/Auth.jsx";
import ImgGen from "./pages/ImgGen.jsx";
import NotFound from "./pages/NotFound.jsx";
import Download from "./pages/Download.jsx";
// components
import { SignIn, LogIn } from "./pages/Auth.jsx";
// src/App.jsx
import { AuthProvider } from "./context/AuthContext";

const App = () => {
   
    return (
        <>
            <main>
                <AuthProvider>
                    <Routes>
                        <Route path="/" element={<Home />}></Route>
                        <Route path="/ChatBot" element={<ChatBot />}></Route>
                        <Route path="/Plan" element={<Plan />}></Route>
                        <Route path="/Contact" element={<Contact />}></Route>
                        <Route path="/Setting" element={<Setting />}></Route>
                        <Route path="/Auth" element={<Auth />}>
                            <Route path="SignIn" element={<SignIn />} />
                            <Route path="LogIn" element={<LogIn />} />
                        </Route>
                        <Route path="/ImgGen" element={<ImgGen />}></Route>
                        <Route path="/Download" element={<Download />}></Route>
                        <Route path="*" element={<NotFound />}></Route>
                    </Routes>
                </AuthProvider>
            </main>
        </>
    );
};

export default App;
