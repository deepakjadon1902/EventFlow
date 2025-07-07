# 🌟 EventFlow - Premium Event Management Platform

<div align="center">
  <img src="https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.5.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
</div>

<div align="center">
  <h3>🚀 <a href="https://willowy-kringle-c9dfde.netlify.app">Live Demo</a> | 📖 <a href="#documentation">Documentation</a> | 🎯 <a href="#features">Features</a></h3>
</div>

---

## ✨ Overview

**EventFlow** is a premium, full-stack event management platform that redefines how users discover, book, and manage events. Built with modern web technologies and designed with High-level aesthetics, EventFlow delivers a royal-grade user experience that sets new industry standards.

### 🎯 Key Highlights

- **🏆 Premium Design**: Apple-inspired UI/UX with glassmorphism effects and micro-interactions
- **⚡ Lightning Fast**: Built with Vite and optimized for performance
- **🔒 Enterprise Security**: Bank-level security with Supabase authentication and RLS
- **📱 Fully Responsive**: Seamless experience across all devices
- **🎨 Dynamic Theming**: Adaptive color schemes based on event categories
- **🌐 Real-time Updates**: Live notifications and data synchronization

---

## 🚀 Features

### 🎪 Event Management
- **Event Discovery**: Browse curated premium events with advanced filtering
- **Smart Booking**: One-click booking with real-time availability
- **Category-based Theming**: Dynamic UI adaptation based on event types
- **Event Analytics**: Comprehensive insights for event organizers

### 👤 User Experience
- **Personalized Dashboard**: Tailored experience with booking history and recommendations
- **Profile Management**: Complete user profile with preferences and settings
- **Notification System**: Real-time updates on bookings and events
- **Feedback System**: Integrated rating and review system

### 🛡️ Security & Authentication
- **Secure Authentication**: Email/password with optional 2FA
- **Role-based Access**: User and admin roles with granular permissions
- **Data Protection**: GDPR compliant with comprehensive privacy controls
- **Row Level Security**: Database-level security with Supabase RLS

### 📊 Admin Panel
- **Event Management**: Create, edit, and manage events
- **User Analytics**: Comprehensive user engagement metrics
- **Booking Management**: Track and manage all bookings
- **Content Management**: Manage feedback, contacts, and notifications

---

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1** - Modern React with hooks and concurrent features
- **TypeScript 5.5.3** - Type-safe development
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **Framer Motion 10.16.16** - Production-ready motion library
- **Lucide React** - Beautiful, customizable icons

### Backend & Database
- **Supabase** - Backend-as-a-Service with PostgreSQL
- **Row Level Security** - Database-level security policies
- **Real-time Subscriptions** - Live data updates
- **Edge Functions** - Serverless functions for custom logic

### Development & Deployment
- **Vite 5.4.2** - Next-generation frontend tooling
- **ESLint** - Code quality and consistency
- **Netlify** - Continuous deployment and hosting
- **Git** - Version control with semantic commits

---

## 🏗️ Architecture

```
EventFlow/
├── 📁 src/
│   ├── 📁 components/          # Reusable UI components
│   │   ├── BubbleAnimation.tsx # Dynamic background effects
│   │   ├── EventCard.tsx       # Event display component
│   │   ├── GlassCard.tsx       # Glassmorphism container
│   │   └── Navbar.tsx          # Navigation component
│   ├── 📁 contexts/            # React contexts
│   │   ├── AuthContext.tsx     # Authentication state
│   │   └── ThemeContext.tsx    # Theme management
│   ├── 📁 pages/               # Application pages
│   │   ├── Home.tsx            # Landing page
│   │   ├── Events.tsx          # Event listing
│   │   ├── Dashboard.tsx       # User dashboard
│   │   ├── Admin.tsx           # Admin panel
│   │   └── ...                 # Other pages
│   ├── 📁 lib/                 # Utilities and configurations
│   │   └── supabase.ts         # Supabase client setup
│   └── 📁 types/               # TypeScript type definitions
├── 📁 supabase/
│   └── 📁 migrations/          # Database migrations
├── 📄 tailwind.config.js       # Tailwind configuration
├── 📄 vite.config.ts           # Vite configuration
└── 📄 package.json             # Dependencies and scripts
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ 
- **npm** or **yarn**
- **Supabase** account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/deepakjadon1902/EventFlow.git
   cd eventflow
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Configure your environment variables:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Database Setup**
   ```bash
   # Run Supabase migrations
   npx supabase db push
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

6. **Open in Browser**
   ```
   http://localhost:5173
   ```

---

## 📊 Database Schema

### Core Tables
- **`profiles`** - User profiles and authentication data
- **`events`** - Event information and metadata
- **`bookings`** - Event bookings and reservations
- **`notifications`** - User notifications system
- **`feedback`** - User feedback and ratings
- **`contact_messages`** - Contact form submissions

### Security Features
- **Row Level Security (RLS)** on all tables
- **Role-based access control** (User/Admin)
- **Automated profile creation** on user registration
- **Real-time data synchronization**

---

## 🎨 Design System

### Color Palette
```css
/* Primary Colors */
--royal-navy: #0d1b2a
--royal-blue: #1e3a8a
--royal-light: #3b82f6

/* Theme Colors */
--technology: #06b6d4 (cyan)
--business: #10b981 (emerald)
--art: #ec4899 (pink)
--music: #a855f7 (purple)
--dining: #f59e0b (amber)
```

### Typography
- **Primary Font**: Inter (Google Fonts)
- **Premium Font**: SF Pro Display fallback
- **Font Weights**: 300, 400, 500, 600, 700, 800, 900

### Components
- **Glassmorphism Effects**: Backdrop blur with transparency
- **Micro-interactions**: Hover states and animations
- **Responsive Design**: Mobile-first approach
- **Dark Mode Support**: System preference detection

---

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking

# Database
npm run db:reset     # Reset database
npm run db:seed      # Seed with sample data
```

### Code Style
- **ESLint** configuration for React and TypeScript
- **Prettier** for code formatting
- **Conventional Commits** for commit messages
- **Component-based architecture** with clear separation of concerns

---

## 🚀 Deployment

### Netlify (Recommended)
1. Connect your GitHub repository to Netlify
2. Configure build settings:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
3. Add environment variables in Netlify dashboard
4. Deploy automatically on push to main branch

### Manual Deployment
```bash
# Build the project
npm run build

# Deploy the dist folder to your hosting provider
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines
- Follow the existing code style and patterns
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure responsive design compatibility

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Deepak Jadon**
- 📧 Email: [deepakjadon1907@gmail.com](mailto:deepakjadon1907@gmail.com)
- 📱 Phone: +91 9149370081
- 🏫 Institution: GLA University, Mathura, India
- 💼 LinkedIn: [Connect with me](https://www.linkedin.com/in/deepak-jadon-612487272)
- 🐙 GitHub: [Follow me](https://github.com/deepakjadon1902)

---

## 🙏 Acknowledgments

- **Supabase** for the amazing backend infrastructure
- **Tailwind CSS** for the utility-first CSS framework
- **Framer Motion** for smooth animations
- **Lucide** for beautiful icons
- **Pexels** for high-quality stock images
- **Netlify** for seamless deployment

---

## 📈 Project Stats

<div align="center">
  <img src="https://img.shields.io/github/stars/yourusername/eventflow?style=social" alt="GitHub stars" />
  <img src="https://img.shields.io/github/forks/yourusername/eventflow?style=social" alt="GitHub forks" />
  <img src="https://img.shields.io/github/watchers/yourusername/eventflow?style=social" alt="GitHub watchers" />
</div>

<div align="center">
  <img src="https://img.shields.io/github/issues/yourusername/eventflow" alt="GitHub issues" />
  <img src="https://img.shields.io/github/issues-pr/yourusername/eventflow" alt="GitHub pull requests" />
  <img src="https://img.shields.io/github/last-commit/yourusername/eventflow" alt="GitHub last commit" />
</div>

---

<div align="center">
  <h3>🌟 If you found this project helpful, please give it a star! 🌟</h3>
  <p>Made with ❤️ by <a href="https://github.com/deepakjadon1902">Deepak Jadon</a></p>
</div>
