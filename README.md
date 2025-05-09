# 🗳️ Online Election Platform

An advanced and secure online voting system built using the MERN Stack (MongoDB, Express.js, React.js, Node.js) and styled with Material UI. This platform integrates facial recognition using FaceNet and Aadhaar verification using OCR (pytesseract) to ensure the identity of voters.

---

## 🚀 Features

- 🔐 **Face Recognition** using FaceNet to verify voters' identities.
- 🪪 **Aadhaar Card Verification** using Tesseract OCR to extract and validate voter details.
- 🗳️ **Secure Voting System** with admin control and real-time result tracking.
- ⚡ **Modern UI/UX** built with React.js and Material UI.
- ⚙️ **Fast Development** enabled by Vite.

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- Material UI (MUI)

### Backend
- Node.js
- Express.js
- MongoDB

### Machine Learning & Image Processing
- FaceNet (`keras-facenet`) for face comparison
- Tesseract OCR (`pytesseract`) for Aadhaar text extraction
- PIL & NumPy for image handling

---

## 🧠 How It Works

1. **User uploads two images** (one from Aadhaar and one live photo).
2. **FaceNet** generates embeddings and compares the similarity.
3. **Tesseract OCR** extracts Aadhaar number, name, and DOB from the card.
4. If both steps are successful, the user is authenticated and allowed to vote.

---

## 📁 Project Structure

online-election-platform/
├── backend/
│ ├── routes/
│ ├── controllers/
│ ├── models/
│ └── server.js
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ └── App.jsx
├── scripts/
│ ├── face_compare.py
│ └── aadhaar_ocr.py

🧪 Setup Instructions
1. Clone the Repository
git clone (https://github.com/SureshMunavath/VoteEase)
cd voteEase

2. Backend Setup

cd backend
npm install
nodemon index.js

3. Frontend Setup

cd frontend
npm install
npm run dev

4. Python Dependencies

pip install keras-facenet numpy pillow pytesseract
    
    
👨‍💻 Author

Suresh Munavath
B.Tech in Computer Science & Engineering
Rajiv Gandhi University of Knowledge Technologies, Basar
