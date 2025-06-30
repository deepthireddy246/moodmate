# MoodMate - Setup Guide

## Prerequisites
- Java 17 or higher
- Node.js 16 or higher
- MySQL 8.0 or higher
- Maven (for backend)

## 🗄️ Database Setup

1. **Install MySQL** (if not already installed)
   - Download from: https://dev.mysql.com/downloads/mysql/
   - Or use Docker: `docker run --name mysql -e MYSQL_ROOT_PASSWORD=password -p 3306:3306 -d mysql:8.0`

2. **Create Database** (optional - Spring Boot will create it automatically)
   ```sql
   CREATE DATABASE moodmate;
   ```

3. **Update Database Configuration** (if needed)
   - Edit `backend/src/main/resources/application.properties`
   - Update username/password if different from defaults

## 🚀 Backend Setup (Spring Boot)

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Build the project:**
   ```bash
   mvn clean install
   ```

3. **Run the application:**
   ```bash
   mvn spring-boot:run
   ```

4. **Verify backend is running:**
   - Open: http://localhost:8080
   - You should see a Whitelabel Error Page (normal for Spring Boot)

## 🎨 Frontend Setup (React)

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Verify frontend is running:**
   - Open: http://localhost:3000
   - You should see the MoodMate login page

## 🔧 Troubleshooting

### Common Issues:

1. **Port 8080 already in use:**
   - Change port in `backend/src/main/resources/application.properties`
   - Update `server.port=8081`

2. **MySQL connection failed:**
   - Check if MySQL is running
   - Verify credentials in `application.properties`
   - Ensure MySQL is accessible on localhost:3306

3. **Frontend can't connect to backend:**
   - Ensure backend is running on port 8080
   - Check CORS configuration
   - Verify proxy setting in `package.json`

4. **Node modules issues:**
   ```bash
   cd frontend
   rm -rf node_modules package-lock.json
   npm install
   ```

## 🎯 Testing the Application

1. **Register a new user:**
   - Go to http://localhost:3000/register
   - Create an account

2. **Login:**
   - Use your credentials to login

3. **Add mood entries:**
   - Click "Add Mood Entry"
   - Fill out the form and submit

4. **View dashboard:**
   - See your mood trends and journal entries

5. **Edit/Delete entries:**
   - Use Edit/Delete buttons on journal entries

## 📁 Project Structure

```
moodmate/
├── backend/                 # Spring Boot application
│   ├── src/main/java/
│   │   └── com/moodmate/
│   │       ├── controller/  # REST API endpoints
│   │       ├── service/     # Business logic
│   │       ├── repository/  # Data access
│   │       ├── entity/      # Database models
│   │       ├── dto/         # Data transfer objects
│   │       └── config/      # Configuration
│   └── src/main/resources/
│       └── application.properties
└── frontend/               # React application
    ├── src/
    │   ├── components/     # Reusable components
    │   ├── pages/          # Page components
    │   └── App.js          # Main app component
    └── package.json
```

## 🔐 Default Configuration

- **Backend URL:** http://localhost:8080
- **Frontend URL:** http://localhost:3000
- **Database:** MySQL on localhost:3306
- **JWT Secret:** moodmateSecretKey2024ForJWTTokenGenerationAndValidation

## 🚀 Quick Start Commands

```bash
# Terminal 1 - Backend
cd backend
mvn spring-boot:run

# Terminal 2 - Frontend
cd frontend
npm install
npm start
```

Then open http://localhost:3000 in your browser! 