# GeekCodes Backend

GeekCodes is an AI-powered mock interview platform tailored for developers. It offers job listings and interactive coding assessments with instant feedback to help users prepare for tech interviews.

## 🚀 Features

- 📄 Job Listings with associated coding questions
- 💻 Code Execution using Judge0 API
- 🤖 AI Feedback (planned integration with open LLMs)
- 🔐 JWT-based Authentication
- 📦 REST API with versioning (`/api/v1/`)

## 🧱 Tech Stack

- **Node.js** + **Express**
- **MongoDB** with **Mongoose**
- **TypeScript**
- **Judge0 API** (for code execution)
- **OpenAI / HuggingFace API** (for AI code review - under progress)
- **Dotenv**, **Cors**, **Axios**, **Bcrypt**, **jsonwebtoken**


---

## 🔧 Setup Instructions

1. **Clone the repo**

```bash
git clone https://github.com/your-username/geekcodes-backend.git
cd geekcodes-backend
npm install
touch .env
npm run dev
```
2. Environment Variables
```env
PORT=5000
MONGO_URI=
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRY=
REFRESH_TOKEN_EXPIRY=
OPENAI_API_KEY=
JUDGE0_API_URL=
JUDGE0_API_KEY=
JUDGE0_API_HOST=
```
