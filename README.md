# Pet Store Application
A modern React-based pet store application that allows users to browse, search, and manage pets. Built with TypeScript, React Router, and Tailwind CSS.

## 🚀 Features
- Authentication System : Secure login functionality
- Pet Management : View and manage pets with their details
- Search & Filter : Advanced search capabilities with status filtering
- Responsive Design : Mobile-friendly interface with Tailwind CSS
- Protected Routes : Secure route management for authenticated users
## 🛠️ Technology Stack
- Frontend Framework : React with TypeScript
- Routing : React Router v6
- Styling : Tailwind CSS
- HTTP Client : Axios
- API : PetStore Swagger API
## 📁 Project Structure
├── src/
│   ├── api/
│   │   └── petstore.ts       # API integration with PetStore
│   ├── components/
│   │   ├── PetCard.tsx       # Pet display component
│   │   ├── PetForm.tsx       # Pet management form
│   │   └── SearchBar.tsx     # Search and filter component
│   ├── context/
│   │   └── AuthContext.tsx   # Authentication context
│   ├── pages/
│   │   ├── LoginPage.tsx     # User login page
│   │   ├── PetListPage.tsx   # Main pets listing page
│   │   ├── PetDetailPage.tsx # Individual pet details
│   │   └── NotFoundPage.tsx  # 404 error page
│   └── routes/
│       └── ProtectedRoute.tsx # Route protection logic
## 🚦 Getting Started
1. Installation
   npm install
2. Start Development Server
   npm start
3. Build for Production
   npm run build
   ## 💡 Key Components
### PetCard
- Displays individual pet information
- Shows pet status with color-coded indicators
- Handles missing images gracefully
- Responsive hover effects
### SearchBar
- Real-time search functionality with debouncing
- Status filtering (available, pending, sold)
- Mobile-responsive design
- Accessible form controls
## 🔒 Authentication
The application uses a token-based authentication system:

- Login required for accessing protected routes
- Automatic redirection to login page for unauthenticated users
- Secure API integration with PetStore's authentication endpoints
## 🔌 API Integration
The application integrates with the PetStore Swagger API:

- Base URL: https://petstore.swagger.io/v2
- Supported operations:
  - User authentication
  - Fetch pets by status
  - Get pet details
  - Update pet information
## 🎨 Styling
The application uses Tailwind CSS for styling:

- Responsive design patterns
- Custom color schemes for status indicators
- Hover and transition effects
- Accessible form controls
## 🔧 Available Scripts
- npm start : Runs development server
- npm test : Launches test runner
- npm run build : Creates production build
- npm run eject : Ejects from Create React App
## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License
This project is open source and available under the MIT License.