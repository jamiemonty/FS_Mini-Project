# Trekking Microservice Application

A full-stack web application for managing mountain trekking expeditions, built with Next.js frontend and Node.js/Express backend microservices architecture.

## Project Overview

This application provides a comprehensive platform for trekking enthusiasts to explore mountains, view trails, book camping sites, browse gear recommendations, and read/write reviews. The system includes role-based access control with separate admin and user functionalities.

## Technology Stack

**Frontend:**
- Next.js (React framework)
- CSS Modules for styling
- Client-side routing

**Backend:**
- Node.js with Express
- MongoDB for data persistence
- Mongoose ODM
- RESTful API architecture

## Architecture

The application follows a microservices pattern with:
- **Frontend Server**: Next.js running on `localhost:3000`
- **Backend Server**: Express API running on `localhost:8000`
- **Database**: MongoDB running on `localhost:27017`

## Key Features

### User Features
- Browse mountains with detailed information (elevation, difficulty, best season)
- View mountain trails with difficulty ratings and distances
- Explore camping sites with pricing in Euro (€)
- Access gear recommendations with prices
- Submit and view mountain reviews with star ratings
- User authentication (login/register)

### Admin Features
- Full CRUD operations for mountains, camping sites, gear, and trail maps
- Delete user reviews
- User management
- Access restricted pages with styled access-denied notifications

### UI/UX Enhancements
- Responsive navigation header with scroll-based shrinking effect
- Mountain landscape background on home page
- Custom styled notification popups (replacing browser alerts)
- Confirmation modals for delete operations
- Color-coded buttons (green for login, red for logout)
- Admin-only navigation items (conditionally rendered)

## Project Structure

```
FS_Mini-Project/
├── Week11Lab2/
│   ├── next/fullStackWeek11lab2/          # Frontend
│   │   ├── pages/                          # Next.js pages
│   │   │   ├── api/                        # API route handlers
│   │   │   │   ├── camping/
│   │   │   │   ├── gear/
│   │   │   │   ├── maps/
│   │   │   │   ├── reviews/
│   │   │   │   └── trails/
│   │   │   ├── mountain-reviews/[id].js    # Dynamic review page
│   │   │   ├── trek-admin.js               # Admin dashboard
│   │   │   ├── trek-microservice.js        # Mountains listing
│   │   │   ├── login.js
│   │   │   └── index.js                    # Home page
│   │   ├── components/                     # React components
│   │   │   └── layout/
│   │   │       └── Header.js               # Navigation header
│   │   ├── styles/                         # CSS modules
│   │   ├── services/                       # API service functions
│   │   └── utils/                          # Helper functions (auth)
│   └── node/microservices/                 # Backend
│       ├── routes/index.js                 # API endpoints
│       ├── sampleData.js                   # Database seeding script
│       └── app.js                          # Express server
```

## Database Schema

The application uses MongoDB with the following collections:

- **mountains**: Mountain details (name, location, difficulty, elevation, rating)
- **trails**: Hiking trail information
- **maps**: Trail map coordinates and URLs
- **camping**: Camping site details with pricing
- **gear**: Equipment recommendations
- **users**: User accounts with role-based access (admin/user)
- **reviews**: Mountain reviews with ratings and comments

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB installed and running

### Backend Setup
1. Navigate to microservices directory:
   ```bash
   cd Week11Lab2/node/microservices
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Seed the database with sample data:
   ```bash
   node sampleData.js
   ```

4. Start the backend server:
   ```bash
   node app.js
   ```
   Server runs on `http://localhost:8000`

### Frontend Setup
1. Navigate to Next.js directory:
   ```bash
   cd Week11Lab2/next/fullStackWeek11lab2
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   Application runs on `http://localhost:3000`

## User Credentials

**Admin Account:**
- Email: `admin@trek.com`
- Password: `admin123`

**Regular User:**
- Email: `sean@example.com`
- Password: `user123`

## API Endpoints

The backend exposes RESTful endpoints for:
- Mountains: `/getMountains`, `/createMountain`, `/updateMountain`, `/deleteMountain`
- Reviews: `/getReviews`, `/createReview`, `/deleteReview`
- Camping: `/getCampingSites`, `/createCampingSite`, `/updateCampingSite`, `/deleteCampingSite`
- Gear: `/getGear`, `/createGear`, `/updateGear`, `/deleteGear`
- Maps: `/getMaps`, `/createMap`, `/updateMap`, `/deleteMap`
- Users: `/getUsers`, `/createUser`, `/updateUser`, `/deleteUser`

## Implementation Highlights

### Authentication & Authorization
- LocalStorage-based session management
- Role-based access control using `isAdmin()` utility
- Protected routes with redirect to login
- Conditional rendering of admin features

### State Management
- React hooks (useState, useEffect, useRef)
- Event-driven updates for navigation state
- Custom event dispatching for login state changes

### Error Handling
- Try-catch blocks for async operations
- Custom notification system for user feedback
- Graceful fallbacks for failed API calls

### Responsive Design
- CSS modules for component-scoped styling
- Scroll-based header animations
- Mobile-friendly layouts
- Fixed background attachment for parallax effect

## Sample Data

The application includes Irish-themed sample data:
- User locations: Dublin, Galway
- Irish names for review authors
- Pricing in Euro (€)
- 6 mountains with detailed descriptions
- 9 pre-populated reviews
- 4 camping sites, 6 gear items, 4 trails, 3 maps

## Future Enhancements

- Payment integration for bookings
- Real-time availability checking
- User profile pages
- Image upload functionality
- Advanced search and filtering
- Email notifications
- Social sharing features

## Notes

This project demonstrates full-stack development skills including:
- RESTful API design
- Database modeling and relationships
- Authentication and authorization
- CRUD operations
- Modern React patterns
- Responsive UI/UX design
- Error handling and validation
