MSCU Website

A full-stack web platform for the Medical School Christian Union (MSCU) — designed to foster fellowship, spiritual growth, and information sharing among medical students.

 Overview

The MSCU Website is a modern web application built using the MERN stack (MongoDB, Express.js, React + Vite, Node.js).
It provides a trusted digital space for members to:

Connect and grow spiritually

Access ministry updates and announcements

Share testimonies and devotionals

Engage in Bible study resources

Stay informed about upcoming events and service opportunities

⚙️ Technology Stack
Layer	Technology
Frontend	React.js, Vite, Tailwind CSS
Backend	Node.js, Express.js
Database	MongoDB (via Mongoose)
Hosting	Netlify (Frontend), Render (Backend)
Version Control	Git & GitHub
🧩 Project Structure
MSCU/
├── Frontend/          # React + Vite application (UI)
│   ├── src/
│   ├── public/
│   └── package.json
│
├── Backend/           # Node.js + Express API
│   ├── src/
│   ├── models/
│   ├── routes/
│   └── package.json
│
├── .gitignore
└── README.md

🚀 Getting Started
1️⃣ Clone the repository
git clone https://github.com/Kids741/MSCU-Website.git
cd MSCU-Website

2️⃣ Set up the Frontend
cd Frontend
pnpm install
pnpm run dev


➡️ App runs on: http://localhost:3000

3️⃣ Set up the Backend
cd ../Backend
pnpm install
pnpm run dev


➡️ API runs on: http://localhost:5000

🔐 Environment Variables

Create a .env file inside Backend/:

PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key


For Frontend/ (if needed):

VITE_API_URL=http://localhost:5000

✨ Features (Current & Planned)

📰 News & announcements

📅 Events calendar

📖 Bible study materials

💬 Member testimonials & devotionals

🙏 Prayer requests submission

👥 Leadership & ministry team info

🔐 Admin dashboard for content management

🤝 Contributing

We welcome contributions from MSCU members!

Create a feature branch

git checkout -b feature/<your-feature-name>


Commit changes

git commit -m "Add <your-feature-name>"


Push and open a Pull Request

🔄 Branch Workflow
Branch	Purpose
main	Production-ready code
dev	Active development
feature/*	Individual feature or fix
👩‍💻 Team & Contributors
Frontend Developers
Name	GitHub
Add Your Name	@username
Backend Developers
Name	GitHub
Dennis Kidake	@Kids741

Joshua Wambisi	@username
🌐 Deployment Links
Service	URL
Frontend (Netlify)	Coming soon
Backend (Render)	Coming soon
Database (MongoDB Atlas)	Configured privately
📜 License

This project is created and maintained by the MSCU ICT docket for ministry and educational purposes.
© 2025 Medical School Christian Union (MSCU) – All rights reserved.

“Transforming lives through Christ within the medical fraternity.”
