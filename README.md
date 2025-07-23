# InSight AI

A modern, full-stack AI-powered job interview practice platform built with Next.js (App Directory), MongoDB, and NextAuth.js.

---

## 🚀 Features

- **User Authentication**: Secure sign up/sign in with email & password using NextAuth.js and MongoDB.
- **Password Security**: Strong password requirements and bcrypt hashing.
- **Responsive Dashboard**: View, retake, and get feedback on interviews. Fully responsive for mobile and desktop.
- **AI Interview Generation**: Generate custom interview questions using Google Gemini AI.
- **Interview Cards**: See all your interviews, their status, and tech stack at a glance.
- **Feedback System**: Get detailed, AI-generated feedback for each interview attempt. Feedback is always up-to-date (overwrites previous for same user/interview).
- **Retake & Feedback Buttons**: If feedback exists, see both "Take Interview" and "Show Feedback" buttons; otherwise, just "Take Interview".
- **Tech Stack Display**: See the technologies for each interview, with icons.
- **Global & Per-Page Loaders**: Fullscreen loader on all route transitions and while server components load.
- **Sticky, Responsive Navbar**: User info and sign out button, burger menu and sidebar for mobile.
- **Modern UI/UX**: Beautiful, accessible, and professional design with custom scrollbars and smooth transitions.
- **Server/Client Component Best Practices**: All database logic is server-only; client components are interactive and fast.

---

## 📁 Folder Structure (Root Overview)

```
insight_ai/
├── app/
│   ├── (auth)/         # Auth pages (sign-in, sign-up)
│   ├── (root)/         # Main app pages (dashboard, interview, feedback)
│   ├── api/            # API routes (NextAuth, VAPI, etc.)
│   └── ...
├── components/         # All React components (UI, forms, cards, nav, etc.)
├── lib/                # Utility functions, MongoDB connection, server actions
├── public/             # Static assets (images, SVGs, covers, etc.)
├── constants/          # App-wide constants and schemas
├── README.md           # This file
├── package.json        # Project dependencies
└── ...
```

---

## 🛠️ Setup & Development

1. **Clone the repo:**
   ```bash
   git clone <repo-url>
   cd insight_ai
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure environment variables:**
   - Create a `.env.local` file with:
     ```
     MONGODB_URI=your-mongodb-uri
     NEXTAUTH_SECRET=your-random-secret
     ```
4. **Run the development server:**
   ```bash
   npm run dev
   ```
5. **Open in browser:**
   - Visit [http://localhost:3000](http://localhost:3000)

---

## ⚙️ Main Functionalities

- **Authentication:**
  - Email/password sign up and sign in (NextAuth.js, MongoDB)
  - Session management, protected routes, and redirects
- **Interview Generation:**
  - AI-generated questions based on role, level, tech stack, and type
  - Each interview is saved in MongoDB with all details
- **Dashboard:**
  - See all your interviews (with status, tech stack, and date)
  - Retake interviews or view feedback if available
- **Feedback:**
  - AI-generated, structured feedback for each interview
  - Only one feedback per user/interview (overwritten on retake)
- **UI/UX:**
  - Sticky navbar, mobile sidebar, custom scrollbars, loaders
  - Responsive cards, beautiful forms, and accessible design

---

## 🧩 Tech Stack
- **Next.js (App Directory)**
- **MongoDB (with official Node.js driver)**
- **NextAuth.js**
- **Google Gemini AI (for question/feedback generation)**
- **Tailwind CSS (utility classes)**
- **TypeScript**

---

## 📚 Notes
- All database logic is server-only (`'use server'`), never in client components.
- All interactive UI is in client components (`'use client'`).
- Feedback is always up-to-date: retaking an interview overwrites previous feedback for that user/interview.
- For any new features, follow the server/client separation and use the provided utility patterns.

---

## 🤝 Contributing
Pull requests and suggestions are welcome! Please open an issue or PR for any improvements or bug fixes.

---

## 📄 License
MIT
