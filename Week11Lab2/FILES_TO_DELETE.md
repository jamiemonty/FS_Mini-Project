# Files and Folders to Delete

## Unused Features - Safe to Delete

### 1. Meetings Feature (Not Used)
```
pages/api/meetings/
  - get-meetings.js
  - new-meetup.js
pages/new-meetup/
  - index.js
components/meetings/
  - MeetingsItem.js
  - MeetingsItem.module.css
  - MeetingsList.js
  - MeetingsList.module.css
```

### 2. Books Feature (Template Leftover)
```
components/books/
  - BookDetail.js
  - BookDetail.module.css
  - BookItem.js
  - BookItem.module.css
  - BookList.js
  - BookList.module.css
  - NewBookForm.js
  - NewBookForm.module.css
```

### 3. Unused Generic Components
```
components/generic/
  - Button.js
  - Button.module.css
  - HamMenu.js
  - HamMenu.module.css
  - HamMenuFAB.js
  - HamMenuFAB.module.css
```

### 4. Unused Layout Components
```
components/layout/
  - Footer.js
  - Footer.module.css
  - HamMenuContent.js
  - HamMenuContent.module.css
  - MainNavigation.js
  - MainNavigation.module.css
  - Layout.js
  - Layout.module.css
```
**Keep:** Header.js and Header.module.css (actively used)

### 5. Store/Context (Not Used)
```
pages/store/
  - globalContext.js
```

### 6. Register Page (Not Implemented)
```
pages/
  - register.js
```

## How to Delete

### Option 1: Manual Deletion
Navigate to each folder/file and delete them through your file explorer or IDE.

### Option 2: Command Line (Windows)
```cmd
cd c:\Users\G00419525@atu.ie\FS_Mini-Project\Week11Lab2\next\fullStackWeek11lab2

rmdir /s /q pages\api\meetings
rmdir /s /q pages\new-meetup
rmdir /s /q pages\store
rmdir /s /q components\meetings
rmdir /s /q components\books
rmdir /s /q components\generic
del pages\register.js
del components\layout\Footer.js
del components\layout\Footer.module.css
del components\layout\HamMenuContent.js
del components\layout\HamMenuContent.module.css
del components\layout\MainNavigation.js
del components\layout\MainNavigation.module.css
del components\layout\Layout.js
del components\layout\Layout.module.css
```

## Files Currently Being Used (DO NOT DELETE)

### Pages
- index.js (home page)
- login.js (authentication)
- trek-microservice.js (mountains listing)
- trek-admin.js (admin dashboard)
- list-users.js (user management)
- camping.js, gear.js, maps.js, trails.js (resource listings)
- create-*.js files (all create pages)
- edit-*/[id].js (all edit pages)
- mountain-reviews/[id].js (reviews page)

### API Routes
- All mountain, user, camping, gear, maps, trails, reviews endpoints

### Components
- camping/, gear/, maps/, trails/ (list and item components)
- mountains/ (form component)
- users/ (form component)
- ui/ (Card component)
- layout/Header.js (navigation)

### Services
- TrekAdminService.js
- UserService.js

### Utils
- auth.js

## Impact of Deletion

**Before deletion:**
- ~80+ component files
- Multiple unused features

**After deletion:**
- ~50 component files
- Only active features remain
- Cleaner codebase
- Easier to navigate and explain

## Verification After Deletion

1. Start backend: `cd node/microservices && node app.js`
2. Start frontend: `cd next/fullStackWeek11lab2 && npm run dev`
3. Test all features:
   - Login
   - View mountains
   - Admin dashboard
   - CRUD operations
   - Reviews

All functionality should work exactly the same!
