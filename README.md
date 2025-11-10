MSCCU Website
A full-stack web platform for the Medical School Christian Union (MSCU), designed to foster fellowship, spiritual growth, and information sharing among medical students.

Overview
The MSCU Website is a modern web application built using the MERN stack (MongoDB, Express.js, React + Vite, Node.js). It provides a trusted space for members to connect, access updates, share testimonies, study Bible materials, and stay informed about upcoming events and service opportunities.

Technology Stack
Layer	Technology
Frontend	React.js, Vite, Tailwind CSS
Backend	Node.js, Express.js
Database	MongoDB (via Mongoose)
Hosting	Frontend on Netlify, Backend on Render
Version Control	Git, GitHub
Project Structure
text
MSCCU-Website/
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
Getting Started
1. Clone the repository
bash
git clone https://github.com/Kids741/MSCU.git
cd MSCCU-Website
2. Set up the frontend
bash
cd Frontend
pnpm install
pnpm run dev
The frontend will be accessible at http://localhost:3000.

3. Set up the backend
bash
cd ../Backend
pnpm install
pnpm run dev
The backend API will run on http://localhost:5000.

Environment Variables
Create a .env file in the Backend/ directory with the following content:

text
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
If the frontend requires environment variables, create a .env file in the Frontend/ directory with:

text
VITE_API_URL=http://localhost:5000
Features (Current & Planned)
📰 News and announcements

📅 Events calendar

📖 Bible study materials

💬 Member testimonials and devotionals

🙏 Prayer requests submission

👥 Leadership and ministry team information

🔐 Admin dashboard for content management

Contributing
We welcome contributions from MSCCU members.

To contribute:

Create a new feature branch:

bash
git checkout -b feature/<your-feature-name>
Commit your changes:

bash
git commit -m "Add <your-feature-name>"
Push your branch and open a Pull Request.

Development Workflow
Branch	Purpose
main	Production-ready code
dev	Active development
feature/*	Individual feature or fix
Team & Contributors
Medical School Christian Union (MSCCU)
“Transforming lives through Christ within the medical fraternity.”

Frontend Developers
Name	GitHub
Add Your Name	@username
Backend Developers
Name	GitHub
Dennis Kidake	@Kids741
Joshua Wambisi	@username
Deployment Links
Service	URL
Frontend (Netlify)	Coming soon
Backend (Render)	Coming soon
Database (MongoDB Atlas)	Configured privately
License
This project is created and maintained by MSCCU ICT docket for ministry and educational purposes.
© 2025 Medical School Christian Union (MSCCU) – All rights reserved.