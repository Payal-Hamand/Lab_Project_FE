# Checked Up

A modern diagnostic lab booking platform built with React 19, Vite 7, and Tailwind CSS 4.

## Features

- **Multi-role system**: Patient, Admin, Lab Owner, Lab Assistant dashboards
- **Lab test booking** with home sample collection
- **Health packages** with bundled tests
- **Real-time booking management** with status tracking
- **Payment integration** via Razorpay
- **Report management** with PDF upload/download
- **Geolocation** for patient address and lab location selection
- **Responsive design** for mobile and desktop

## Tech Stack

- **Frontend**: React 19, Vite 7, Tailwind CSS 4
- **State**: React Context, TanStack Query
- **Forms**: React Hook Form + Zod validation
- **Routing**: React Router DOM 7
- **HTTP**: Axios with interceptors
- **Icons**: Lucide React
- **Maps**: React Leaflet + OpenStreetMap
- **Payments**: Razorpay

## Installation

```bash
git clone <repo-url>
cd lab-project-fe
npm install
cp .env.example .env
npm run dev
```

## Environment Variables

```env
VITE_API_URL=https://lab-project-be.vercel.app
```

## Folder Structure

```
src/
├── components/         # Shared UI components
│   ├── ui/            # Button, Input, Modal, DataTable, etc.
│   ├── Dashboard/     # Dashboard-specific components
│   ├── layout/        # PublicLayout, AuthLayout, DashboardLayout
│   └── *.jsx          # Shared components (Hero, Navbar, etc.)
├── features/          # Feature-based modules
│   ├── admin/         # Admin dashboard components
│   ├── booking/       # Booking form & hook
│   ├── lab-owner/     # Lab owner dashboard components
│   ├── lab-assistant/ # Lab assistant dashboard components
│   └── patient/       # Patient dashboard components
├── services/          # API service modules
├── hooks/             # Custom React hooks
├── context/           # React context providers
├── constants/         # App constants (routes, roles, status)
├── pages/             # Page components
└── routes/            # Route configuration
```

## Scripts

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run lint         # Run ESLint
```

## Backend

The API server lives in a separate repository.

## License

MIT
