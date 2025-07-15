# UltraAI: Ai chatbot and image generater

### shor description 🗒

A website that use Gemini api in ai chatbot and use pollinations to generate images it made with react.js + vite in front-end  and Node.js  + express.js in back-end.

### How to start ✔️

## 0️⃣
create mysql database and copy your 

```
- DB_HOST
- DB_USER
- DB_PASSWORD
- DB_NAME
```
to */backend/.env* file.
```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    is_pro BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Then go to [Gemini api](https://gemini.google.com/
"Gemini api") and after authentication generate an api key then copy it to */frontend/.env*

```
VITE_API_URL=http://localhost:7000
VITE_GEMINI_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=
VITE_API_KEY= 👋👋👋_here_you_put_the_api_key
```

## 1️⃣
```bash
cd path/to/this/project/folder
```
## 2️⃣
```bash
cd backend
npm install
node server.js
```
## 3️⃣
```bash
cd ..
```
## 4️⃣
```bash
cd frontend
npm install
npm run dev
```
## 5️⃣
enjoy it 😚