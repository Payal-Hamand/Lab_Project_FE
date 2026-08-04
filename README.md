# Checked Up - Where Health Meets Convenience

Checked Up is a full-stack diagnostic lab booking platform that allows patients to book lab tests and health packages, schedule home sample collection, view reports, and manage bookings. It features a multi-role system with Patient, Admin, Lab Owner, and Lab Assistant dashboards, along with real-time status tracking, payment integration, and geolocation-based lab assignment.

## Installation & Setup

To get started with Checked Up locally, follow these steps:

```bash
git clone <repo-url>
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

The backend server starts on `http://localhost:5000`.

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend dev server starts on `http://localhost:5173`.

## Features

### Patient

- 🔬 **Browse Lab Tests & Packages**: Explore a wide range of diagnostic tests and health packages organized by categories, with detailed descriptions and pricing.
- 🔍 **Smart Search**: Quickly search for specific tests or packages from the homepage hero section with a portal-based dropdown showing instant results.
- 📋 **Easy Booking Flow**: Multi-section booking form with test/package selection, patient info, address with interactive map picker, date & time slot selection, and a summary sidebar.
- 🗺️ **Geolocation-Based Lab Assignment**: System automatically assigns the nearest lab owner within 50km using geolib distance calculations.
- 📍 **Interactive Map Picker**: Leaflet map with draggable marker and reverse geocoding via Nominatim to auto-fill address fields.
- 📅 **Reschedule & Cancel**: Patients can reschedule or cancel bookings before completion with a reason.
- 💳 **Payment Integration**: Secure payments via PhonePe UPI gateway with QR code scanning and receipt upload.
- 📄 **Report Viewing**: View and download PDF lab reports directly from the dashboard.
- ⚡ **Real-Time Updates**: Firebase Firestore `onSnapshot` provides live booking status updates without manual refresh.
- 📱 **Responsive Design**: Fully optimized for both mobile and desktop with table/card view toggle.

### Admin

- 📊 **Dashboard Stats**: 6 stat cards with quick action buttons for managing tests, packages, lab owners, and bookings.
- ➕ **Create Tests & Packages**: Full CRUD modals for managing lab tests and health packages with multi-select test inclusion for packages.
- 👥 **Manage Lab Owners**: Create, view, and edit lab owner accounts with map-based location selection.
- 📦 **Booking Management**: View all bookings across the platform with sortable data tables, search, and the ability to reassign bookings to different labs.
- ⚙️ **Payment Settings**: Upload and manage UPI QR codes for payment collection.

### Lab Owner

- 📊 **Dashboard Stats**: 4 stat cards showing total bookings, pending, completed, and reports.
- 👨‍🔬 **Manage Lab Assistants**: Create and view lab assistants with their booking statistics.
- 📋 **Booking Management**: View all lab bookings with search and assistant assignment via dropdown.
- 📄 **Report Upload**: Upload patient reports (PDF/docs) via Cloudinary integration.
- 🔍 **Search Bookings**: Search by patient name, phone, test, package, or assistant name.

### Lab Assistant

- 📊 **Dashboard Stats**: 3 stat cards showing assigned, pending, and completed bookings.
- 🧭 **Navigation**: Open Google Maps directions to patient location directly from the dashboard.
- ✅ **Workflow Actions**: Step-by-step workflow - mark reached, upload sample images, collect payment.
- 📸 **Sample Collection**: Camera/gallery image upload for blood samples with multi-file support (up to 10 images).
- 💰 **Payment Collection**: Display UPI QR code, capture payment receipt, and mark payment as done.
- 🔍 **Search Assignments**: Search assigned bookings by patient name, phone, test, or package.

### Shared Features

- 🔑 **Secure Authentication**: JWT-based authentication with 30-day token expiry, session persistence via sessionStorage, and role-based route protection.
- 🔒 **Forgot Password Flow**: Email-based OTP verification with 5-minute countdown timer and password reset.
- 🎨 **Modern UI**: Shadcn/UI components, Framer Motion animations, custom typography system, and responsive design.
- 📱 **Mobile-First Design**: Hamburger menu with animated sidebar, stacked card layouts, and touch-optimized interactions.
- ♿ **Accessibility**: Skip-to-content links, ARIA labels, focus traps in modals, and ESC key support.
- 🔔 **Toast Notifications**: React Toastify for success/error feedback across all operations.
- 🎭 **Page Transitions**: Framer Motion fade+slide animations between routes.
- 📄 **PDF Report Viewer**: Full-screen modal for viewing lab reports with download option.

## Built With

### Frontend

- [React](https://react.dev/) - A JavaScript library for building user interfaces
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Shadcn/UI](https://ui.shadcn.com/) - Re-usable components built with Radix UI
- [TanStack React Query](https://tanstack.com/query) - Powerful data synchronization for React
- [TanStack React Table](https://tanstack.com/table) - Headless UI for building tables
- [React Router](https://reactrouter.com/) - Declarative routing for React
- [React Hook Form](https://react-hook-form.com/) - Performant, flexible and easy forms
- [Zod](https://zod.dev/) - TypeScript-first schema validation
- [Axios](https://axios-http.com/) - Promise based HTTP client
- [Leaflet](https://leafletjs.com/) - Open-source JavaScript library for interactive maps
- [React Leaflet](https://react-leaflet.js.org/) - React components for Leaflet maps
- [Framer Motion](https://www.framer.com/motion/) - Production-ready animation library
- [Firebase](https://firebase.google.com/) - Real-time database, storage, and analytics
- [Lucide React](https://lucide.dev/) - Beautiful & consistent icons
- [React Toastify](https://fkhadra.github.io/react-toastify/) - Toast notifications

### Backend

- [Node.js](https://nodejs.org/) - JavaScript runtime environment
- [Express.js](https://expressjs.com/) - Fast, unopinionated web framework for Node.js
- [MongoDB](https://www.mongodb.com/) - NoSQL database for flexible data storage
- [Mongoose](https://mongoosejs.com/) - Elegant MongoDB object modeling for Node.js
- [JWT](https://jwt.io/) - JSON Web Token for secure authentication
- [Cloudinary](https://cloudinary.com/) - Cloud-based image and file management
- [PhonePe Gateway](https://www.phonepe.com/) - UPI payment integration
- [Nodemailer](https://nodemailer.com/) - Email sending service via Gmail SMTP
- [Geolib](https://www.npmjs.com/package/geolib) - Library for geospatial data calculations
- [Multer](https://github.com/expressjs/multer) - Middleware for handling multipart form-data
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) - Library for hashing passwords

## API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| **Auth** | | |
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT token |
| **Password Recovery** | | |
| POST | `/api/pass/forgot-password` | Request OTP for password reset |
| POST | `/api/pass/verify-otp` | Verify OTP validity |
| POST | `/api/pass/reset-password` | Reset password with OTP |
| **Tests** | | |
| GET | `/api/tests` | Get all lab tests |
| GET | `/api/tests/:id` | Get a single test |
| POST | `/api/tests` | Create a new test (Admin) |
| **Packages** | | |
| GET | `/api/packages` | Get all health packages |
| POST | `/api/packages` | Create a new package |
| **Bookings** | | |
| POST | `/api/bookings` | Create a new booking (Patient) |
| GET | `/api/bookings/my-bookings` | Get patient's bookings |
| GET | `/api/bookings/all` | Get all bookings (Admin) |
| GET | `/api/bookings/lab-owner` | Get lab owner's bookings |
| GET | `/api/bookings/assigned` | Get assistant's assigned bookings |
| GET | `/api/bookings/assigned/search` | Search assistant bookings |
| GET | `/api/bookings/lab-owner/search` | Search lab owner bookings |
| GET | `/api/bookings/lab-owners` | Get all lab owners (Admin) |
| PUT | `/api/bookings/update-booking-lab/:id` | Reassign booking to different lab |
| PUT | `/api/bookings/assign-assistant` | Assign lab assistant to booking |
| PUT | `/api/bookings/reached/:id` | Mark assistant as reached patient |
| PUT | `/api/bookings/sample/:id` | Upload sample images |
| PUT | `/api/bookings/upload-report/:id` | Upload patient report |
| PUT | `/api/bookings/payment/:id` | Mark payment as done |
| PUT | `/api/bookings/cancel/:id` | Cancel a booking |
| PUT | `/api/bookings/manage/:id` | Cancel or reschedule booking |
| **Admin** | | |
| POST | `/api/admin/create-lab-owner` | Create a lab owner account |
| POST | `/api/admin/create-lab-assistant` | Create a lab assistant account |
| GET | `/api/admin/lab-owners` | Get all lab owners |
| **Users** | | |
| GET | `/api/users/my-assistants` | Get lab owner's assistants |
| **Reports** | | |
| GET | `/api/reports/verify/:id` | Verify report by report ID |
| **Payment** | | |
| POST | `/api/payment/create` | Initiate PhonePe payment |
| GET | `/api/payment/status/:txnId` | Check payment status |
| **Setup** | | |
| GET | `/api/setup/create-admin` | Seed default admin user |

## Environment Variables

### Backend (`.env`)

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/labtests
JWT_SECRET=your_jwt_secret

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# PhonePe Payment
PHONEPE_ENV=UAT
MERCHANT_ID=your_merchant_id
SALT_KEY=your_salt_key
SALT_INDEX=1
BASE_URL=https://api-preprod.phonepe.com/apis/pg-sandbox
BACK_END_URL=http://localhost:5000
FRONT_END_URL=http://localhost:5173

# Email (Nodemailer)
EMAIL=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

### Frontend (`.env`)

```env
VITE_API_URL=http://localhost:5000
```

## Project Structure

```
labProject/
├── backend/
│   ├── config/
│   │   ├── db.js              # MongoDB connection
│   │   └── cloudinary.js      # Cloudinary configuration
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── bookingController.js
│   │   ├── testController.js
│   │   ├── packageController.js
│   │   ├── reportController.js
│   │   ├── adminController.js
│   │   ├── userController.js
│   │   ├── paymentController.js
│   │   └── forgotPassword.js
│   ├── middleware/
│   │   ├── authMiddleware.js   # JWT authentication
│   │   ├── roleMiddleware.js   # Role-based access control
│   │   └── uploadMiddleware.js # Multer + Cloudinary uploads
│   ├── models/
│   │   ├── User.js
│   │   ├── Test.js
│   │   ├── Booking.js
│   │   ├── Package.js
│   │   └── Prescription.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── bookingRoutes.js
│   │   ├── testRoutes.js
│   │   ├── packageRoutes.js
│   │   ├── reportRoutes.js
│   │   ├── adminRoutes.js
│   │   ├── userRoutes.js
│   │   ├── paymentRoutes.js
│   │   ├── forgotePasswordRoute.js
│   │   └── adminSetupRoute.js
│   ├── Utils/
│   │   ├── sendMail.js        # Nodemailer email utility
│   │   └── phonepe.js         # PhonePe checksum utility
│   ├── seeder/
│   │   └── adminSeed.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── ui/            # Button, Input, Modal, DataTable, Badge, etc.
    │   │   ├── Dashboard/     # DashboardStatsCard, BookingsTable, ReportViewerModal, etc.
    │   │   ├── layout/        # PublicLayout, AuthLayout, DashboardLayout, PageTransition
    │   │   ├── Navbar.jsx
    │   │   ├── Hero.jsx
    │   │   ├── Features.jsx
    │   │   ├── PopularTests.jsx
    │   │   ├── Packages.jsx
    │   │   ├── WhyChoose.jsx
    │   │   ├── LocationPicker.jsx
    │   │   └── BookingDateTime.jsx
    │   ├── features/
    │   │   ├── admin/         # Admin dashboard components & columns
    │   │   ├── booking/       # Booking form components & hooks
    │   │   ├── lab-owner/     # Lab owner dashboard components & columns
    │   │   ├── lab-assistant/ # Lab assistant dashboard components & columns
    │   │   └── patient/       # Patient dashboard components & columns
    │   ├── pages/             # Home, Login, Signup, Tests, Packages, Booking, Dashboards, etc.
    │   ├── routes/            # AppRoutes.jsx with lazy loading
    │   ├── services/          # API service modules (auth, test, package, booking, user)
    │   ├── hooks/             # useAuth, useBookings, useTests, usePackages, useFormErrors, etc.
    │   ├── context/           # AuthContext, QueryProvider
    │   ├── constants/         # api.js, roles.js, routes.js, status.js
    │   ├── utils/             # formatPhone, formatCurrency, formatDate, leafletFix, debounce
    │   ├── lib/               # cn() utility (clsx + tailwind-merge)
    │   ├── types/             # TypeScript interfaces
    │   ├── firebase.js        # Firebase initialization
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── public/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    ├── tsconfig.json
    └── vercel.json
```
