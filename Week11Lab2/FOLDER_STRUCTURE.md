# Project Folder Structure Guide

## Overview
This document explains the organization of the Trekking Microservice Application to help you quickly find and understand the code.

## Backend Structure (Node.js/Express)

```
Week11Lab2/node/microservices/
├── routes/
│   └── index.js              # All API endpoints (condensed with helper functions)
├── sampleData.js             # Database seeding script
└── app.js                    # Express server entry point
```

**Backend Files:**
- `routes/index.js` - Contains all CRUD operations for mountains, users, trails, maps, camping, gear, and reviews
- `sampleData.js` - Run this to populate database with Irish-themed sample data
- `app.js` - Main server file that starts on port 8000

## Frontend Structure (Next.js)

### Core Pages
```
pages/
├── index.js                  # Home page with mountain background
├── login.js                  # User login page
├── register.js               # User registration
├── trek-microservice.js      # Mountains listing page
├── trek-admin.js             # Admin dashboard (CRUD for all resources)
└── list-users.js             # User management (admin only)
```

### Feature-Specific Pages

**Mountains:**
```
pages/
├── create-mountain.js        # Add new mountain
├── edit-mountain/[Id].js     # Edit existing mountain
└── mountain-reviews/[id].js  # View/add reviews for a mountain
```

**Camping:**
```
pages/
├── camping.js                # List all camping sites
├── create-camping.js         # Add new camping site
└── edit-camping/[id].js      # Edit camping site
```

**Gear:**
```
pages/
├── gear.js                   # List all gear items
├── create-gear.js            # Add new gear
└── edit-gear/[id].js         # Edit gear item
```

**Maps:**
```
pages/
├── maps.js                   # List all trail maps
├── create-map.js             # Add new map
└── edit-map/[id].js          # Edit map
```

**Trails:**
```
pages/
├── trails.js                 # List all trails
```

**Users:**
```
pages/
├── create-user.js            # Add new user
└── edit-user/[id].js         # Edit user
```

### API Routes (Next.js API Handlers)
```
pages/api/
├── camping/
│   └── get-camping.js        # Fetch camping sites
├── gear/
│   └── get-gear.js           # Fetch gear items
├── maps/
│   └── get-maps.js           # Fetch trail maps
├── reviews/
│   ├── get-reviews.js        # Fetch reviews
│   ├── create-review.js      # Add review
│   └── delete-review.js      # Delete review (admin)
├── trails/
│   └── get-trails.js         # Fetch trails
├── create-mountain.js        # Create mountain API
├── delete-mountain.js        # Delete mountain API
├── get-mountain.js           # Get single mountain
├── get-mountains.js          # Get all mountains
├── search-mountain.js        # Search mountains
├── update-mountain.js        # Update mountain
├── create-user.js            # Create user API
├── delete-user.js            # Delete user API
├── get-user.js               # Get single user
├── get-users.js              # Get all users
├── update-user.js            # Update user
└── login.js                  # Login authentication
```

### Components
```
components/
└── layout/
    ├── Header.js             # Navigation header with scroll effect
    └── Header.module.css     # Header styles
```

### Utilities
```
utils/
└── auth.js                   # Authentication helpers (checkAuth, isAdmin)
```

### Services
```
services/
├── TrekAdminService.js       # Mountain CRUD operations
└── UserService.js            # User CRUD operations
```

### Styles
```
styles/
├── globals.css               # Global styles
├── Home.module.css           # Home page styles (mountain background)
├── trek-admin.module.css     # Admin dashboard styles
└── trek-microservice.module.css  # Mountains page styles
```

## Quick Reference: Where to Find Things

### Authentication & Authorization
- **Login page**: `pages/login.js`
- **Auth utilities**: `utils/auth.js`
- **Admin check**: Used in `trek-admin.js`, `list-users.js`, `mountain-reviews/[id].js`

### CRUD Operations
- **Backend routes**: `node/microservices/routes/index.js` (all in one file with helper functions)
- **Frontend services**: `services/TrekAdminService.js` and `services/UserService.js`
- **API handlers**: `pages/api/` (organized by resource type)

### UI Components
- **Navigation**: `components/layout/Header.js`
- **Popups/Notifications**: Inline in `mountain-reviews/[id].js`, `login.js`, `Header.js`
- **Admin dashboard**: `pages/trek-admin.js` (tabs for mountains, camping, gear, maps)

### Database
- **Schemas**: Defined in `node/microservices/routes/index.js`
- **Sample data**: `node/microservices/sampleData.js`
- **Collections**: users, mountains, trails, maps, camping, gear, reviews

## File Naming Conventions

- **Pages**: kebab-case (e.g., `trek-admin.js`, `create-mountain.js`)
- **Components**: PascalCase (e.g., `Header.js`)
- **Styles**: module.css (e.g., `Header.module.css`)
- **Dynamic routes**: `[id].js` or `[Id].js` in brackets

## Common Tasks

### Adding a New Feature
1. Create page in `pages/` directory
2. Add API handler in `pages/api/` if needed
3. Add backend route in `node/microservices/routes/index.js`
4. Update navigation in `components/layout/Header.js`

### Modifying Styles
- **Global styles**: `styles/globals.css`
- **Component styles**: Create/edit `.module.css` file
- **Inline styles**: Used for popups and dynamic elements

### Database Changes
1. Update schema in `node/microservices/routes/index.js`
2. Update sample data in `node/microservices/sampleData.js`
3. Run `node sampleData.js` to reset database

## Notes

- **Next.js routing**: File-based routing means file location = URL path
- **API routes**: Files in `pages/api/` become API endpoints
- **Dynamic routes**: `[id].js` creates routes like `/edit-mountain/123`
- **Module CSS**: Scoped styles that don't conflict globally
- **Helper functions**: Backend uses `createCRUDRoutes()` to reduce code duplication
