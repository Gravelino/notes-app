# 📝 Notes App Frontend

A modern React-based notes application with full CRUD functionality, internationalization, and comprehensive testing.

## ✨ Features

- 📋 **Full CRUD Operations**: Create, read, update, and delete notes
- 🔄 **State Management**: Centralized state management using Redux Toolkit
- 🌐 **Internationalization (i18n)**: Multi-language support (English/Ukrainian)
- 📱 **Responsive Design**: Mobile-first approach with SCSS styling
- 🧪 **End-to-End Testing**: Comprehensive E2E tests with Cypress
- 🚀 **Modern Stack**: React 19, TypeScript, Vite

## 🛠️ Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **State Management**: Redux Toolkit with RTK Query
- **Styling**: SCSS/SASS with CSS Modules
- **Internationalization**: react-i18next
- **Testing**: Cypress for E2E tests
- **UI Components**: Custom components with modern design

## 📋 Prerequisites

- npm package manager
- Backend API running (see backend README for setup)

## 🚀 Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/gravelino/notes-app.git
   cd notes-app/frontend/notes-frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

## 💻 Running the Application

### Development Mode

Start the development server:
```bash
npm run dev
```

The application will be available at http://localhost:5173

### Production Build

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## 🔄 State Management

The application uses Redux Toolkit for state management:

- **notesSlice**: Manages notes state (CRUD operations)
- **RTK Query**: Handles API calls with caching and optimistic updates

## 🌐 Internationalization (i18n)

### Supported Languages

- 🇺🇸 English (en) - Default
- 🇺🇦 Ukrainian (uk)

## 🎨 SCSS Styling

The application uses SCSS for styling with the following approach:

### SCSS Features Used

- **Variables**: Colors, spacing, breakpoints
- **Mixins**: Reusable style patterns
- **Nesting**: Hierarchical styling
- **Functions**: Color manipulation, calculations

## 🧪 Testing

### End-to-End Tests

The application includes comprehensive E2E tests using Cypress.

#### Running E2E Tests

1. Install Cypress (if not already installed):
   ```bash
   npm install --save-dev cypress
   ```

2. Start the application (in development mode):
   ```bash
   npm run dev
   ```

3. Run E2E tests:
   ```bash
   npm run test:e2e:open
   ```

### Test Coverage

The E2E tests cover:

- ✅ **CRUD Operations**: Create, read, update, delete notes
- ✅ **Language Switching**: Verify i18n functionality
- ✅ **Form Validation**: Input validation and error handling
- ✅ **Responsive Design**: Mobile and desktop layouts
- ✅ **Navigation**: Routing between pages
- ✅ **Error Handling**: API error scenarios