const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const nodemailer = require("nodemailer");

require("dotenv").config();
const db = require("./db.js");

const app = express();
const PORT = 7000;

// Middleware
app.use("/img", express.static(path.join(__dirname, "img")));

app.use(
    cors({
        origin: process.env.FRONTEND_URL, // no extra slash
        methods: ["GET", "POST"],
        credentials: true // add this if you're using cookies or sessions
    })
);
app.use(express.json());

// jwt
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

/** Images endpoint **/
app.get("/api/images", (req, res) => {
    const imgDir = path.join(__dirname, "img");
    fs.readdir(imgDir, (err, files) => {
        if (err) {
            return res.status(500).json({ error: "Failed to read images" });
        }
        const imageUrls = files.map(file => `/img/${file}`);
        res.json(imageUrls);
    });
});

/** Login endpoint **/
app.post("/api/login", (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            error: "Email and password are required"
        });
    }

    // Check if user exists
    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({
                success: false,
                error: "Database error"
            });
        }

        if (results.length === 0) {
            return res.status(401).json({
                success: false,
                error: "Invalid email or password"
            });
        }

        const user = results[0];

        // Compare password with hashed password
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                console.error("Bcrypt error:", err);
                return res.status(500).json({
                    success: false,
                    error: "Error verifying password"
                });
            }

            if (!isMatch) {
                return res.status(401).json({
                    success: false,
                    error: "Invalid email or password"
                });
            }

            // Create JWT token
            const token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );

            res.status(200).json({
                success: true,
                message: "Login successful",
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            });
        });
    });
});
/** signin endpoint **/
app.post("/api/signin", (req, res) => {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            error: "Name, email, and password are required"
        });
    }

    // Hash the password using bcryptjs
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            console.error("Hashing error:", err);
            return res.status(500).json({
                success: false,
                error: "Error hashing password"
            });
        }

        // Insert into the database
        const sql =
            "INSERT INTO users (name, email, password, created_at) VALUES (?, ?, ?, NOW())";
        db.query(sql, [name, email, hashedPassword], (err, result) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({
                    success: false,
                    message: "Database error: " + err.message
                });
            }

            // Success response
            res.status(201).json({
                success: true,
                message: "Account successfully created"
            });
        });
    });
});
/** contact endpoint **/
app.post("/api/contact", (req, res) => {
    const { name, email, msg } = req.body;

    if (!name || !email || !msg) {
        return res.status(400).json({
            success: false,
            error: "Name, email, and message are required"
        });
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER,
        subject: `New message from ${name}`,
        text: msg
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.json({
                success: false,
                resp: `Error occurred: ${error.message}`
            });
        }
        return res.json({
            success: true,
            resp: "Thank you for your message. We will respond via email shortly."
        });
    });
});
// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
